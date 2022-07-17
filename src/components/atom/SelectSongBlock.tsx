import React,{useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';
import QueueButton from './QueueButton';
import {FaPause} from "react-icons/fa"
import SmallBlueButton from './SmallBlueButton'

const SelectSongDiv = styled.div`
    width:100%;
    height:5.2rem;
    text-align:left;
    border-radius: 21px;
    position: relative;
    box-shadow: inset 13px 13px 18px rgb(${(props) => String(Util.colorLuminance(props.color[0],-0.3))}),
                inset -13px -13px 18px rgb(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
`

function SelectSongBlock(props) {
    const {color} = useContext(ColorContext)
    
  return (
      <SelectSongDiv color={color}>
        <QueueButton title={props.title} artist={props.artist}/>
        <SmallBlueButton icon={<FaPause/>}/>
      </SelectSongDiv>
      );
}

export default SelectSongBlock;