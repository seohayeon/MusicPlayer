import React from 'react';
import styled from 'styled-components';

const RangeBarBlock= styled.div`
    width:100%;
    height:5rem;
    margin-top:5rem;
`
const InputRange = styled.input`
    width:70%;
    
     &:focus{
         outline:none;
     }
    

`

function RangeBar(props) {
    
  return (
      
    <RangeBarBlock>
    <InputRange type="range"/>
    </RangeBarBlock>
        
      );
}

export default RangeBar;