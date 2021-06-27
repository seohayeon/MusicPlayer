import React, { useReducer, createContext, useContext } from 'react';

const playing = {
                    "title":"이름 없는 음원",
                    "artist":"이름 없는 아티스트",
                    "cover":"",
                    "src":""
                }

function musicReducer(state, action) {
  switch (action.type) {
    case 'SETTING':
      return {
            "id":action.music.id,
            "title":action.music.title,
            "artist":action.music.artist,
            "cover":action.music.cover,
            "src":action.music.src
          } 

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const MusicStateContext = createContext();
const MusicDispatchContext = createContext();

export function PlayingProvider({ children }) {
  const [state, dispatch] = useReducer(musicReducer, playing);

  return (
    <MusicStateContext.Provider value={state}>
      <MusicDispatchContext.Provider value={dispatch}>
        {children}
      </MusicDispatchContext.Provider>
    </MusicStateContext.Provider>
  );
}

export function usePlayingState() {
  const context = useContext(MusicStateContext);
  if (!context) {
    throw new Error('Cannot find MusicProvider');
  }
  return context;
}

export function usePlayingDispatch() {
  const context = useContext(MusicDispatchContext);
  if (!context) {
    throw new Error('Cannot find MusicProvider');
  }
  return context;    
}
