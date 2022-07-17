import React,{useState,useEffect,useContext,useRef} from 'react';
import styled,{keyframes} from 'styled-components';
import ArtworkAtom from '../atom/ArtworkAtom'
import { useMusicState } from '../../MusicContext';
import { ColorContext } from '../../ColorContext';
import ControllBlock from '../molecule/ControllBlock'
import ProgressBar from '../molecule/ProgressBar'

const Title = styled.div`
    margin-bottom:0.16rem;
    text-align:center;
    font-size:2.8rem;
    font-family: 'Noto Sans CJK KR';
    font-weight:800;
    margin:0 auto;
    margin-top:4.8rem;
    white-space:nowrap;
    padding:0 1rem 0 1rem;
    overflow:hidden;
    width:31rem;
`;
const Marquee=styled.div`
    
`
const Artist = styled.div`
    margin-bottom:3.2rem;
    text-align:center;
    font-family: 'Noto Sans CJK KR';
    font-size:1.12rem;
`;
const CloneTitle = styled.span`
    font-size:2.8rem;
    font-family: 'Noto Sans CJK KR';
    font-weight:800;
    padding-right:10rem;
    display:inline-block;
    
`
const OriTitle = styled.span`
    display:inline-block;
    padding-right:10rem;
    margin:0 auto;
`


function MusicInfoBlock(props) {
  const musics = useMusicState()
  const [music,setMusic] = useState(musics)
  const {color} = useContext(ColorContext)
  const oriRef = useRef()
  const cloneRef = useRef()
  const displayWidth = document.getElementById('title')?.offsetWidth
  
  useEffect( () => {
        setMusic(musics)
        if(oriRef.current || cloneRef.current){
        oriRef.current.classList.remove("oriEffect")
        cloneRef.current.classList.remove("cloneEffect")
        void oriRef.current.offsetWidth
        oriRef.current.classList.add("oriEffect")
        cloneRef.current.classList.add("cloneEffect")
        }
  }, [musics]);

  let titleWidth = getTextWidth(musics.title,  "800 2.8rem Noto Sans CJK KR")
 
  return (
        <div id='wrap' style={{color:color[1]?`rgb(${String(color[1])})`:'rgb(107,121,146)'}}>

        <ArtworkAtom id='artwork' img={musics.artwork}/>
        <div className='musicInfo'>
        <div>
        <Title id='title'>
        {displayWidth > titleWidth?
        musics.title:
        <Marquee>
        <OriTitle className='oriEffect' ref={oriRef}>{musics.title}</OriTitle>
        <CloneTitle className='cloneEffect' ref={cloneRef}>{musics.title}</CloneTitle>
        </Marquee>}</Title>
        </div>
        <Artist id='artist'>{musics.artist}</Artist>
        <ProgressBar audio={props.audio}/>
        <ControllBlock audio={props.audio}/>
        </div>

        </div>
      );
      
      function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, 'font-weight') || '800';
  const fontSize = getCssStyle(el, 'font-size') || '2.8rem';
  const fontFamily = getCssStyle(el, 'font-family') || 'Noto Sans CJK KR';
  
  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

}


export default MusicInfoBlock;
