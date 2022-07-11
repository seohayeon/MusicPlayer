import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import LargeBlueButton from '../atom/LargeBlueButton'
import LargeBasicButton from '../atom/LargeBasicButton'
import {FaBackward,FaForward,FaPause,FaPlay} from "react-icons/fa"
import { useMusicState,useMusicDispatch } from '../../MusicContext';
import {Music} from '../../util/database'
const MusicDB = new Music()

const ControllBlokDiv= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;   
`

function ControllBlock(props) {
    let { audio } = props
    let [paused,setPaused] = useState(true)
    let musics = useMusicState()
    const dispatch = useMusicDispatch();
    
    useEffect(() => {
        audio?.current?.addEventListener("pause", function(){ 
            setPaused(true)
        })
        audio?.current?.addEventListener("play", function(){ 
            setPaused(false)
        })
    }, [audio]);
                
    
    
    const handlePause = () =>{
        if(audio.current.paused){
            audio.current.play()
        }else{
            audio.current.pause()
        }
    }
    const handleNext = async () => {
            let index = musics.index + 1
            let playlist = await MusicDB.findAll()
            let info = playlist[index]
            if(!info) return;
            dispatch({
            type: 'CHANGE',
                music: {
                    id:info._id,
                    index:index,
                    title:info.title,
                    artist:info.artist,
                    artwork:info.artwork
                }
            });
            let src = await MusicDB.getAudio(info._id)
            audio.current.src = src;
            audio.current.load();
            audio.current.play();
    }
    const handlePrev = async () => {
            let index = musics.index - 1
            let playlist = await MusicDB.findAll()
            let info = playlist[index]
            if(!info) return;
            dispatch({
            type: 'CHANGE',
                music: {
                    id:info._id,
                    index:index,
                    title:info.title,
                    artist:info.artist,
                    artwork:info.artwork
                }
            });
            let src = await MusicDB.getAudio(info._id)
            audio.current.src = src;
            audio.current.load();
            audio.current.play();
    }
    
  return (
        <ControllBlokDiv>
            <LargeBasicButton icon={<FaBackward/>} onClick={handlePrev}/>
            <LargeBlueButton pos={{'marginLeft':'2.5rem','marginRight':'2.5rem'}} icon={paused?<FaPlay/>:<FaPause/>} onClick={handlePause}/>
            <LargeBasicButton icon={<FaForward/>} onClick={handleNext}/>
        </ControllBlokDiv>
      );
}

export default ControllBlock;