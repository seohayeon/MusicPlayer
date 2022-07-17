import React,{useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';

const CircleButtonBlock= styled.div`
    width:3.6rem;
    height:3.6rem;
    background:white;
    border-radius:100%;
    background: radial-gradient(circle, rgba(${(props) => props.color[2]? String(Util.colorLuminance(props.color[2],0.6)):'152,169,255'},0.9055555555555556) 0%, rgba(${(props) => props.color[2]? String(Util.colorLuminance(props.color[2],0)):'67,113,255'},1) 100%);
    box-shadow: 10px 10px 20px rgba(${(props) => String(Util.colorLuminance(props.color[0],-0.3))}),
             -10px -10px 20px rgba(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
    overflow:hidden;
    padding:0.36rem;
`
const Icon = styled.div`
    color:#fff;
    font-size:1.44rem;
    background:none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const InButton = styled.div`
    position: relative;
    background:#none;
    object-fit:cover;
    border-radius:50%;
    width:100%;
    height:100%;
`

function LargeBlueButton(props) {
    const {color} = useContext(ColorContext)
  return (
      
     <CircleButtonBlock id={props.id} style={props.pos} onClick={props.onClick} color={color}>
     <InButton>
     <Icon>{props.icon}</Icon>
     </InButton>
        </CircleButtonBlock>
        
      );
}

export default LargeBlueButton;