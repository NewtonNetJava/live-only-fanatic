import {useEffect, useRef, useState} from "react";


export default function ({stream_id}) {
    const videoPlayer = useRef()
    useEffect(() => {
        console.log(videoPlayer.current)
        if (videoPlayer.current) {

            videoPlayer.current["style"].width = '100%'

            videoPlayer.current.controls = true;

            if (videoPlayer.current.canPlayType('video/mp4')) {
                videoPlayer.current.setAttribute('src', '/data/video-stream/' + stream_id.toString());
            videoPlayer.current.play()
            }
        }


    }, [videoPlayer])


    return <div className="video-player">
        <div id="user-info">
        </div>
        <div id="stream">
            <video ref={videoPlayer}></video>
        </div>
    </div>
}




