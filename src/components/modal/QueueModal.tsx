import React,{useState,useEffect,useRef,} from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
import ArtworkAtom from '../atom/ArtworkAtom'
import QueueButton from '../atom/QueueButton'
import SmallBasicButton from '../atom/SmallBasicButton'
import MidiumBasicButton from '../atom/MidiumBasicButton'
import MidiumBlueButton from '../atom/MidiumBlueButton'
import SmallBlueButton from '../atom/SmallBlueButton'
import {FaPause,FaPlay} from "react-icons/fa"
import {TbRepeatOnce,TbRepeat} from "react-icons/tb"
import {ImShuffle} from "react-icons/im"
import { usePlayListState } from '../../PlayListContext';
import { useMusicState,useMusicDispatch } from '../../MusicContext';
import {Music} from '../../util/database'
const MusicDB = new Music()

const GlobalStyle = styled.div`
    background: rgb(223,234,252);
    background: linear-gradient(180deg, rgba(223,234,252,1) 0%, rgba(255,255,255,0.9870370335049099) 100%);
    background-repeat:no-repeat;
    overflow:scroll;
    min-height:100vh;
    width:100vw;
    position:absolute;
    z-index:3;
    top:0;
`
const QueueBlock = styled.div`
    margin:0 auto;
    margin-top:5rem;
    width:43rem;
    overflow:scroll;
`
const QueueTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;   
    width:43rem;
    margin:0 auto;
`

function QueueModal(props){
    const { open, close, header } = props;
    const playlist = usePlayListState()
    const [select,setSelect] = useState()
    let musics = useMusicState()
    const dispatch = useMusicDispatch();
    let audioRef  = useRef();
    
    
    useEffect(async () => {
        props.setAudio(audioRef)
        setSelect(musics.id)
    }, [musics,audioRef]);
    
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
                audioRef.current.src = src;
                audioRef.current.load();
                audioRef.current.play()
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
                audioRef.current.src = src;
                audioRef.current.load();
                audioRef.current.play()
                updateMediaData(info)
            });
        }
    }
    
    const onChangeMusic = async (e, info,i) => {
        e.preventDefault();
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
        audioRef.current.src = src;
        audioRef.current.load();
        audioRef.current.play()
        updateMediaData(info)
    };
    let [loop,setLoop] = useState(0);
    let [shuffle,setShuffle] = useState(false);
    
    const handleOnEnded = async () =>{
            let index = playlist.findIndex((e) => e.id==musics.id) + 1;
            let info = playlist[index]
            if(loop==1) return;
            if(loop==2&&!info){
                        let m = playlist[0]
                        dispatch({
                            type: 'CHANGE',
                            music: {
                                id:m.id,
                                title:m.title,
                                artist:m.artist,
                                artwork:m.artwork
                            }
                        });
                        audioRef.current.src = m.src;
                        audioRef.current.load();
                        audioRef.current.play()
                        updateMediaData(m)
                        return
            }
            if(loop!==2&&!info) return;
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
            audioRef.current.src = src;
            audioRef.current.load();
            audioRef.current.play()
            updateMediaData(info)
    }
    
    const handleLoop = () => {
        if(loop==0){
            setLoop(1)
            audioRef.current.loop = true;
        }else if(loop==1){
            setLoop(2)
            audioRef.current.loop = false;
        }else{
            setLoop(0)
            audioRef.current.loop = false;
        }
    }
    
    const handleShuffle = () => {
        if(shuffle){
                setShuffle(false)
                playlist.sort(function(a, b) { 
                return a['id'] - b['id'];
            });
        }else{
            setShuffle(true)
            shuffleArray(playlist)
        }
    }
    
    
    
    
  return (
        <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
            <GlobalStyle>
                <QueueTop>
                {loop===0?
                <MidiumBasicButton pos={{
                'marginRight':'2rem',
                'marginTop':'4rem'
                }}
                icon={<TbRepeat/>}
                onClick={handleLoop}/>
                :<MidiumBlueButton pos={{
                'marginRight':'2rem',
                'marginTop':'4rem'
                }}
                icon={loop===1?<TbRepeatOnce/>:<TbRepeat/>}
                onClick={handleLoop}/>}
                <ArtworkAtom pos={{
                'width':'16rem',
                'height':'16rem',
                'padding':'0.5rem'    
                }} onClick={close} img={musics.artwork}/>
                {shuffle?
                <MidiumBlueButton pos={{'marginLeft':'2rem','marginTop':'4rem'}}
                icon={<ImShuffle/>} onClick={handleShuffle}/>
                :<MidiumBasicButton pos={{'marginLeft':'2rem','marginTop':'4rem'}}
                icon={<ImShuffle/>} onClick={handleShuffle}/>}
                </QueueTop>
                
                <QueueBlock>
                    {playlist.map((element,i) =>
                        <div className={ select === element.id ? "select_clicked" : "select_default" }
                            onClick={(e) => {
                            onChangeMusic(e, element,i)}}>
                            <QueueButton title={element.title}           artist={element.artist}/>
                    { select === element.id ? 
                            <SmallBlueButton icon={<FaPause/>}/>: 
                            <SmallBasicButton icon={<FaPlay/>}/> }
                    </div>
                )}
                </QueueBlock>
            
            </GlobalStyle>
      ) : null}
      <audio id="audio" 
             src=""
             onEnded={handleOnEnded}
             ref={audioRef}/>
      
    </div>
    )
};

function shuffleArray(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

export default QueueModal