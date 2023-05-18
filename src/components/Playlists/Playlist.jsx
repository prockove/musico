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
import { useParams, useNavigate } from "react-router-dom";

function FetchSongIdFromTitle({ songTitle }) {
  const [songId, setSongId] = useState({});

  useEffect(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${songTitle}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "3a94049d35msh0452214c605abdep14fc02jsnea0066057b93",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSongId(data[0].id);
      })
      .catch((error) => console.log(error));
  }, [songTitle]);
  return songId;
}

function FetchSong({ title }) {
  const [song, setSong] = useState({});
  const songId = <FetchSongIdFromTitle songTitle={title} />;

  useEffect(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "3a94049d35msh0452214c605abdep14fc02jsnea0066057b93",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSong(data);
      })
      .catch((error) => console.log(error));
  }, [songId]);

  return song;
}

function SongCard({ title }) {
  const song = <FetchSong title={title} />;

  const renderCard = () => {
    return (
      <Card sx={{ backgroundColor: "#f5f5f5" }}>
        <img src={song.album?.cover_medium} alt={song.title} />
        <Typography variant="h5" fontWeight={"bold"} ml={"10px"}>
          {song.title}
        </Typography>
        <Typography variant="h6" fontStyle={"italic"} ml={"10px"}>
          {song.artist?.name}
        </Typography>
        <audio
          src={song.preview}
          controls
          style={{ width: "250px", height: "50px" }}
        ></audio>
      </Card>
    );
  };

  return renderCard();
}

function NowPlayingBox(track) {
  <Box sx={{ width: "100%", height: "20%", backgroundColor: "black" }}>
    {track.title}
    <SongCard trackId={track} />
  </Box>;
}

export const Playlist = (props) => {
  const { playlist } = useParams();
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");

  function setUrl() {
    navigate("/playlist/${idInput}");
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
      {playlist && playlist.tracks && playlist.tracks.length > 0 && (
        <NowPlayingBox
          track={playlist.tracks[0]}
          style={{
            position: "fixed",
            width: "100%",
            height: "20%",
          }}
        />
      )}
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ marginLeft: "10%", marginBottom: "4%", marginTop: "5%" }}
      >
        {props.title}
        <PlayIcon />
      </Typography>
      <Box>
        {" "}
        <ul>
          {props.tracks &&
            props.tracks.length > 0 &&
            props.tracks.map((track, index) => (
              <Card key={index}>
                <Typography>{track.title}</Typography>
                <PlayIcon />
              </Card>
            ))}
        </ul>
        <div>
          <input onInput={(e) => setIdInput(e.target.value)} value={idInput} />
          <button onClick={setUrl}>Go!</button>
        </div>
      </Box>
    </div>
  );
};
