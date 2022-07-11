import BoxDB from 'bxd';

const db = new BoxDB('Music', 1);

const MusicList = db.create('Music', {
  _id: {
    type: BoxDB.Types.NUMBER,
    key: true,
  },
  title: BoxDB.Types.STRING,
  artist: BoxDB.Types.STRING,
  artwork: BoxDB.Types.STRING,
  audio: BoxDB.Types.STRING,
});

export {db}
export {MusicList}