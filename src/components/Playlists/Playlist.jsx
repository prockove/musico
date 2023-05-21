import React, { useContext } from "react";
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

function NowPlayingImage({ song }) {
  const renderImg = () => {
    if (song) {
      return (
        <img
          src={song.albumCover}
          alt={song.title}
          style={{ width: "100%", height: "100%" }}
        />
      );
    } else {
      return (
        <img
          src="https://e-cdns-images.dzcdn.net/images/cover/ab0c27773900dc370917797a8f53d349/250x250-000000-80-0-0.jpg"
          alt="Toy Cover Image"
          style={{ width: "100%", height: "100%" }}
        />
      );
    }
  };

  return renderImg();
}

function NowPlayingAudio({ song }) {
  if (song) {
    return (
      <audio
        src={song.preview}
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
  } else {
    return (
      <audio
        src="https://cdns-preview-9.dzcdn.net/stream/c-92ba90e4b9987594aefea3610bfd2c9a-5.mp3"
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
}

function NowPlayingSongInfo({ song }) {
  console.log(song);
  console.log(" in the nowPlayingSongInfo");
  const renderInfo = () => {
    if (song != null) {
      return (
        <>
          <Typography variant="h5" fontWeight={"bold"} ml={"10px"}>
            {song.title}
          </Typography>
          <Typography variant="h6" fontStyle={"italic"} ml={"10px"}>
            by {song.artist}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="h5" fontWeight={"bold"} ml={"10px"}>
            Toy (Music Video Version)
          </Typography>
          <Typography variant="h6" fontStyle={"italic"} ml={"10px"}>
            by Netta
          </Typography>
        </>
      );
    }
  };
  return renderInfo();
}

function NowPlayingBox(track) {
  console.log("Made it to the nowPlayingBox");
  console.log(track);
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
      <Box sx={{ flex: 0.75, backgroundColor: "gray" }} id="NowPlayingSongCard">
        <NowPlayingImage song={track} />
      </Box>
      <Box
        sx={{
          flex: 2.25,
        }}
      >
        <div style={{ marginLeft: "15px", marginTop: "25px" }}>
          <NowPlayingSongInfo song={track} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "45px",
          }}
        >
          <NowPlayingAudio song={track} />
        </div>
      </Box>
    </Box>
  );
}

function findPlaylistById(pid, allPlaylists) {
  const playlist = allPlaylists?.find((playlist) => playlist.id === pid);
  if (playlist) {
    console.log(playlist.title);
  } else {
    console.log("Playlist title not showing up");
  }
  if (allPlaylists) {
    console.log(allPlaylists[0]);
  } else {
    console.log("allPlaylists is currently null :(");
  }
  return playlist;
}

export const Playlist = () => {
  const { playlistId } = useParams();
  console.log("playlistId in function");
  console.log(playlistId);

  const { playlistArrayState, playlistArrayActions, playlistDispatch } =
    useContext(PlaylistArrayContext);
  const allPlaylists = playlistArrayState?.allPlaylists;
  const playlist = findPlaylistById(playlistId, allPlaylists);

  //const [newPlaylistTitle, setNewPlaylistTitle] = useState("");

  let nowPlayingSong = null;

  if (!playlist) {
    nowPlayingSong = null;
    /* nowPlayingSong = {
      id: 504199232,
      title: "Toy",
      artist: "Netta",
      albumCover:
        "https://e-cdns-images.dzcdn.net/images/cover/ab0c27773900dc370917797a8f53d349/250x250-000000-80-0-0.jpg",
      preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-92ba90e4b9987594aefea3610bfd2c9a-5.mp3",
    }; */
  } else {
    nowPlayingSong = playlist.tracks[0];
  }

  /* const handleRenamePlaylist = (playlistId, newTitle) => {
    playlistDispatch({
      type: playlistArrayActions.RENAME,
      playlist: { id: playlistId },
      newTitle: newTitle,
    });
  };
 */
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
        fontWeight={"bold"}
        sx={{
          marginLeft: "10%",
          marginBottom: "4%",
          marginTop: "5%",
          color: "purple",
        }}
      >
        {playlist?.title}
        <PlayIcon sx={{ fontSize: "80px" }} />
      </Typography>

      <NowPlayingBox
        track={nowPlayingSong}
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
          {playlist?.tracks &&
            playlist?.tracks.length > 0 &&
            playlist?.tracks.map((track, index) => (
              <React.Fragment key={track.id}>
                <ListItem
                  secondaryAction={
                    <PlayIcon
                      onClick={() => NowPlayingBox(playlist?.tracks[index])}
                    />
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={track.cover_medium} alt={track.title} />
                  </ListItemAvatar>
                  <ListItemText primary={`${track.title} by ${track.artist}`} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </Box>
    </div>
  );
};
