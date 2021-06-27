import './App.css';
import PlayerBlock from './components/PlayerBlock';
import QueueBlock from './components/QueueBlock';
import {createGlobalStyle } from 'styled-components';
import React,{useState,useEffect} from 'react';
import { MusicProvider } from './components/MusicContext';
import { PlayingProvider } from './components/PlayingConText';

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(223,234,252);
    background: linear-gradient(180deg, rgba(223,234,252,1) 0%, rgba(255,255,255,0.9870370335049099) 100%);
    height:100vh;
    background-repeat:no-repeat;
  }
`;

function App() {
    
   let data = []
   if(sessionStorage.getItem("playlist")===null){
    sessionStorage.setItem("playlist",JSON.stringify(data))
   }
    let [open,setOpen] = useState("close")
    let [playing,setPlaying] = useState("close")
    let [id,setId] = useState("")
    let playlist = localStorage.getItem("playlist")
    
    let musicdata = playlist
    useEffect(() => {
    
    },[playlist,playing,id])
  return (
    <MusicProvider>
    <PlayingProvider>
    <GlobalStyle/>
     
    <PlayerBlock setOpen={setOpen} playing={playing} setPlaying={setPlaying} id={id} setId={setId}/> 
    <QueueBlock setOpen={setOpen} isOpen={open} musicdata={musicdata} setPlaying={setPlaying} setId={setId} id={id}/>
    </PlayingProvider>
    </MusicProvider>
  );
}

export default App;
