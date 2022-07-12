import jsmediatags from 'jsmediatags/dist/jsmediatags.min';


export function handleFile(files,dispatch,nextId){
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
                        music: {
                            id: nextId.current,
                            title: title,
                            artist:artist,
                            tagCover:blobUrl,
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