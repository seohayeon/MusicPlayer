import React,{useState} from 'react';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';

function CircleButton(props) {
    
    let playlist = JSON.parse(sessionStorage.getItem("playlist"))
    
    const handleAudio = (e)=>{
        let files = e.target.files
        for (let i = 0; i < files.length; i += 1) {
        let file = e.target.files[i]
       const urlObj = URL.createObjectURL(file);
        let src = urlObj
        
        jsmediatags.read(file, {
  onSuccess: function(tag) {
    let title = tag.tags.title;
    let artist = tag.tags.artist;
    let tagCover = tag.tags.picture;
    
    if (tagCover) {
            let base64String = '';
            tagCover.data.forEach((data) => { base64String += String.fromCharCode(data); });
            // base64 dataImage
            tagCover = `data:${tagCover.format};base64,${window.btoa(base64String)}`;
          }
          
    let audiodata = {"scr":src,"title":title,"artist":artist,"tagCover":tagCover}  
    playlist.push(audiodata)
    
    sessionStorage.setItem("playlist",JSON.stringify(playlist))
    props.setMusicList(playlist)
  },
  onError: function(error) {
    alert(JSON.stringify(error));
  }
});
    }
    }
          
  return (
      <>
<input id="audio-upload" type="file" onChange={handleAudio} multiple="multiple"/>

        </>
        
      );
}

export default CircleButton;