import React from "react";
import styled from 'styled-components'

const Title = styled.div`
    margin-left:0.8rem;
    margin-top:1.04rem;
    font-size:1.2rem;
    font-family: 'Noto Sans CJK KR';
`
const Artist = styled.div`
    margin-left:0.8rem;
    margin-top:0.24rem;
    font-size:0.8rem;
    font-family: 'Noto Sans CJK KR';
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