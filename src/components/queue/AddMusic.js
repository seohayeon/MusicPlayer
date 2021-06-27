import React from 'react';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';
import { useMusicDispatch, useMusicNextId } from '../MusicContext';

function CircleButton() {
    const dispatch = useMusicDispatch();
    const nextId = useMusicNextId();
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
    dispatch({
      type: 'CREATE',
      music: {
        id: nextId.current,
        src: src,
        title: title,
        artist:artist,
        tagCover:tagCover
      }
    });
    nextId.current += 1;
    
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