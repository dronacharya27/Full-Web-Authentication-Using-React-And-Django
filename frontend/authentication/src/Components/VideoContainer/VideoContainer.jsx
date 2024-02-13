import React from 'react'
import './VideoContainer.css'
import Container from '../Container/Container'
const VideoContainer = () => {
  return (
    <div className='videocontainer'>
      <img src="/background.jpeg" alt="" style={{height:'100%', width:"100%"}}/>
        {/* <video autoPlay muted loop  id="myVideo">
            <source src="/noon.mp4" type="video/mp4"/>
           
        </video> */}
        <Container/>
    </div>
  )
}

export default VideoContainer


