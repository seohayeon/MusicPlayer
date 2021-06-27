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


function PlayBar(props) {
    
    let [status,setStatus] = useState(true)
    let [current,setCurrent] = useState(0)
    let [durate,setDurate] = useState(0)
    let myAudio = document.getElementById("myAudio");
    //{alert(myAudio.currentTime)}
     useEffect(() => {
         if(myAudio){
      myAudio.play()
         }
  }, [props.id]);
   
   if(myAudio){
    myAudio.addEventListener('ended',function(){
       let playlist = sessionStorage.getItem("playlist")
        let playparse = JSON.parse(playlist)
        let idx = props.id
        setStatus(false)
   
      if(playparse[idx+1]!==undefined){
      props.setPlaying(playparse[idx+1])
      props.setId(idx+1)
       }else if(playparse[idx+1]===undefined){
      props.setPlaying(playparse[0])
      props.setId(0)
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
        let playlist = sessionStorage.getItem("playlist")
        let playparse = JSON.parse(playlist)
        let idx = props.id
        setStatus(false)
   
      if(playparse[idx+1]!==undefined){
      props.setPlaying(playparse[idx+1])
      props.setId(idx+1)
       }else if(playparse[0]&&playparse[idx+1]===undefined){
      props.setPlaying(playparse[0])
      props.setId(0)
       }
    }
    
    const handleBack = ()=>{
        let playlist = sessionStorage.getItem("playlist")
        let idx = props.id
       setStatus(false)
       if(JSON.parse(playlist)[idx-1]!==undefined){
      props.setPlaying(JSON.parse(playlist)[idx-1])
      props.setId(idx-1)

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
    <audio id="myAudio" src={props.info.scr} preload="auto">
    </audio>
   
    </PlayBarBlock>
        </>
      );
}

export default PlayBar;