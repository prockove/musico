import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
} from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import deezer_color_logo from "../../images/deezer_color_logo.png";
import { useParams } from "react-router-dom";
import { PlaylistArrayContext } from "../../state/PlaylistArray-context";

export const Playlist = () => {
  const { playlistId } = useParams();
  const { PlaylistArrayState, PlaylistArrayDispatch } =
    useContext(PlaylistArrayContext);
  const allPlaylists = PlaylistArrayState.allPlaylists;

  function findPlaylistById(pid, allPlaylists) {
    const playlist = allPlaylists.find((playlist) => playlist.id == pid);
    return playlist;
  }
  const playlist = findPlaylistById(playlistId, allPlaylists);
  const [nowPlayingSong, setNowPlayingSong] = useState("");

  useEffect(() => {
    if (playlist && playlist.tracks.length > 0) {
      setNowPlayingSong(playlist.tracks[0]);
    }
  }, [playlist]);

  //const [newPlaylistTitle, setNewPlaylistTitle] = useState("");

  /* const handleRenamePlaylist = (playlistId, newTitle) => {
    playlistDispatch({
      type: playlistArrayActions.RENAME,
      playlist: { id: playlistId },
      newTitle: newTitle,
    });
  };
 */

  function NowPlayingImage() {
    return (
      <img
        src={nowPlayingSong.albumCover}
        alt={nowPlayingSong.title}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  function NowPlayingAudio() {
    return (
      <audio
        src={nowPlayingSong.preview}
        controls
        style={{
          width: "500px",
          height: "70px",
          border: "2px solid black",
          borderRadius: 30,
          marginTop: "50",
        }}
      ></audio>
    );
  }

  function NowPlayingSongInfo() {
    return (
      <>
        <Typography variant="h5" fontWeight={"bold"} ml={"10px"}>
          {nowPlayingSong.title}
        </Typography>
        <Typography variant="h6" fontStyle={"italic"} ml={"10px"}>
          by {nowPlayingSong.artist}
        </Typography>
      </>
    );
  }

  function NowPlayingBox() {
    return (
      <Box
        sx={{
          width: "90%",
          height: "250px",
          backgroundColor: "#f5f5f5",
          margin: "0 auto",
          display: "flex",
        }}
      >
        <Box
          sx={{ flex: 0.75, backgroundColor: "gray" }}
          id="NowPlayingSongCard"
        >
          <NowPlayingImage />
        </Box>
        <Box
          sx={{
            flex: 2.25,
          }}
        >
          <div style={{ marginLeft: "15px", marginTop: "25px" }}>
            <NowPlayingSongInfo />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "45px",
            }}
          >
            <NowPlayingAudio />
          </div>
        </Box>
      </Box>
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
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginLeft: "10%",
          marginBottom: "4%",
          marginTop: "5%",
          color: "purple",
        }}
      >
        {playlist.title}
        <PlayIcon sx={{ fontSize: "60px", marginLeft: "10px" }} />
      </Typography>

      <NowPlayingBox
        style={{
          position: "fixed",
          width: "100%",
          height: "20%",
        }}
      />

      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "10%",
          marginBottom: "4%",
          marginTop: "5%",
          color: "purple",
        }}
      >
        <span>Up Next</span>
        {/* <div style={{ display: "flex" }}>
            <TextField
              value={newPlaylistTitle}
              label="Rename"
              variant="standard"
              onChange={(e) => setNewPlaylistTitle(e.target.value)}
            ></TextField>
            <EditIcon
              sx={{ fontSize: "30px", marginRight: "550px" }}
              onClick={() =>
                handleRenamePlaylist(playlist.id, newPlaylistTitle)
              }
            />
          </div> */}
      </Typography>

      <Box sx={{ backgroundColor: "white", padding: "10px" }}>
        <List>
          {playlist.tracks &&
            playlist.tracks.length > 0 &&
            playlist.tracks.map((track, index) => (
              <React.Fragment key={track.id}>
                <ListItem
                  secondaryAction={
                    <PlayIcon
                      onClick={() => setNowPlayingSong(playlist.tracks[index])}
                      sx={{ color: "purple" }}
                      fontSize="large"
                    />
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={track.albumCover}
                      alt={track.title}
                      variant="square"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h6",
                      sx: { fontSize: "1.2rem" },
                    }}
                    primary={`${track.title} by ${track.artist}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </Box>
    </div>
  );
};
