import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import '../../App.css';
import {FaPause} from "react-icons/fa"
import {FaPlay} from "react-icons/fa"
import axios from "axios"
import Player from "../Web-Player"

const QueueBlock = styled.div`
    margin-top:5rem;
    padding-left:2rem;
    padding-right:2rem;
    height:55%;
    overflow:scroll;
`
const Title = styled.div`
    margin-left:1rem;
    margin-top:1rem;
    font-size:1.5rem;
    color:#758398;
`
const Artist = styled.div`
    margin-left:1rem;
    margin-top:0.5rem;
    font-size:1rem;
    color:#758398;
`
const SongInfo = styled.div`
    float:left;
`


function Queue(props) {
    
    const [select,setSelect] = useState("")
    let [musiclist,setMusicList] =useState([])
    let playlist = JSON.parse(sessionStorage.getItem("playlist"))
    
     let myAudio1 = document.getElementById("myAudio"); 
    
    const onChangeTitleBg = (e, id,info) => {
    let myAudio = document.getElementById("myAudio");    
    myAudio.play()
    e.preventDefault();
    setSelect(id);
    props.setMusicInfo(info)
    props.setPlaying(info)
    props.setId(id)
};
    
  useEffect(() => {
      
      setMusicList(props.musiclist)
      setSelect(props.id)
      
    if(JSON.parse(sessionStorage.getItem("playlist"))[props.id]!==undefined){
    props.setMusicInfo(JSON.parse(sessionStorage.getItem("playlist"))[props.id])
      }
      
  }, [props.musicdata,props.musiclist,props.id]);
   

    

    
    
   
  return (
      
     <>
     <QueueBlock>
      {musiclist.map((element,index) =>
         <div className={
                  select === index ? "select_clicked" : "select_default"
                }
                
                onClick={(e) => {onChangeTitleBg(e, index,element)}}>
          
          <SongInfo>
         <Title>
         {element.title}
         </Title>
         <Artist>
         {element.artist}
         </Artist>
         </SongInfo>
         <audio id="myAudio" src={element.scr}></audio>
         <div className={
                  select === index ? "button_clicked" : "button_default"
                }>
                {
                select === index ? 
                <div className="icon">
                <FaPause/>
                </div> 
                : <div className="inlineButton">
                <div className="icon">
                <FaPlay style={{"color":"#A7B6CD"}}/>
                </div>
                </div>
                }
                </div>
     </div>
        )}
     </QueueBlock>
     </>
        
      );
}

export default Queue;

