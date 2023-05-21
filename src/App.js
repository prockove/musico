import { useReducer } from "react";
import { Home } from "./components/Home";
import { MyPlaylists } from "./components/Playlists/MyPlaylists";
import { Playlist } from "./components/Playlists/Playlist";
import { Header } from "./components/Header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { PlaylistArrayContext } from "../src/state/PlaylistArray-context";
import { PlaylistArrayReducer } from "../src/state/PlaylistArray.reducer";

function App() {
  const [PlaylistArrayState, PlaylistArrayDispatch] = useReducer(
    PlaylistArrayReducer,
    {
      allPlaylists: [],
    }
  );
  return (
    <HashRouter>
      <Header />
      <PlaylistArrayContext.Provider
        value={{ PlaylistArrayState, PlaylistArrayDispatch }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myplaylists" element={<MyPlaylists />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
        </Routes>
      </PlaylistArrayContext.Provider>
    </HashRouter>
  );
}
export default App;
