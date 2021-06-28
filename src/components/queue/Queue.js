import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import '../../App.css';
import {FaPause} from "react-icons/fa"
import {FaPlay} from "react-icons/fa"
import { useMusicState } from '../MusicContext';
import { usePlayingDispatch, usePlayingState} from '../PlayingConText';

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


function Queue() {
    const dispatch = usePlayingDispatch();
    const [select,setSelect] = useState("")
    
    let playlist = useMusicState();
    let playing = usePlayingState();

    const onChangeTitleBg = (e, info) => {
    let currentplay = playlist.find(it=>it.id===info.id)   
    let myAudio = document.getElementById("myAudio");    
    myAudio.play()
    e.preventDefault();
    setSelect(info.id);
    dispatch({
      type: 'SETTING',
      music: {
        id: currentplay.id,
        src: currentplay.src,
        title: currentplay.title,
        artist:currentplay.artist,
        cover:currentplay.tagCover
      }
    });
   // alert(JSON.stringify(currentplay))
};
    
  useEffect(() => {
      
      setSelect(playing.id)
      
  }, [playing]);
   

    

    
    
   
  return (
      
     <>
     <QueueBlock>
      {playlist.map((element) =>
         <div className={
                  select === element.id ? "select_clicked" : "select_default"
                }
                
                onClick={(e) => {onChangeTitleBg(e, element)}}>
          
          <SongInfo>
         <Title>
         {element.title}
         </Title>
         <Artist>
         {element.artist}
         </Artist>
         </SongInfo>
         <audio id="myAudio" src={element.src}></audio>
         <div className={
                  select === element.id ? "button_clicked" : "button_default"
                }>
                {
                select === element.id ? 
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

