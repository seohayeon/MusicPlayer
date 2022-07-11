import React from 'react';
import styled from 'styled-components';

const CircleButtonBlock= styled.div`
    width:4.5rem;
    height:4.5rem;
    background:white;
    border-radius:100%;
    background: linear-gradient(145deg, #eef7ff, #c8d0dd);
    overflow:hidden;         
    padding:0.45rem;
`
const Icon = styled.div`
    color:#A7B6CD;
    font-size:1.8rem;
    background:none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const InButton = styled.div`
    position: relative;
    background:#E8F0FB;
    object-fit:cover;
    border-radius:100rem;
    width:100%;
    height:100%;
    box-shadow: 0 0 6px 2px #fff;
`

function MidiumBasicButton(props) {
    
  return (
      
     <CircleButtonBlock style={props.pos} onClick={props.onClick}>
     <InButton>
     <Icon>{props.icon}</Icon>
     </InButton>
        </CircleButtonBlock>
        
      );
}

export default MidiumBasicButton;