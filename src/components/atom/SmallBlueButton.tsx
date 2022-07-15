import React,{useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';

const CircleButtonBlock= styled.div`
    width:3rem;
    height:3rem;
    border-radius:100%;
    background: radial-gradient(circle, rgba(${(props) => props.color[2]? String(Util.colorLuminance(props.color[2],0.6)):'152,169,255'},0.9055555555555556) 0%, rgba(${(props) => props.color[2]? String(Util.colorLuminance(props.color[2],0)):'67,113,255'},1) 100%);
    box-shadow: 10px 10px 20px rgba(${(props) => String(Util.colorLuminance(props.color[0],-0.3))}),
             -10px -10px 20px rgba(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
    display:inline;
    float:right;
    color:white;
    padding:0.45rem;
    position:absolute;
    right:0%;
    top:50%;
    transform:translate(-50%, -50%);
`
const Icon = styled.div`
    color:#fff;
    font-size:1.2rem;
    background:none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

function SmallBlueButton(props) {
    const {color} = useContext(ColorContext)
  return (
      
     <CircleButtonBlock style={props.pos} color={color}>
     <Icon>{props.icon}</Icon>
        </CircleButtonBlock>
        
      );
}

export default SmallBlueButton;