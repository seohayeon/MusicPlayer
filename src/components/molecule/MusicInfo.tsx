import React from 'react';
import styled from 'styled-components';
import ArtworkAtom from '../atom/ArtworkAtom'
import { useMusicState } from '../../MusicContext';

const Title = styled.div`
    margin-top:6rem;
    margin-bottom:0.2rem;
    text-align:center;
    font-size:3.5rem;
    font-family: 'Noto Sans CJK KR';
    font-weight:800;
    color:#6b7992;
`;
const Artist = styled.div`
    margin-bottom:4rem;
    text-align:center;
    font-family: 'Noto Sans CJK KR';
    color:#6b7992;
    font-size:1.4rem;
`;

function MusicInfoBlock(props) {
  const musics = useMusicState()
  return (
        <div>
        <ArtworkAtom img={musics.artwork}/>
        <Title>{musics.title}</Title>
        <Artist>{musics.artist}</Artist>
        
        </div>
      );
}

export default MusicInfoBlock;