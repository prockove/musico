import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
  TextField,
  Autocomplete,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { PlaylistArrayContext } from "../../state/PlaylistArray-context";
import { PlaylistArrayActions } from "../../state/PlaylistArray.reducer";

export const CreatePlaylist = (props) => {
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const { PlaylistArrayState, PlaylistArrayDispatch } =
    useContext(PlaylistArrayContext);

  const handlePlaylistTitle = (event) => {
    setPlaylistTitle(event.target.value);
  };

  function handleAddToPlaylist(item) {
    setNewPlaylist([...newPlaylist, item]);
  }

  function handleRemoveFromPlaylist(index) {
    const updatedPlaylist = [...newPlaylist];
    updatedPlaylist.splice(index, 1);
    setNewPlaylist(updatedPlaylist);
  }

  function handleMoveUp(index) {
    if (index > 0) {
      const updatedPlaylist = [...newPlaylist];
      const temp = updatedPlaylist[index];
      updatedPlaylist[index] = updatedPlaylist[index - 1];
      updatedPlaylist[index - 1] = temp;
      setNewPlaylist(updatedPlaylist);
    }
  }

  function handleMoveDown(index) {
    if (index < newPlaylist.length - 1) {
      const updatedPlaylist = [...newPlaylist];
      const temp = updatedPlaylist[index];
      updatedPlaylist[index] = updatedPlaylist[index + 1];
      updatedPlaylist[index + 1] = temp;
      setNewPlaylist(updatedPlaylist);
    }
  }

  function RandomNumberGenerator() {
    const num = Math.floor(Math.random() * 100) + 100;
    console.log(num);
    return num;
  }

  function handleSavePlaylist(playlistTitle, tracks) {
    const playlist = {
      id: RandomNumberGenerator(),
      title: playlistTitle,
      tracks: tracks,
    };
    PlaylistArrayDispatch({
      type: PlaylistArrayActions.ADD,
      playlist: playlist,
    });

    if (playlist.onSave) {
      playlist.onSave();
    }
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
              albumCover: result.album ? result.album.cover_small : null,
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
              albumCover: result.album ? result.album.cover_small : null,
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
                  <Button onClick={() => handleAddToPlaylist(songChoice)}>
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
    <div>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            value={playlistTitle}
            label="Playlist Title"
            variant="standard"
            onChange={handlePlaylistTitle}
          />
        </Box>

        <SearchBar />
        <br />
        <h2>Songs</h2>
        <Box sx={{ backgroundColor: "white", padding: "10px" }}>
          <List>
            {newPlaylist.map((item, index) => (
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
          onClick={() => {
            if (playlistTitle && newPlaylist) {
              handleSavePlaylist(playlistTitle, newPlaylist);
            }
            if (props.onSave) {
              props.onSave();
            }
          }}
          disabled={!playlistTitle || !newPlaylist}
          sx={{ marginLeft: "40%" }}
        >
          Save
        </Button>
      </Box>
    </div>
  );
};
