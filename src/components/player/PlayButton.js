import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import CircleButton from './BackButton';
import BlueButton from './BlueButton';
import {FaBackward} from "react-icons/fa"
import {FaForward} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
import {FaPlay} from "react-icons/fa"
import { useMusicState} from '../MusicContext';
import { usePlayingDispatch, usePlayingState} from '../PlayingConText';

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
const RangeBarBlock= styled.div`
    width:70%;
    height:0.6rem;
    background: #E8F0FB;
box-shadow: inset 0.1rem 0.1rem 0.2rem  #b6bcc5,
            inset 0.1rem 0.1rem 0.2rem #ffffff;
    margin:0 auto;
    overflow:hidden;
    border-radius:1rem;
    border-bottom:0.1px solid #b6bcc5;
`
const InputRange = styled.div`
    width:0%;
    border-radius:1rem;
    background: rgb(152,169,255);
    background: radial-gradient(circle, rgba(152,169,255,0.9055555555555556) 0%, rgba(67,113,255,1) 100%);
    height:100%;
`
const Time = styled.div`
    width:70%;
    padding-top:0.2rem;
    margin:0 auto;
    margin-top:5rem;
    margin-bottom:1.5rem;
    color:#9FADC7;
`
const CurrentTime=styled.div`
    float:left;
`
const DurateTime=styled.div`
    float:right;
`


function PlayBar() {
    let playlist = useMusicState()
    const dispatch = usePlayingDispatch();
    let currentmusic = usePlayingState()
    let [status,setStatus] = useState(true)
    let [current,setCurrent] = useState(0)
    let [durate,setDurate] = useState(0)
    let myAudio = document.getElementById("myAudio");

     useEffect(() => {
         if(myAudio){
      myAudio.play()
         }
  }, [currentmusic,myAudio]);
   
   if(myAudio){
    myAudio.addEventListener('ended',function(){
       let nextmusic = playlist.find(it=>it.id===currentmusic.id+1)
        if(nextmusic){
            dispatch({
      type: 'SETTING',
      music: {
        id: nextmusic.id,
        src: nextmusic.src,
        title: nextmusic.title,
        artist:nextmusic.artist,
        cover:nextmusic.tagCover
      }
    });
        }else{
            //alert("no music")
        }
    });
    
   }
   
   if(myAudio){
    myAudio.addEventListener("timeupdate", function() {
    let progbar = document.getElementById("progressbar");
     const percentage = Math.floor((100 / myAudio.duration) * myAudio.currentTime);
    if(isNaN(percentage)){
        progbar.value=0
    }else{
        document.getElementById('progval').style.width=percentage+'%';
        let h = Math.floor(myAudio.currentTime/60)
        let m = Math.floor(myAudio.currentTime-60*h)
        let h1 = Math.floor(myAudio.duration/60)
        let m1 = Math.floor(myAudio.duration-60*h1)
        setCurrent(h+":"+m)
        setDurate(h1+":"+m1)
        
    }
});
    
    }


    const handleMusic = ()=>{
        if(myAudio){
        if(status===false){
        myAudio.pause()
        setStatus(myAudio.paused)
        }else if(status===true){
            myAudio.play()
            setStatus(myAudio.paused)
        }
        }
    }
    
    const handleNext = ()=>{
    let nextmusic = playlist.find(it=>it.id===currentmusic.id+1)
        if(nextmusic){
            dispatch({
      type: 'SETTING',
      music: {
        id: nextmusic.id,
        src: nextmusic.src,
        title: nextmusic.title,
        artist:nextmusic.artist,
        cover:nextmusic.tagCover
      }
    });
        }else{
            alert("no music")
        }
    }
    
    const handleBack = ()=>{
        let backmusic = playlist.find(it=>it.id===currentmusic.id-1)
        if(backmusic){
            dispatch({
      type: 'SETTING',
      music: {
        id: backmusic.id,
        src: backmusic.src,
        title: backmusic.title,
        artist:backmusic.artist,
        cover:backmusic.tagCover
      }
    });
        }else{
            alert("no music")
        }
    }
    
    let progbar = document.getElementById("progressbar");
    const handleProg = (e) => {
        if(myAudio){
var pos = e.pageX - progbar.offsetLeft; 
var percent = pos / progbar.offsetWidth;
if(isNaN(percent)||isNaN(myAudio.currentTime)||isNaN(myAudio.duration)){
    myAudio.currentTime=0
    progbar.value=0
    myAudio.duration=100
    percent=0
}else{
myAudio.currentTime = percent * myAudio.duration;
progbar.value = percent * 100;
}
}
    }
    
  return (
     <>
      <Time>
    <CurrentTime>{current}</CurrentTime> 
    <DurateTime>{durate}</DurateTime>
    </Time>
    
        <RangeBarBlock id="progressbar" onClick={handleProg}>
    <InputRange id="progval"></InputRange>
    </RangeBarBlock>
    
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
    <audio id="myAudio" src={currentmusic.src} preload="auto">
    </audio>
   
    </PlayBarBlock>
        </>
      );
}

export default PlayBar;