import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useConcertData} from "../context/EventContext";
import VideoComponent from "./VideoComponent";
import useFetch from "../hooks/useFetch.jsx";

export default function () {
    const {data, getEvents} = useConcertData();
    const {id} = useParams();
    useEffect(() => getEvents(), []);
    const {
        data: streams
    } = useFetch('/data/streams_concerts')

    const event = data?.find(e => e.id === parseInt(id))

    const stream = streams?.find(s => s["concert_id"] === parseInt(id))

    if (!stream) return <></>;
    return (
        <>
            <div className="livestream">
                <div className="livestream__content">
                    <div className="video">
                        <VideoComponent stream_id={stream.stream_id} concert_id={id}/>
                    </div>
                    <div className="livestream__title">
                        <h1>{event.artist_name}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

