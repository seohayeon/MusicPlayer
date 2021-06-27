import CdBlock from './player/Player';
import CircleButton from './player/BackButton';
import PlayButton from './player/PlayButton';
import RangeBar from './player/Range';
import SongInfo from './player/SongInfo';
import React,{useState} from 'react';
import styled from 'styled-components';
import {GiHamburgerMenu} from "react-icons/gi"
import {IoMdArrowRoundBack} from "react-icons/io"
import '../App.css';

const Top=styled.div`
    width:100%;
    height:3rem;
`
function PlayerBlock(props) {
    
    const title = props.playing.title
    const artist = props.playing.artist
    const handleCategory = ()=> {
        props.setOpen("open")
    }
    
  return (
    <div className="PlayerBlock">
    <Top>
     <CircleButton float={{"float":"left","margin-top":"1rem","margin-left":"1rem"}} icon=<IoMdArrowRoundBack/>/>
    <div onClick={handleCategory}>
     <CircleButton float={{"float":"right","margin-top":"1rem","margin-right":"1rem"}} icon= <GiHamburgerMenu/>/>
     </div>
     </Top>
      <CdBlock cover={props.playing.tagCover}/>
      <SongInfo title={title} artist={artist}/>
      <PlayButton info={props.playing} setPlaying={props.setPlaying} id={props.id} setId={props.setId}/>
      
    </div>
  );
}

export default PlayerBlock;
