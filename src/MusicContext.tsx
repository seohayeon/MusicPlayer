import React, { useReducer, createContext, useContext } from 'react';
import { usePlayListState } from './PlayListContext'
const initialMusic = {title:'-----',artist:'---',artwork:'/images/unknown_music.png'}
const MusicStateContext = createContext();
const MusicDispatchContext = createContext();

function musicReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
        let playlist = usePlayListState()
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}




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