import {useEffect, useRef, useState} from "react";
import ArrowCircleRight from "../../assets/arrow-circle-right.svg";
import MapModal from "./MapModal";


// To use the button from an events detail page
// Write <DirectionButton id={int}/>
// The int refers to the concert id in the concert_details db view

export default function Directions(props) {
    const id = parseInt(props['id']);
    const [isVisible, setIsVisible] = useState(false);
    const [direction, setDirection] = useState("");
    const [venue, setVenue] = useState({});
    const map_view = useRef()


    useEffect(() => {
        async function load() {
            const rawResponse = await fetch('/data/venues');
            if (rawResponse.ok) {
                const response = await rawResponse.json();
                setDirection(response.filter(event => event.id === id)[0].direction);
                setVenue(response.filter(event => event.id === id)[0])
                if (direction && map_view) {

                    map_view.src = direction;
                }
            }
        }

        void load()
    }, [direction, id])

    if (!venue.direction) return <></>

    return <>
        <div className="direction-button" onClick={() => setIsVisible(true)}>Get Directions
            <img src={ArrowCircleRight} id="arrow-circle-right" alt="icon"/>
        </div>
        <MapModal title="My Modal" onClose={() => setIsVisible(false)} isVisible={isVisible}>
            <iframe ref={map_view} id="map-view" src="" allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
        </MapModal>
    </>

}