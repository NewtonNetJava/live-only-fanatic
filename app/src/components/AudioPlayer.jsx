import { useEffect, useState } from "react";
import Headphones from '../assets/headphones.svg';

const audioPlayer = new Audio()
audioPlayer.controls = true


//Send in an artist id when calling this componenet

export default function (props) {
    const id = parseInt(props['id'])
    const [currentSong, setCurrentSong] = useState(0)
    const [songs, setSongs] = useState(null)

    const playAudio = () => {
        if (!currentSong) return

        audioPlayer.src = '/data/audio-stream/' + currentSong
        audioPlayer.volume = 0.1;
        void audioPlayer.play()
    }

    useEffect(() => {
        async function loadAudios() {
            let response = await fetch('/data/audios/')
            if (response.ok) {
                response = await response.json()
                const artistSongs = response.filter(event => event.artist_id === id);
                setSongs(artistSongs)
            }
        }

        void loadAudios()
    }, [id])

    useEffect(playAudio, [currentSong])

    useEffect(() => {
        if (songs && currentSong)
            document.querySelector('#audio-container').appendChild(audioPlayer)
    }, [songs, currentSong])

    if (!songs) return <></>
    return <div className="audio-player">
        <div id="user-info">
            <div id="headphones-icon">
                <img src={Headphones} alt="" />
            </div>
            <p>Listen to the artist!</p>
        </div>
        <div id="audios">
            {songs.map(song => <button key={song.id} onClick={() => setCurrentSong(song.id)}>{song.name}</button>)}
        </div>
        <div id="audio-container"></div>
    </div>



}




