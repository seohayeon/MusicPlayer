import React from 'react';
import styled from 'styled-components';
import SpotifyPlayer from 'react-spotify-web-playback';

function CircleButton(props) {
    
  return (
      
    <>
    <SpotifyPlayer
  token="BQDoyJGZ4t2GlfULTZSvzNHpNvOukJ87TABO5elXC0rhHD-cEuWRakZmMXpAbhGaJWhwPzCRsJNwIBK_jGmZLV2VbAu6PC1921C6pba_qz_rpavAMyS4lgkCVgZytLVxDIp6FvJIp_eZr7mGi_DX5RWrhQPG3hZDvB7AX_AVsOLH-xjFwECDf9rD4d04DvA"
  uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
/>
    </>
      );
}

export default CircleButton;