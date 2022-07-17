import React,{useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';

const AlbumArtBlockDiv = styled.div`
   width: 25.6rem;
   height:25.6rem;
   margin:0 auto;
   background: rgb(${(props) => String(props.color[0])});
   box-shadow:  19px 19px 38px rgb(${(props) => String(Util.colorLuminance(props.color[0],-0.3))}),
             -19px -19px 38px rgb(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
   border-radius:50%;
   padding:0.64rem;
   overflow:hidden;
   @media all and (min-width:1024px) { 
   
       
   }
`;
const AlbumArt = styled.img`
   width:100%;
   height:100%;
   border-radius:50%;
   object-fit:cover;
`;

function ArtworkAtom(props) {
    const {color} = useContext(ColorContext)
  return (
    <div>
    <AlbumArtBlockDiv style={props.pos}
                      onClick={props.onClick}
                      color={color}
                      id={props.id}>
        <AlbumArt src={props.img}/>
    </AlbumArtBlockDiv>
    </div>
      );
}

export default ArtworkAtom;