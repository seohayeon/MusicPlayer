import React from 'react';
import styled from 'styled-components';

const CircleButtonBlock= styled.div`
    width:4.5rem;
    height:4.5rem;
    background:white;
    border-radius:100%;
    background: rgb(152,169,255);
    background: radial-gradient(circle, rgba(152,169,255,0.9055555555555556) 0%, rgba(67,113,255,1) 100%);
    box-shadow:  19px 19px 38px #9096a0,
             -19px -19px 38px #ffffff;
    overflow:hidden;
    padding:0.45rem;
`
const Icon = styled.div`
    color:#fff;
    font-size:1.8rem;
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
`

function LargeBlueButton(props) {
    
  return (
      
     <CircleButtonBlock style={props.pos} onClick={props.onClick}>
     <InButton>
     <Icon>{props.icon}</Icon>
     </InButton>
        </CircleButtonBlock>
        
      );
}

export default LargeBlueButton;