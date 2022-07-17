import React,{useState,useEffect,useContext} from 'react';
import styled from 'styled-components';
import LargeBlueButton from '../atom/LargeBlueButton'
import LargeBasicButton from '../atom/LargeBasicButton'
import {FaBackward,FaForward,FaPause,FaPlay} from "react-icons/fa"
import { useMusicState,useMusicDispatch } from '../../MusicContext';
import { usePlayListState } from '../../PlayListContext';
import { ColorContext } from '../../ColorContext';
import ColorThief from 'color-thief-standalone';

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
    let playlist = usePlayListState()
    const {color,setColor} = useContext(ColorContext)
    
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
            dpChange(info)
    }
    const handlePrev = async () => {
            let index = playlist.findIndex((e) => e.id==musics.id);
            let info = playlist[index - 1]
            if(!info) return;
            dpChange(info)
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
                dpChange(info)
            
            });
            navigator.mediaSession.setActionHandler('nexttrack', function() {
                let index = playlist.findIndex((e) => e.id==m.id);
                let info = playlist[index + 1]
                if(!info) return;
                dpChange(info)
            });
            navigator.mediaSession.setActionHandler('seekbackward', function() {
                let currentTime = audio.current.currentTime
                audio.current.currentTime = audio.current.currentTime - 5 
            });
            navigator.mediaSession.setActionHandler('seekforward', function() {
                let currentTime = audio.current.currentTime
                audio.current.currentTime = audio.current.currentTime + 5 
            });
        }
    }
    const dpChange = (info) => {
        dispatch({
            type: 'CHANGE',
                music: {
                    id:info.id,
                    title:info.title,
                    artist:info.artist,
                    artwork:info.artwork,
                    color:info.color
                }
        });
        let src = playlist.find(e=>e.id === info.id).src
        audio.current.src = src;
        audio.current.load();
        audio.current.play()
        updateMediaData(info)
        
        const coverImage = new Image();
        coverImage.src = info.artwork
        coverImage.onload = () => {
            const colorThief = new ColorThief();
            const pal = colorThief.getPalette(coverImage, 2);
            setColor(pal)
        }
    }
  return (
        <ControllBlokDiv>
            <LargeBasicButton icon={<FaBackward/>} onClick={handlePrev}/>
            <LargeBlueButton pos={{'marginLeft':'2rem','marginRight':'2rem'}} icon={paused?<FaPlay/>:<FaPause/>} onClick={handlePause}/>
            <LargeBasicButton icon={<FaForward/>} onClick={handleNext}/>
        </ControllBlokDiv>
      );
}

export default ControllBlock;