import React from 'react';
import styled from 'styled-components';
import {usePlayingState} from '../PlayingConText';

const PlayerCdBlock = styled.div`
   width: 25rem;
   height:25rem;
   margin:0 auto;
   margin-top:5rem;
   background: #DDE6F7;
   box-shadow:  19px 19px 38px #9096a1,
             -19px -19px 38px #ffffff;
   border-radius:100rem;
   padding:0.8rem;
   overflow:hidden;
`;
const AlbumArt = styled.img`
   width:100%;
   height:100%;
   border-radius:100rem;
   object-fit:cover;
   background: rgb(201,112,140);
   background: linear-gradient(0deg, rgba(201,112,140,1) 0%, rgba(173,145,194,1) 100%);
`;



function PlayerCd(props) {
    let currentplay = usePlayingState()
    
  return (
      
     <PlayerCdBlock style={props.float}>
     <AlbumArt src={currentplay.cover}/>
        </PlayerCdBlock>
        
      );
}

export default PlayerCd;