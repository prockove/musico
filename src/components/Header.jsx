import { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import logo from "../images/logo.png";
import SearchIcon from "@mui/icons-material/Search";

export function Header() {
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
          };
        });
        setSearchResults(results);
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event) => {
    handleSearch(event);
  };

  return (
    <div style={{ position: "relative" }}>
      <img src={logo} width={"100%"} alt="Logo" />
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
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
                albumCover: result.album ? result.album.cover_small : null,
              }))}
              style={{ width: "500px" }}
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
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => (
                <li {...props}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.albumCover}
                      alt="Album cover"
                      height="50"
                      width="50"
                    />
                    <div style={{ marginLeft: 10 }}>{option.title}</div>
                  </div>
                </li>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
