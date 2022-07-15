import React,{useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';

const AlbumArtBlockDiv = styled.div`
   width: 32rem;
   height:32rem;
   margin:0 auto;
   margin-top:5rem;
   background: rgb(${(props) => String(props.color[0])});
   box-shadow:  19px 19px 38px rgb(${(props) => String(Util.colorLuminance(props.color[0],-0.3))}),
             -19px -19px 38px rgb(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
   border-radius:100rem;
   padding:0.8rem;
   overflow:hidden;
`;
const AlbumArt = styled.img`
   width:100%;
   height:100%;
   border-radius:100rem;
   object-fit:cover;
`;

function ArtworkAtom(props) {
    const {color} = useContext(ColorContext)
  return (
    <div>
    <AlbumArtBlockDiv style={props.pos}
                      onClick={props.onClick}
                      color={color}>
        <AlbumArt src={props.img}/>
    </AlbumArtBlockDiv>
    </div>
      );
}

export default ArtworkAtom;