import React,{useState,useEffect,useRef,useContext} from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../ColorContext';
import { Util } from '../../util/util';
const ProgressBlock  = styled.div`
    margin-bottom:6rem;
`
const RangeBar = styled.input`
    -webkit-appearance: none;
    display:block;
    margin:0 auto;
    background: ${(props) => props.color[2]?`rgb(${String(props.color[2])})`:'rgb(142,173,254)'};
    box-shadow: inset 0.1rem 0.1rem 0.2rem  #b6bcc5,
                inset 0.1rem 0.1rem 0.2rem #ffffff;
    height: 0.6rem;
    width: 40rem;
    border-radius:1rem;
    border-bottom:0.1px solid #b6bcc5;
    :focus{
        outline:none;
    }
::-webkit-slider-thumb{
  -webkit-appearance: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: -moz-grab;
  cursor: -webkit-grab; 
  border-radius: 50%;
  background: ${(props) => props.color[2]?`rgb(${String(props.color[2])})`:'rgb(142,173,254)'};
  box-shadow:  8px 8px 16px rgba(${(props) => String(Util.colorLuminance(props.color[0],-0.3))}),
              -8px -8px 16px rgba(${(props) => String(Util.colorLuminance(props.color[0],0.3))});
  border:0.8rem solid white;
}
`
const Current = styled.span`
    font-family: 'Noto Sans CJK KR';
    float:left;
    color:#6b7992;
`
const Durate = styled.span`
    font-family: 'Noto Sans CJK KR';
    float:right;
    color:#6b7992;
`
const TimeBlock = styled.div`
    display:block;
    width:39rem;
    margin:0 auto;
    padding-bottom:2.5rem;
`

function ProgressBar(props) {
    let {audio} = props;
    let inputRef = useRef()
    let [current,setCurrent] = useState('00:00')
    let [durate,setDurate] = useState('00:00')
    const {color} = useContext(ColorContext)
    
    const handleTimeUpdate = () => {
        let el = inputRef.current
        let currentTime = audio.current.currentTime
        let duration = audio.current.duration
        let percent = currentTime/duration*100
        var value = (percent-el.min)/(el.max-el.min)
        inputRef.current.value = percent
        setCurrent(toMMSS(currentTime))
        if(durate==duration || isNaN(duration)) return;
        setDurate(toMMSS(duration))
    }
    
    useEffect(() => {  
        if(audio){
            audio.current.ontimeupdate = handleTimeUpdate
        }
    }, [audio]);
    
    useEffect(() => {  
        let el = inputRef.current
        if(el) el.value=0
    }, []);
    
    const handleRange = () => {
        let Audio = audio.current
        let el = inputRef.current
        var value = (el.value-el.min)/(el.max-el.min)
        Audio.currentTime = value * Audio.duration;
    }
    

  return (
        <ProgressBlock>
        <TimeBlock>
        <Current>{current}</Current>
        <Durate>{durate}</Durate>
        </TimeBlock>
        <RangeBar id='range' min="0" max="100" type="range" ref={inputRef} onChange={handleRange} color={color}/>
        </ProgressBlock>
      );
}


function toMMSS(value) {
    var sec_num = parseInt(value, 10);
    var minutes:any = Math.floor(sec_num / 60);
    var seconds:any = sec_num - (minutes * 60);
    
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

export default ProgressBar;