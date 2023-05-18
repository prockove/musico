import React, { useState, useEffect } from "react";
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
import { CreatePlaylist } from "./PlaylistCreator";
import deezer_color_logo from "../../images/deezer_color_logo.png";
import PlaylistArray from "./PlaylistArray";
import { chunk } from "lodash";
import { useNavigate } from "react-router-dom";

export const MyPlaylists = () => {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function setUrl() {
    navigate("/playlist/${idInput}");
  }

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  function PlaylistCard({ name, size }) {
    return (
      <Card
        sx={{
          backgroundColor: "#f5f5f5",
          height: "250px",
          width: "200px",
        }}
        onClick={setSelectedPlaylist(selectedPlaylist)}
      >
        <CardContent sx={{ marginTop: "20px" }}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h6">{size} Songs</Typography>
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
          sx={{ marginLeft: "10%", marginBottom: "4%", marginTop: "5%" }}
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
            id={id}
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
      {chunk(PlaylistArray, 4).map((row, rowIndex) => (
        <Stack
          key={rowIndex}
          direction={"row"}
          spacing={10}
          sx={{ justifyContent: "center", marginBottom: "50px" }}
        >
          {row.map((playlist, playlistIndex) => (
            <PlaylistCard
              key={playlistIndex}
              name={playlist.title}
              size={playlist.tracks.length}
            ></PlaylistCard>
          ))}
        </Stack>
      ))}
      <div>
        <input onInput={(e) => setIdInput(e.target.value)} value={idInput} />
        <button onClick={setUrl}>Go!</button>
      </div>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ marginLeft: "10%", marginBottom: "4%", marginTop: "5%" }}
      >
        Suggested Playlists
      </Typography>
      <Stack direction={"row"} spacing={10} sx={{ justifyContent: "center" }}>
        <PlaylistCard name={"Upbeat Playlist"} size={58} />
        <PlaylistCard name={"Soulful Music"} size={38} />
        <PlaylistCard name={"Remix Songs"} size={25} />
        <PlaylistCard name={"Party Playlist"} size={11} />
      </Stack>
      <br />
      <br />
    </div>
  );
};
