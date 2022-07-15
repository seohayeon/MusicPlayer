import React,{useState} from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from 'styled-components'
import ControllBlock from './components/molecule/ControllBlock'
import MusicInfoBlock from './components/molecule/MusicInfo'
import TopBarBlock from './components/molecule/TopBar'
import ProgressBar from './components/molecule/ProgressBar'
import { MusicProvider } from './MusicContext';
import { ColorProvider } from './ColorContext';
import { PlayListProvider } from './PlayListContext';
import './App.css'




function App(){
    const [audio,setAudio] = useState()
    
  return (
      <PlayListProvider>
      <MusicProvider>
      <ColorProvider>
        <TopBarBlock setAudio={setAudio}/>
        <MusicInfoBlock title='Lose it' 
                     artist='Flume ft. Vic Mensa'/>
        <ProgressBar audio={audio}/>
        <ControllBlock audio={audio}/>
        </ColorProvider>
      </MusicProvider>
      </PlayListProvider>
    )
};

export default App