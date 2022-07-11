import React, { useState } from 'react';
import styled from 'styled-components';
import MidiumBasicButton from '../atom/MidiumBasicButton'
import QueueModal from '../modal/QueueModal'
import {GiHamburgerMenu} from "react-icons/gi"
import {FaPlus} from "react-icons/fa"
import {handleFile} from '../../handler/HandleFile'

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
    const handleQueueBtn = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
    setModalOpen(false);
    };
    const [audio,setAudio] = useState()
    props.setAudio(audio)
    
  return (
      <>
       <QueueModal open={modalOpen} close={closeModal} setAudio={setAudio}/>
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

export default TopBarBlock;