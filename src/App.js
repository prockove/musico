import { useReducer } from "react";
import { Home } from "./components/Home";
import { MyPlaylists } from "./components/MyPlaylists";
import { Playlist } from "./components/Playlist";
import { Header } from "./components/Header";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myplaylists" element={<MyPlaylists />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
