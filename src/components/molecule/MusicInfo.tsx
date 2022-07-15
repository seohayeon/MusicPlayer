import React,{useState,useEffect,useContext} from 'react';
import styled from 'styled-components';
import ArtworkAtom from '../atom/ArtworkAtom'
import { useMusicState } from '../../MusicContext';
import { ColorContext } from '../../ColorContext';

const Title = styled.div`
    margin-top:6rem;
    margin-bottom:0.2rem;
    text-align:center;
    font-size:3.5rem;
    font-family: 'Noto Sans CJK KR';
    font-weight:800;
`;
const Artist = styled.div`
    margin-bottom:4rem;
    text-align:center;
    font-family: 'Noto Sans CJK KR';
    font-size:1.4rem;
`;

function MusicInfoBlock(props) {
  const musics = useMusicState()
  const [music,setMusic] = useState(musics)
  const {color} = useContext(ColorContext)
    
  useEffect( () => {
        setMusic(musics)
  }, [musics]);
  
  return (
        <div style={{color:color[1]?`rgb(${String(color[1])})`:'rgb(107,121,146)'}}>
        <ArtworkAtom id='artwork' img={musics.artwork}/>
        <Title id='title'>{musics.title}</Title>
        <Artist id='artist'>{musics.artist}</Artist>
        
        </div>
      );
}

export default MusicInfoBlock;
