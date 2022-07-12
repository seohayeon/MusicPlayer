import React, { useState } from 'react';
import styled from 'styled-components';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';
import MidiumBasicButton from '../atom/MidiumBasicButton'
import QueueModal from '../modal/QueueModal'
import {GiHamburgerMenu} from "react-icons/gi"
import {FaPlus} from "react-icons/fa"
import { usePlayListDispatch, usePlayListNextId } from '../../PlayListContext';

const TopBarDiv= styled.div`
    margin-top:2rem;
    height:3rem;
    text-align:center;
`
const TopText = styled.span`
    color:#6b7992;
    font-size:1.25rem;
    font-family: 'Noto Sans CJK KR';
`

function TopBarBlock(props) {
    
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = usePlayListDispatch()
    const nextId = usePlayListNextId()
    const handleQueueBtn = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
    setModalOpen(false);
    };
    const [audio,setAudio] = useState()
    const [meta,setMeta] = useState()
    props.setAudio(audio)
    
    
    const handleFile = (e) => {
        let files = e.target.files
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i]
            
            jsmediatags.read(file, {
            onSuccess: function(tag) {
                const urlObj = URL.createObjectURL(file);
                let title = tag.tags.title;
                let artist = tag.tags.artist;
                let tagCover = tag.tags.picture;
    
                if (tagCover) {
                    let base64String = '';
                    tagCover.data.forEach((data) => { base64String += String.fromCharCode(data); });
                    const coverImage = new Image();
                    coverImage.src = `data:${tagCover.format};base64,${window.btoa(base64String)}`;
                    let blobUrl = b64toBlob(coverImage.src)
                    dispatch({
                        type: 'CREATE',
                        PlayList: {
                            id: nextId.current,
                            title: title,
                            artist:artist,
                            artwork:blobUrl,
                            src: urlObj,
                        }
                    });
                    nextId.current += 1;
                }
            },
            onError: function(error) {
                
            }
    });
    
    }
}
    
  return (
      <>
       <QueueModal open={modalOpen} close={closeModal} setAudio={setAudio} setMeta={setMeta}/>
        <TopBarDiv>
            <label for='inputFile'>
            <MidiumBasicButton pos={{'marginLeft':'1.5rem','float':'left'}}
            icon={<FaPlus/>}/>
            </label>
            <TopText>PLAYING NOW</TopText>
            <MidiumBasicButton 
            pos={{'marginRight':'1.5rem','float':'right'}}
            onClick={handleQueueBtn}
            icon={<GiHamburgerMenu/>}
                />
        </TopBarDiv>
        <input type='file' id='inputFile' onChange={handleFile} multiple/>
        </>
      );
}

function b64toBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
    
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let blob = new Blob([ab], { type: 'image/png' })
        return URL.createObjectURL(blob);
}

export default TopBarBlock;