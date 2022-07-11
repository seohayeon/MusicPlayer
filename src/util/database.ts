import {MusicList,db} from '../models/MusicList'

export class Music{
    add(title:string,artist:string,artwork:string,audio:string){
        const date = new Date();
        db.open()
      .then(() => {
        MusicList.add({ _id: +date,
                       title:title, 
                       artist: artist, 
                       artwork: artwork, 
                       audio:audio });
      })
    }
    async findAll(){
     await db.open()
     let result = await MusicList.find().get()
     return result
    }
    clear(){
        MusicList.clear()
    }
    async getAudio(id){
        await db.open()
        let result = await MusicList.find(
            null,
            (m) => m._id == id
            ).get();
        return result[0].audio;
    }
}