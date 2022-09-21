import {useEffect, useState} from "react";

const videoPlayer = new HTMLVideoElement()

videoPlayer.style.width = '100%'

videoPlayer.controls = true;

export default function ({stream_id}) {
    function playVideo(id) {
        if (videoPlayer.canPlayType('video/mp4')) {
            videoPlayer.setAttribute('src', '/data/video-stream/' + id);
        }
    }


    useEffect(() => {
        document.querySelector('#stream').appendChild(videoPlayer)
        playVideo(stream_id)
    }, [])

    return <div className="video-player">
        <div id="user-info">
        </div>
        <div id="stream">
        </div>
    </div>
}




