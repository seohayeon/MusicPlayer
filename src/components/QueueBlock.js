import {createGlobalStyle } from 'styled-components';
import CdBlock from './player/Player';
import QueueBlock from './queue/Queue';
import AddMusic from './queue/AddMusic';
import React from 'react';
import CircleButton from './player/BackButton';
import '../App.css';
import {IoMdArrowRoundBack} from "react-icons/io"
import {BiPlus} from "react-icons/bi"

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(223,234,252);
    background: linear-gradient(180deg, rgba(223,234,252,1) 0%, rgba(255,255,255,0.9870370335049099) 100%);
    height:100vh;
    background-repeat:no-repeat;
  }
`;



function Queue(props) {
   
   
   
  const handleCategory = ()=> {
        props.setOpen("close")
    }
    
  return (
      <>
       <GlobalStyle/>
    <div className={props.isOpen === "open" ? "QueueBlockOpen" : "QueueBlock"}>
    <label for="audio-upload">
     <CircleButton float={{"margin-right":"1rem","margin-top":"1rem","position":"absolute","right":"0"}} icon=<BiPlus/>/>
     </label>
    <div onClick={handleCategory}>
    <CircleButton float={{"margin-top":"1rem","margin-left":"1rem"}} icon=<IoMdArrowRoundBack/>/>
    </div>
    
   
    <CdBlock float={{"width":"20rem","height":"20rem","margin-top":"1rem"}}/>
    
     <AddMusic/>
     
    <QueueBlock/>
    
    </div>
    </>
  );
}

export default Queue;
