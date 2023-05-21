import { cloneDeep } from "lodash";

export const PlaylistArrayActions = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  RENAME: "RENAME",
};

export const PlaylistArrayReducer = (state, action) => {
  switch (action.type) {
    case PlaylistArrayActions.ADD: {
      return { allPlaylists: [...state.allPlaylists, action.playlist] };
    }
    case PlaylistArrayActions.REMOVE: {
      const newArray = cloneDeep(state.allPlaylists);
      const removePlaylistIndex = newArray.findIndex(
        (x) => x.id === action.playlist.id
      );

      if (removePlaylistIndex !== -1) {
        newArray.splice(removePlaylistIndex, 1);
      }

      return {
        allPlaylists: newArray,
      };
    }
    case PlaylistArrayActions.RENAME: {
      const newArray = cloneDeep(state.allPlaylists);
      const playlistIndex = newArray.findIndex(
        (x) => x.id === action.playlist.id
      );

      if (playlistIndex !== -1) {
        newArray[playlistIndex] = {
          ...newArray[playlistIndex],
          title: action.newTitle,
        };
      }

      return {
        allPlaylists: newArray,
      };
    }
    default:
      return state;
  }
};
