import React, {useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';

const CircleButtonBlock= styled.div`
    width:3.6rem;
    height:3.6rem;
    border-radius:100%;
    box-shadow:  10px 10px 20px rgb(${(props) => String(Util.colorLuminance(props.color[0],-0.3))}),
             -10px -10px 20px rgb(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
    overflow:hidden;         
    padding:0.36rem;
    color:${(props) => props.color[1]?`rgb(${String(props.color[1])})`:'#A7B6CD'};
`
const Icon = styled.div`
    font-size:1.5rem;
    background:none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const InButton = styled.div`
    position: relative;
    background:rgb(${(props) => String(props.color[0])});
    object-fit:cover;
    border-radius:50%;
    width:100%;
    height:100%;
    box-shadow: 0 0 6px 2px rgb(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
`


function MidiumBasicButton(props) {
    const {color} = useContext(ColorContext)
  return (
      
     <CircleButtonBlock id={props.id} style={props.pos} onClick={props.onClick} color={color}>
     <InButton color={color}>
     <Icon>{props.icon}</Icon>
     </InButton>
        </CircleButtonBlock>
        
      );
}

export default MidiumBasicButton;