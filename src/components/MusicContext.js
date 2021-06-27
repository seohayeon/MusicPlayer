import React, { useReducer, createContext, useContext, useRef } from 'react';

const playlist = []

function musicReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.music);
    case 'REMOVE':
      return state.filter(music => music.id !== action.id);
      
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const MusicStateContext = createContext();
const MusicDispatchContext = createContext();
const MusicNextIdContext = createContext();

export function MusicProvider({ children }) {
  const [state, dispatch] = useReducer(musicReducer, playlist);
  const nextId = useRef(0);
  return (
    <MusicStateContext.Provider value={state}>
      <MusicDispatchContext.Provider value={dispatch}>
        <MusicNextIdContext.Provider value={nextId}>
        {children}
        </MusicNextIdContext.Provider>
      </MusicDispatchContext.Provider>
    </MusicStateContext.Provider>
  );
}

export function useMusicState() {
  const context = useContext(MusicStateContext);
  if (!context) {
    throw new Error('Cannot find MusicProvider');
  }
  return context;
}

export function useMusicDispatch() {
  const context = useContext(MusicDispatchContext);
  if (!context) {
    throw new Error('Cannot find MusicProvider');
  }
  return context;    
}

export function useMusicNextId() {
  const context = useContext(MusicNextIdContext);
  if (!context) {
    throw new Error('Cannot find MusicProvider');
  }
  return context;        
}