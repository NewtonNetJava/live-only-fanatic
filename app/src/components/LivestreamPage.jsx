import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useConcertData} from "../context/EventContext";
import VideoComponent from "./VideoComponent";
import useFetch from "../hooks/useFetch.jsx";

function LivestreamPage() {
    const {data, getEvents} = useConcertData();
    const {id} = useParams();
    useEffect(() => getEvents(), []);
    let stream_id
    const {
        data: stream
    } = useFetch('/data/concerts_videos/' + id)
    useEffect(() => {
        if (stream) {
            stream_id = stream.video_id
        }
    }, [stream])

    const event = data?.find((e) => {
        return e.id === parseInt(id);
    });
    console.log(event);

    if (!event) {
        return <></>;
    }

    return (
        <>
            <div className="livestream">
                <div className="livestream__content">
                    <div className="video">
                        <VideoComponent stream_id={stream_id}/>
                    </div>
                    <div className="livestream__title">
                        <h1>{event.artist_name}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LivestreamPage;
