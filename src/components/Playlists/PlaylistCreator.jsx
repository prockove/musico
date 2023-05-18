import React, { useState } from "react";
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
import PlaylistArray from "./PlaylistArray";

/* function newPlaylist(title, tracks) {
  const playlist = {
    title: title,
    tracks: tracks,
    render: function () {
      return (
        <div>
          <h2>{this.title}</h2>
          <ul>
            {this.tracks.map((track, index) => (
              <li key={index}>{track}</li>
            ))}
          </ul>
        </div>
      );
    },
  };
  return playlist;
}
 */
function newPlaylist(title, tracks) {
  return tracks;
}

/* function handleRemovePlaylistFromPlaylists(index) {
  const newPlaylistArray = [...PlaylistArray];
  newPlaylistArray.splice(index, 1);
  setPlaylistArray(newPlaylist);
} */

export function CreatePlaylist(props) {
  const [playlist, setPlaylist] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");

  const handlePlaylistTitle = (event) => {
    setPlaylistTitle(event.target.value);
  };

  function handleAddToPlaylist(item) {
    setPlaylist([...playlist, item]);
  }

  function handleRemoveFromPlaylist(index) {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
  }

  function handleMoveUp(index) {
    if (index > 0) {
      const newPlaylist = [...playlist];
      const temp = newPlaylist[index];
      newPlaylist[index] = newPlaylist[index - 1];
      newPlaylist[index - 1] = temp;
      setPlaylist(newPlaylist);
    }
  }

  function handleMoveDown(index) {
    if (index < playlist.length - 1) {
      const newPlaylist = [...playlist];
      const temp = newPlaylist[index];
      newPlaylist[index] = newPlaylist[index + 1];
      newPlaylist[index + 1] = temp;
      setPlaylist(newPlaylist);
    }
  }

  /* function handleSavePlaylist(playlistTitle, tracks) {
    PlaylistArray.push(newPlaylist(playlistTitle, tracks));
  } */

  function handleSavePlaylist(playlistTitle, tracks) {
    PlaylistArray.push({ title: playlistTitle, tracks: tracks });
    if (props.onSave) {
      props.onSave();
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
              title: result.title,
              artist: result.artist,
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
            {playlist.map((item, index) => (
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
            if (playlistTitle && playlist) {
              handleSavePlaylist(playlistTitle, playlist);
            }
          }}
          disabled={!playlistTitle || !playlist}
          sx={{ marginLeft: "40%" }}
        >
          Save
        </Button>
      </Box>
    </div>
  );
}
