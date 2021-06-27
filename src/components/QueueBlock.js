import {createGlobalStyle } from 'styled-components';
import CdBlock from './player/Player';
import QueueBlock from './queue/Queue';
import AddMusic from './queue/AddMusic';
import React,{useState,useEffect} from 'react';
import CircleButton from './player/BackButton';
import '../App.css';

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(223,234,252);
    background: linear-gradient(180deg, rgba(223,234,252,1) 0%, rgba(255,255,255,0.9870370335049099) 100%);
    height:100vh;
    background-repeat:no-repeat;
  }
`;



function Queue(props) {
   
  
  const [musicinfo,setMusicInfo] = useState("")
  const [musiclist,setMusicList] = useState([])
  const handleCategory = ()=> {
        props.setOpen("close")
    }
    
  useEffect(() => {
    
    },[])    
    
  return (
      <>
       <GlobalStyle/>
    <div className={props.isOpen === "open" ? "QueueBlockOpen" : "QueueBlock"}>
    <div onClick={handleCategory}>
    <CircleButton/>
    </div>
    <CdBlock float={{"width":"20rem","height":"20rem","display":"inline-block"}} cover = {musicinfo.tagCover}/>
     <AddMusic float={{"float":"right"}} setMusicList={setMusicList}/>
     
    <QueueBlock setMusicInfo={setMusicInfo} musicdata={props.musicdata} setPlaying={props.setPlaying} musiclist={musiclist} setId={props.setId} id={props.id}/>
    
    </div>
    </>
  );
}

export default Queue;
