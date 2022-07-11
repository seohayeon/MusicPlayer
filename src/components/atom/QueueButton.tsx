import React from "react";
import styled from 'styled-components'

const Title = styled.div`
    margin-left:1rem;
    margin-top:1.3rem;
    font-size:1.5rem;
    color:#758398;
    font-family: 'Noto Sans CJK KR';
`
const Artist = styled.div`
    margin-left:1rem;
    margin-top:0.3rem;
    font-size:1rem;
    font-family: 'Noto Sans CJK KR';
    color:#758398;
`
const SongInfo = styled.div`
    float:left;
`


function QueueButton(props){
    const { title, artist } = props;
  return (
         <SongInfo>
         <Title>
         {title}
         </Title>
         <Artist>
         {artist}
         </Artist>
         </SongInfo>
    )
};

export default QueueButton