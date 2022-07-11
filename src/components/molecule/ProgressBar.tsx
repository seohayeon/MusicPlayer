import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components';

const ProgressBlock  = styled.div`
    margin-bottom:6rem;
`
const RangeBar = styled.input`
    -webkit-appearance: none;
    display:block;
    margin:0 auto;
    background: #E8F0FB;
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
  background: #9AB6FE;
  box-shadow:  8px 8px 16px #bdbdbd,
              -8px -8px 16px #ffffff;
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
    
    const handleTimeUpdate = () => {
        let el = inputRef.current
        let currentTime = audio.current.currentTime
        let duration = audio.current.duration
        let percent = currentTime/duration*100
        var value = (percent-el.min)/(el.max-el.min)
        inputRef.current.value = percent
        setStyle(value)
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
        setStyle(value)
        Audio.currentTime = value * Audio.duration;
    }
    
    const setStyle = (value) => {
        let el = inputRef.current
        el.value=value*100
        var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop('+ value+', #8EADFE), color-stop('+ value+', #f5f6f8));';
        el.style = style;
    }

  return (
        <ProgressBlock>
        <TimeBlock>
        <Current>{current}</Current>
        <Durate>{durate}</Durate>
        </TimeBlock>
        <RangeBar id='range' min="0" max="100" type="range" ref={inputRef} onChange={handleRange}/>
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