import React from 'react';
import styled from 'styled-components';

const CircleButtonBlock= styled.div`
    width:3rem;
    height:3rem;
    background:white;
    border-radius:100%;
    background: rgb(152,169,255);
background: radial-gradient(circle, rgba(152,169,255,0.9055555555555556) 0%, rgba(67,113,255,1) 100%);
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
    
  return (
      
     <CircleButtonBlock style={props.pos}>
     <Icon>{props.icon}</Icon>
        </CircleButtonBlock>
        
      );
}

export default SmallBlueButton;