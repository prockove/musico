import * as React from "react";
import { AppBar, Box, Typography, Menu, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import logo from "../images/header_logo.png";

const homePage = {
  name: "Home",
  path: "/",
};

const myplaylists = {
  name: "MyPlaylists",
  path: "/myplaylists",
};

const playlist = {
  name: "Playlist",
  path: "/playlist",
};

export function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="relative"
      style={{
        display: "flex",
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        width={"12%"}
        height={"25%"}
        style={{ alignSelf: "center", marginLeft: "10px" }}
        onClick={() => navigate(homePage.path)}
      />
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-end",
          margin: "10px",
        }}
      >
        <Box
          style={{
            flexGrow: 1,
            borderRight: "1px solid #ccc",
          }}
        >
          <HomeIcon
            key={homePage.name}
            onClick={() => navigate(homePage.path)}
            sx={{
              color: "white",
              marginRight: "10px",
            }}
            fontSize="large"
          />
        </Box>
        <MusicNoteIcon
          key={myplaylists.name}
          onClick={() => navigate(myplaylists.path)}
          sx={{
            color: "white",
            marginLeft: "10px",
          }}
          fontSize="large"
        />
        <Typography
          marginRight={"25px"}
          style={{ alignSelf: "center" }}
          onClick={() => navigate(myplaylists.path)}
        >
          My Playlists
        </Typography>
      </Box>
    </AppBar>
  );
}
