import React from 'react';
import styled from 'styled-components';

const CircleButtonBlock= styled.div`
    width:3.5rem;
    height:3.5rem;
    background:white;
    border-radius:100%;
    background: rgb(152,169,255);
background: radial-gradient(circle, rgba(152,169,255,0.9055555555555556) 0%, rgba(67,113,255,1) 100%);
    box-shadow:  19px 19px 38px #9096a0,
             -19px -19px 38px #ffffff;
    overflow:hidden;         
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const Icon = styled.div`
    color:#fff;
    font-size:2.5rem;
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
    border-radius:100rem;
    width:100%;
    height:100%;
    box-shadow: 0 0 6px 2px #fff;
`

function CircleButton(props) {
    
  return (
      
     <CircleButtonBlock style={props.float}>
     <InButton>
     <Icon>{props.icon}</Icon>
     </InButton>
        </CircleButtonBlock>
        
      );
}

export default CircleButton;