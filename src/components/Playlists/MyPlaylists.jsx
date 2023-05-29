import React, { useState, useContext } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  Box,
  Popper,
  TextField,
  Autocomplete,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import deezer_color_logo from "../../images/deezer_color_logo.png";
import { chunk } from "lodash";
import { useNavigate } from "react-router-dom";
import { PlaylistArrayContext } from "../../state/PlaylistArray-context";
import { PlaylistArrayActions } from "../../state/PlaylistArray.reducer";

export const MyPlaylists = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { PlaylistArrayState, PlaylistArrayDispatch } =
    useContext(PlaylistArrayContext);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistToRemove, setPlaylistToRemove] = useState("");

  function handleAddTrackToPlaylist(item) {
    setPlaylistTracks([...playlistTracks, item]);
  }

  function handleRemoveFromPlaylist(index) {
    const updatedPlaylistTracks = [...playlistTracks];
    updatedPlaylistTracks.splice(index, 1);
    setPlaylistTracks(updatedPlaylistTracks);
  }

  function handleMoveUp(index) {
    if (index > 0) {
      const updatedPlaylistTracks = [...playlistTracks];
      const temp = updatedPlaylistTracks[index];
      updatedPlaylistTracks[index] = updatedPlaylistTracks[index - 1];
      updatedPlaylistTracks[index - 1] = temp;
      setPlaylistTracks(updatedPlaylistTracks);
    }
  }

  function handleMoveDown(index) {
    if (index < playlistTracks.length - 1) {
      const updatedPlaylistTracks = [...playlistTracks];
      const temp = updatedPlaylistTracks[index];
      updatedPlaylistTracks[index] = updatedPlaylistTracks[index + 1];
      updatedPlaylistTracks[index + 1] = temp;
      setPlaylistTracks(updatedPlaylistTracks);
    }
  }

  const hasPlaylists = PlaylistArrayState.allPlaylists.length > 0;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popper" : undefined;

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSavePlaylist = () => {
    const playlistToSave = {
      id: RandomNumberGenerator(),
      title: playlistTitle,
      tracks: playlistTracks,
    };

    PlaylistArrayDispatch({
      type: PlaylistArrayActions.ADD,
      playlist: playlistToSave,
    });

    handlePopoverClose();
  };

  const handleRemovePlaylistFromPlaylists = () => {
    PlaylistArrayDispatch({
      type: PlaylistArrayActions.REMOVE,
      playlist: playlistToRemove,
    });
  };

  function RandomNumberGenerator() {
    const num = Math.floor(Math.random() * 100) + 100;
    return num;
  }

  function setURL(playlistId) {
    navigate(`/playlist/${playlistId}`);
  }

  function handlePlaylistClick(selectedPlaylist) {
    setURL(selectedPlaylist);
  }

  function CreatePlaylist() {
    return (
      <div>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              value={playlistTitle}
              label="Playlist Title"
              variant="standard"
              onChange={(event) => setPlaylistTitle(event.target.value)}
            />
          </Box>

          <SearchBar />
          <br />
          <h2>Songs</h2>
          <Box sx={{ backgroundColor: "white", padding: "10px" }}>
            <List>
              {playlistTracks.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <>
                        <DeleteIcon
                          onClick={() => handleRemoveFromPlaylist(index)}
                        />
                        <ArrowDropUpIcon onClick={() => handleMoveUp(index)} />
                        <ArrowDropDownIcon
                          onClick={() => handleMoveDown(index)}
                        />
                      </>
                    }
                  >
                    <ListItemText primary={`${item.title} by ${item.artist}`} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
          <Button
            onClick={handleSavePlaylist}
            disabled={!playlistTitle || playlistTracks.length < 0}
            sx={{ marginLeft: "40%" }}
          >
            Save
          </Button>
        </Box>
      </div>
    );
  }

  function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSearch = (event) => {
      if (!isTyping) {
        setIsTyping(true);
      }
      const searchTerm = event.target.value;
      setSearchTerm(searchTerm);

      fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "3a94049d35msh0452214c605abdep14fc02jsnea0066057b93",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const results = data.data.map((result) => {
            return {
              id: result.id,
              title: result.title,
              artist: result.artist.name,
              albumCover: result.album.cover_medium,
              preview: result.preview,
            };
          });
          setSearchResults(results);
        })
        .catch((error) => console.error(error));
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Autocomplete
            id="search-box"
            freeSolo
            options={searchResults.map((result) => ({
              id: result.id,
              title: result.title,
              artist: result.artist,
              albumCover: result.albumCover,
              preview: result.preview,
            }))}
            style={{ width: "500px" }}
            getOptionLabel={(songChoice) =>
              `${songChoice.title} by ${songChoice.artist}`
            }
            inputValue={searchTerm}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                variant="filled"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  style: { backgroundColor: "white" },
                  startAdornment: !isTyping && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginLeft: 5 }}>
                        Search title, artist, keyword...
                      </span>
                    </div>
                  ),
                }}
                onChange={(event) => handleSearch(event)}
              />
            )}
            renderOption={(props, songChoice) => (
              <li {...props} onClick={() => setSearchTerm(songChoice.title)}>
                <Box sx={{ display: "flex", alignItems: "center" }} {...props}>
                  <Typography>
                    {songChoice.title} by {songChoice.artist}
                  </Typography>
                  <Button onClick={() => handleAddTrackToPlaylist(songChoice)}>
                    Add
                  </Button>
                </Box>
              </li>
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "92vh", width: "100%" }}>
      <img
        className="deezer_logo_color"
        src={deezer_color_logo}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          width: "110px",
          height: "auto",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={"bold"}
          sx={{
            marginLeft: "10%",
            marginBottom: "4%",
            marginTop: "5%",
            color: "purple",
          }}
        >
          My Playlists
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ marginRight: "30%" }}
        >
          <AddBoxIcon
            sx={{ fontSize: "60px", marginRight: "10px" }}
            onClick={handleClick}
          />
          <Typography variant="h5">Create New Playlist</Typography>
          <Popper
            id={popperId}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
          >
            <Box
              backgroundColor={"white"}
              padding={"20px"}
              sx={{
                border: "5px solid black",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <CloseIcon
                onClick={handlePopoverClose}
                sx={{
                  position: "absolute",
                  top: "25px",
                  right: "25px",
                }}
              />
              <CreatePlaylist />
            </Box>
          </Popper>
        </Box>
      </div>
      {hasPlaylists ? (
        chunk(PlaylistArrayState.allPlaylists, 4).map((row, rowIndex) => (
          <Stack
            key={rowIndex}
            direction={"row"}
            spacing={10}
            sx={{ marginLeft: "5%", marginBottom: "50px" }}
          >
            {row.map((playlist, playlistIndex) => (
              <Card
                key={playlistIndex}
                sx={{
                  backgroundColor: "#f5f5f5",
                  height: "250px",
                  width: "200px",
                }}
              >
                <CardContent
                  sx={{
                    position: "relative",
                  }}
                >
                  <DeleteIcon
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setPlaylistToRemove(playlist);
                      handleRemovePlaylistFromPlaylists();
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "10px", marginTop: "25px" }}
                  >
                    {playlist.title}
                  </Typography>
                  <Typography variant="h6">
                    {playlist.tracks.length} Songs
                  </Typography>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <PlayIcon
                      sx={{ fontSize: "85px" }}
                      onClick={() => handlePlaylistClick(playlist.id)}
                    />
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
            marginLeft: "50px",
            color: "lightgray",
          }}
        >
          <Typography variant="h5">Currently No Playlists</Typography>
        </Box>
      )}
      <br />
      <br />
    </div>
  );
};
