import { useState, useEffect } from "react";

function FetchTrack({ trackId }) {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${trackId}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "3a94049d35msh0452214c605abdep14fc02jsnea0066057b93",
      },
    })
      .then((response) => response.json())
      .then((data) => setTrack(data))
      .catch((error) => console.log(error));
  }, [trackId]);

  return track;
}

export const UpbeatPlaylist = () => {
  const [tracks, setTracks] = useState([]);

  const handleAddTrack = (trackId) => {
    const newTrack = FetchTrack({ trackId });
    setTracks([...tracks, newTrack]);
  };

  handleAddTrack(504199232);
  handleAddTrack(3128097);
  handleAddTrack(14932105);
  handleAddTrack(2142018847);
  handleAddTrack(1030121);
  handleAddTrack(2210472907);
  handleAddTrack(607452332);
  handleAddTrack(1230448402);

  return tracks;
};

export const SlowSongs = () => {
  const [tracks, setTracks] = useState([]);

  const handleAddTrack = (trackId) => {
    const newTrack = FetchTrack({ trackId });
    setTracks([...tracks, newTrack]);
  };

  handleAddTrack(14932105);
  handleAddTrack(2142018847);
  handleAddTrack(1030121);
  handleAddTrack(2210472907);
  handleAddTrack(607452332);

  return tracks;
};

export const PartyPlaylist = () => {
  const [tracks, setTracks] = useState([]);

  const handleAddTrack = (trackId) => {
    const newTrack = FetchTrack({ trackId });
    setTracks([...tracks, newTrack]);
  };

  handleAddTrack(3128097);
  handleAddTrack(14932105);
  handleAddTrack(2142018847);
  handleAddTrack(1030121);
  handleAddTrack(2210472907);
  handleAddTrack(607452332);
  handleAddTrack(1230448402);

  return tracks;
};

export const HeartSongs = () => {
  const [tracks, setTracks] = useState([]);

  const handleAddTrack = (trackId) => {
    const newTrack = FetchTrack({ trackId });
    setTracks([...tracks, newTrack]);
  };

  handleAddTrack(504199232);
  handleAddTrack(3128097);
  handleAddTrack(14932105);
  handleAddTrack(2142018847);
  handleAddTrack(607452332);
  handleAddTrack(1230448402);

  return tracks;
};
