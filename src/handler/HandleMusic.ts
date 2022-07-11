import {useRef} from "react";
import { useMusicState,useMusicDispatch } from '../MusicContext';
import {Music} from '../util/database'
const MusicDB = new Music()

export class HandleMusic{
    audio: useRef.current;
    constructor() {
        this.audio = document.getElementById('audio');
    }
    async changeMusic(info:{_id:string,title:string,artist:string,artwork:string}){
        
        let src = await MusicDB.getAudio(info._id)
        this.audio.src = src;
        this.audio.load();
        this.audio.play();
    }
}