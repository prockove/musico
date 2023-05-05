import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Typography,
  TextField,
  Box,
  Autocomplete,
  Avatar,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../images/logo.png";

function NowPlaying({ trackId }) {
  const [song, setSong] = useState({});

  useEffect(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${trackId}`, {
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
  }, [trackId]);

  const renderCard = () => {
    if (!song) {
      return null;
    }
    return (
      <div>
        {song ? (
          <SongCard
            trackId={song.id}
            title={song.title}
            artist={song.artist}
            coverUrl={song.preview}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  return renderCard();
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
        "x-rapidapi-key": "3a94049d35msh0452214c605abdep14fc02jsnea0066057b93",
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
            albumCover: result.album ? searchResults.album.cover_small : null,
          }))}
          style={{ width: "500px" }}
          getOptionLabel={(songChoice) => songChoice.title}
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
                    <SearchIcon fontSize="large" />
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
                <Avatar
                  src={songChoice.albumCover}
                  sx={{ marginRight: "10px", borderRadius: "0" }}
                />
                <Typography>{songChoice.title}</Typography>
              </Box>
              {/* <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={option.albumCover}
                  alt="Album cover"
                  height="50"
                  width="50"
                />
                <div style={{ marginLeft: 10 }}>{option.title}</div>
              </div>
              {option.id === selectedTrackId && (
                <NowPlaying trackId={option.id} />
              )} */}
            </li>
          )}
        />
      </div>
    </div>
  );
}

function SongCard({ trackId }) {
  const [song, setSong] = useState({});

  useEffect(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${trackId}`, {
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
  }, [trackId]);

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

function FeatCard1() {
  return (
    <SongCard
      trackId={916424}
      title={"Without Me"}
      artist={"Eminem"}
      coverUrl={
        "https://cdns-preview-c.dzcdn.net/stream/c-cca63b2c92773d54e61c5b4d17695bd2-8.mp3"
      }
    />
  );
}

function FeatCard2() {
  return (
    <SongCard
      trackId={854914322}
      title={"Godzilla"}
      artist={"Eminem"}
      coverUrl={
        "https://cdns-preview-d.dzcdn.net/stream/c-d5a91f3cf9c2b399c9734223623a3c67-6.mp3"
      }
    />
  );
}

function FeatCard3() {
  return (
    <SongCard
      trackId={72160314}
      title={"Rap God"}
      artist={"Eminem"}
      coverUrl={
        "https://cdns-preview-2.dzcdn.net/stream/c-2a2a808c0966c0952aa4f6bae6fa98de-6.mp3"
      }
    />
  );
}

function FeatCard4() {
  return (
    <SongCard
      trackId={979041}
      title={"Smack That (Clean)"}
      artist={"Akon"}
      coverUrl={
        "https://cdns-preview-c.dzcdn.net/stream/c-c45ae335d3f89e153c37217f4495cefc-4.mp3"
      }
    />
  );
}

function FeatCard5() {
  return (
    <SongCard
      trackId={128743593}
      title={"Forgot About Dre"}
      artist={"Dr. Dre"}
      coverUrl={
        "https://cdns-preview-1.dzcdn.net/stream/c-1fc42f1ff89a633c0283c76b8d2f5106-6.mp3"
      }
    />
  );
}

function FeatCard6() {
  return (
    <SongCard
      trackId={102517748}
      title={"Emine"}
      artist={"Koffi Olomide"}
      coverUrl={
        "https://cdns-preview-9.dzcdn.net/stream/c-987fc5a285bc0d2549a8262cce53012b-1.mp3"
      }
    />
  );
}

function Artist({ artistId }) {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "3a94049d35msh0452214c605abdep14fc02jsnea0066057b93",
      },
    })
      .then((response) => response.json())
      .then((data) => setArtist(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {artist ? (
        <Card sx={{ backgroundColor: "#f5f5f5" }}>
          <img src={artist.picture_medium} alt={artist.name} />
          <Typography variant="h4" component={"h2"} mt={1.5} mb={1.5} ml={2}>
            {artist.name}
          </Typography>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export function Home() {
  const [currentStack, setCurrentStack] = useState(1);

  const handleBackClick = () => {
    setCurrentStack(1);
  };

  const handleForwardClick = () => {
    setCurrentStack(2);
  };

  return (
    <div>
      {/* <Box
        sx={{
          height: "82%",
          overflowY: "scroll",
          //backgroundColor: "#e1e5eb",
        }}
      > */}

      <img src={logo} alt="Logo" width={"100%"} />
      <SearchBar />
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ marginLeft: "10%", marginBottom: "4%", marginTop: "5%" }}
      >
        Featured Songs
      </Typography>
      <Stack direction={"row"} spacing={10} sx={{ justifyContent: "center" }}>
        <FeatCard1 />
        <FeatCard5 />
        <FeatCard2 />
      </Stack>
      <br />
      <br />
      <br />
      <Stack direction={"row"} spacing={10} sx={{ justifyContent: "center" }}>
        <FeatCard4 />
        <FeatCard3 />
        <FeatCard6 />
      </Stack>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ marginLeft: "10%", marginBottom: "4%", marginTop: "5%" }}
      >
        Featured Artists
      </Typography>
      <>
        {currentStack === 1 && (
          <Stack
            direction={"row"}
            spacing={10}
            sx={{ justifyContent: "center" }}
          >
            <ArrowBackIosIcon fontSize="large" onClick={handleBackClick} />
            <Artist artistId={38} />
            <Artist artistId={13} />
            <Artist artistId={5561066} />
            <ArrowForwardIosIcon
              fontSize="large"
              onClick={handleForwardClick}
            />
          </Stack>
        )}

        {currentStack === 2 && (
          <Stack
            direction={"row"}
            spacing={10}
            sx={{ justifyContent: "center" }}
          >
            <ArrowBackIosIcon fontSize="large" onClick={handleBackClick} />
            <Artist artistId={763} />
            <Artist artistId={84324} />
            <Artist artistId={254617} />
            <ArrowForwardIosIcon
              fontSize="large"
              onClick={handleForwardClick}
            />
          </Stack>
        )}
        <br />
        <br />
        <br />
      </>
      {/* </Box> */}
    </div>
  );
}
