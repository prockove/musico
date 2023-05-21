import React, { useState, useContext } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  Box,
  Popper,
} from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreatePlaylist } from "./PlaylistCreator";
import deezer_color_logo from "../../images/deezer_color_logo.png";
//import PlaylistArray from "./PlaylistArray";
import { chunk } from "lodash";
import { useNavigate } from "react-router-dom";
import { PlaylistArrayContext } from "../../state/PlaylistArray-context";
import { PlaylistArrayActions } from "../../state/PlaylistArray.reducer";
import {
  UpbeatPlaylist,
  SlowSongs,
  HeartSongs,
  PartyPlaylist,
} from "./DefaultPlaylists";

export const MyPlaylists = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { PlaylistArrayState, PlaylistArrayDispatch } =
    useContext(PlaylistArrayContext);

  const hasPlaylists = PlaylistArrayState.allPlaylists.length > 0;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popper" : undefined;

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  /* function handleRemovePlaylistFromPlaylists(index) {
    const newPlaylistArray = [...PlaylistArray];
    PlaylistArray = newPlaylistArray.splice(index, 1);
  } */

  function setURL(playlistId) {
    navigate(`/playlist/${playlistId}`);
  }

  function handlePlaylistClick(selectedPlaylist) {
    setURL(selectedPlaylist);
  }

  function SuggestedPlaylistCard(props) {
    /* const handleRemovePlaylist = () => {
      const index = PlaylistArray.findIndex(
        (playlist) => playlist.id === props?.id
      );
      if (index !== -1) {
        handleRemovePlaylistFromPlaylists(index);
      }
    }; */

    return (
      <Card
        onClick={() => navigate(`/playlist/${props.id}`)}
        sx={{
          backgroundColor: "#f5f5f5",
          height: "250px",
          width: "200px",
        }}
      >
        <CardContent sx={{ marginTop: "20px" }}>
          {/* <DeleteIcon onClick={handleRemovePlaylist} /> */}
          <Typography variant="h5">{props.title}</Typography>
          <Typography variant="h6">{props.tracks.length} Songs</Typography>
        </CardContent>
        <CardActions>
          <PlayIcon sx={{ fontSize: "85px" }} />
        </CardActions>
      </Card>
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
              <CreatePlaylist onSave={handlePopoverClose} />
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
                onClick={() => handlePlaylistClick(playlist.id)}
                sx={{
                  backgroundColor: "#f5f5f5",
                  height: "250px",
                  width: "200px",
                }}
              >
                <CardContent sx={{ marginTop: "20px" }}>
                  {/* <DeleteIcon onClick={handleRemovePlaylist} /> */}
                  <Typography variant="h5">{playlist.title}</Typography>
                  <Typography variant="h6">
                    {playlist.tracks.length} Songs
                  </Typography>
                </CardContent>
                <CardActions>
                  <PlayIcon sx={{ fontSize: "85px" }} />
                </CardActions>
              </Card>
              /* <PlaylistCard
              key={playlistIndex}
              name={playlist.title}
              size={playlist.tracks.length}
            ></PlaylistCard> */
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
      {/* 
      <div>
        <input onInput={(e) => setIdInput(e.target.value)} value={idInput} />
        <button onClick={setUrl}>Go!</button>
      </div> */}
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
        Suggested Playlists
      </Typography>
      <Stack direction={"row"} spacing={10} sx={{ justifyContent: "center" }}>
        <SuggestedPlaylistCard
          id={1}
          title={"Upbeat Playlist"}
          tracks={UpbeatPlaylist}
        />
        <SuggestedPlaylistCard id={2} title={"Slow Songs"} tracks={SlowSongs} />
        <SuggestedPlaylistCard
          id={3}
          title={"Heart Songs"}
          tracks={HeartSongs}
        />
        <SuggestedPlaylistCard
          id={4}
          title={"Party Playlist"}
          tracks={PartyPlaylist}
        />
      </Stack>
      <br />
      <br />
    </div>
  );
};
