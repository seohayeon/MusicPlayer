import React,{useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';
import QueueButton from './QueueButton';
import {FaPlay} from "react-icons/fa"
import SmallBasicButton from './SmallBasicButton'

const BasicSongDiv = styled.div`
    width:100%;
    height:6.5rem;
    text-align:left;
    position: relative;
`


function BasicSongBlock(props) {
    const {color} = useContext(ColorContext)
    
  return (
      <BasicSongDiv>
        <QueueButton title={props.title} artist={props.artist}/>
        <SmallBasicButton icon={<FaPlay/>}/>
      </BasicSongDiv>
      );
}

export default BasicSongBlock;