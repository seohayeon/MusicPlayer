import React from 'react';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';
import { useMusicDispatch, useMusicNextId } from '../MusicContext';

function b64toBlob(dataURI) {
    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

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
            tagCover = b64toBlob(tagCover);
            tagCover = URL.createObjectURL(tagCover)
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
<input id="audio-upload" type="file" onChange={handleAudio} multiple="multiple" style={{"display":"none"}}/>

        </>
        
      );
}

export default CircleButton;