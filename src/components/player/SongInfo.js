import React from 'react';
import styled from 'styled-components';

const SongInfoBox= styled.div`
    width:100%;
    height:auto;
    background:none;
    margin-top:5rem;
`
const Title=styled.div`
    color:#758398;
    font-size:3rem;
`
const Artist=styled.div`
    color:#9FADC7;
    font-size:1.3rem;
    margin-top:1rem;
`


function SongInfo(props) {
    
  return (
      
     <div className="SongInfo">
     <SongInfoBox>
     <Title>
     {props.title}
     </Title>
     <Artist>
     {props.artist}
     </Artist>
     </SongInfoBox>
     </div>
        
      );
}

export default SongInfo;