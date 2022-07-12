import React,{useState} from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from 'styled-components'
import ControllBlock from './components/molecule/ControllBlock'
import MusicInfoBlock from './components/molecule/MusicInfo'
import TopBarBlock from './components/molecule/TopBar'
import ProgressBar from './components/molecule/ProgressBar'
import { MusicProvider } from './MusicContext';
import { PlayListProvider } from './PlayListContext';
import './App.css'


const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(223,234,252);
    background: linear-gradient(180deg, rgba(223,234,252,1) 0%, rgba(255,255,255,0.9870370335049099) 100%);
    background-repeat:no-repeat;
  }
`

function App(){
    const [audio,setAudio] = useState()
    const [meta,setMeta] = useState()
    
            
  return (
      <PlayListProvider>
      <MusicProvider>
        <GlobalStyle/>
        <TopBarBlock setAudio={setAudio}/>
        <MusicInfoBlock title='Lose it' 
                     artist='Flume ft. Vic Mensa'/>
        <ProgressBar audio={audio}/>
        <ControllBlock audio={audio}/>
      </MusicProvider>
      </PlayListProvider>
    )
};

export default App