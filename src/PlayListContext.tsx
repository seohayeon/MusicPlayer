import React, { useReducer, createContext, useContext, useRef } from 'react';

const playlist = []

function PlayListReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.PlayList);
    case 'REMOVE':
      return state.filter(PlayList => PlayList.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const PlayListStateContext = createContext();
const PlayListDispatchContext = createContext();
const PlayListNextIdContext = createContext();

export function PlayListProvider({ children }:React.ReactNode) {
  const [state, dispatch] = useReducer(PlayListReducer, playlist);
  const nextId = useRef(0);
  return (
    <PlayListStateContext.Provider value={state}>
      <PlayListDispatchContext.Provider value={dispatch}>
        <PlayListNextIdContext.Provider value={nextId}>
        {children}
        </PlayListNextIdContext.Provider>
      </PlayListDispatchContext.Provider>
    </PlayListStateContext.Provider>
  );
}

export function usePlayListState() {
  const context = useContext(PlayListStateContext);
  if (!context) {
    throw new Error('Cannot find PlayListProvider');
  }
  return context;
}

export function usePlayListDispatch() {
  const context = useContext(PlayListDispatchContext);
  if (!context) {
    throw new Error('Cannot find PlayListProvider');
  }
  return context;    
}

export function usePlayListNextId() {
  const context = useContext(PlayListNextIdContext);
  if (!context) {
    throw new Error('Cannot find PlayListProvider');
  }
  return context;        
}