import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import LargeBlueButton from '../atom/LargeBlueButton'
import LargeBasicButton from '../atom/LargeBasicButton'
import {FaBackward,FaForward,FaPause,FaPlay} from "react-icons/fa"
import { useMusicState,useMusicDispatch } from '../../MusicContext';
import { usePlayListState } from '../../PlayListContext';

const ControllBlokDiv= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;   
`

function ControllBlock(props) {
    let { audio,setMeta } = props
    let [paused,setPaused] = useState(true)
    let musics = useMusicState()
    const dispatch = useMusicDispatch();
    let playlist = usePlayListState()
    
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
            let index = playlist.findIndex((e) => e.id == musics.id);
            let info = playlist[index+1]
            if(!info) return;
            dispatch({
            type: 'CHANGE',
                music: {
                    id:info.id,
                    title:info.title,
                    artist:info.artist,
                    artwork:info.artwork
                }
            });
            let src = playlist.find(e=>e.id === info.id).src
            audio.current.src = src;
            audio.current.load();
            audio.current.play()
            updateMediaData(info)
    }
    const handlePrev = async () => {
            let index = playlist.findIndex((e) => e.id==musics.id);
            let info = playlist[index - 1]
            if(!info) return;
            dispatch({
            type: 'CHANGE',
                music: {
                    id:info.id,
                    title:info.title,
                    artist:info.artist,
                    artwork:info.artwork
                }
            });
            let src = playlist.find(e=>e.id === info.id).src
            audio.current.src = src;
            audio.current.load();
            audio.current.play()
            updateMediaData(info)
    }
    
    const updateMediaData = (m) => {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
            title: m.title,
            artist: m.artist,
            artwork: [
                { src: m.artwork, sizes: '128x128', type: 'image/png' }
                ]
            });
            navigator.mediaSession.setActionHandler('previoustrack', function() {
                
                let index = playlist.findIndex((e) => e.id==m.id);
                let info = playlist[index - 1]
                if(!info) return;
                dispatch({
                    type: 'CHANGE',
                    music: {
                        id:info.id,
                        title:info.title,
                        artist:info.artist,
                        artwork:info.artwork
                    }
                });
                let src = playlist.find(e=>e.id === info.id).src
                audio.current.src = src;
                audio.current.load();
                audio.current.play()
                updateMediaData(info)
            
            });
            navigator.mediaSession.setActionHandler('nexttrack', function() {
                let index = playlist.findIndex((e) => e.id==m.id);
                let info = playlist[index + 1]
                if(!info) return;
                dispatch({
                    type: 'CHANGE',
                    music: {
                        id:info.id,
                        title:info.title,
                        artist:info.artist,
                        artwork:info.artwork
                    }
                });
                let src = playlist.find(e=>e.id === info.id).src
                audio.current.src = src;
                audio.current.load();
                audio.current.play()
                updateMediaData(info)
            });
        }
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