import React, { useReducer, createContext, useContext } from 'react';

const initialMusic = {title:'-----',artist:'---',artwork:'https://i.pinimg.com/736x/c7/14/74/c714748d5e5387e1968a175ee4639252.jpg'};

function musicReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
            title: action.music.title,
            artist: action.music.artist,
            artwork: [
                { src: action.music.artwork, sizes: '128x128', type: 'image/png' }
                ]
            });
        }
      return state = action.music;
    case 'TOGGLE':
      return state;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const MusicStateContext = createContext();
const MusicDispatchContext = createContext();


export function MusicProvider({ children }:React.ReactNode) {
  const [state, dispatch] = useReducer(musicReducer, initialMusic);
  return (
      <>
    <MusicStateContext.Provider value={state}>
      <MusicDispatchContext.Provider value={dispatch}>
        {children}
      </MusicDispatchContext.Provider>
    </MusicStateContext.Provider>
    </>
  );
}

export function useMusicState() {
  const context = useContext(MusicStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useMusicDispatch() {
  const context = useContext(MusicDispatchContext)
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}