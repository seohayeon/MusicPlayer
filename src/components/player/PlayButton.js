import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import CircleButton from './BackButton';
import BlueButton from './BlueButton';
import {FaBackward} from "react-icons/fa"
import {FaForward} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
import {FaPlay} from "react-icons/fa"

const PlayBarBlock= styled.div`
    width:70%;
    height:auto;
    background:none;
    margin:0 auto;
    line-height:5rem;
    background:none;
    position: relative;
    padding-top:20rem;
`


function PlayBar(props) {
    
    let [status,setStatus] = useState(true)
    let myAudio = document.getElementById("myAudio");
    
     useEffect(() => {
         if(myAudio){
      myAudio.play()
         }
  }, [props.id]);
    
    const handleMusic = ()=>{
        if(status===false){
        myAudio.pause()
        setStatus(myAudio.paused)
        }else if(status===true){
            myAudio.play()
            setStatus(myAudio.paused)
        }
    }
    
    const handleNext = ()=>{
        let playlist = sessionStorage.getItem("playlist")
        let idx = props.id
        
   
      if(JSON.parse(playlist)[idx+1]!==undefined){
      props.setPlaying(JSON.parse(playlist)[idx+1])
      props.setId(idx+1)
       }
    }
    
    const handleBack = ()=>{
        let playlist = sessionStorage.getItem("playlist")
        let idx = props.id
       
       if(JSON.parse(playlist)[idx-1]!==undefined){
      props.setPlaying(JSON.parse(playlist)[idx-1])
      props.setId(idx-1)

       }
    }
    
  return (
      
    <PlayBarBlock>
    <div onClick={handleBack}>
    <CircleButton float={{"float":"left","width":"7.5rem","height":"7.5rem","position":"absolute","top":"50%","transform": "translate(0%, -50%)"}} icon =<FaBackward/>/>
    </div>
    <div onClick={handleMusic}>
    <BlueButton float={{"display":"inline-block","width":"11rem","height":"11rem"}} icon=
    {status === false ? <FaPause/> : <FaPlay/>}/>
    </div>
    <div onClick={handleNext}>
    <CircleButton float={{"float":"right","width":"7.5rem","height":"7.5rem","position":"absolute","top":"50%","transform": "translate(0%, -50%)","right":"0"}} icon=<FaForward/>/>
    </div>
    <audio id="myAudio" src={props.info.scr} preload="auto">
    </audio>
    
    </PlayBarBlock>
        
      );
}

export default PlayBar;