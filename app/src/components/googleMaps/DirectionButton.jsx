import { useEffect, useState } from "react";
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
    
    useEffect(() => {
        async function load() {
            const rawResponse = await fetch('/data/concert_details');
            if (rawResponse.ok) {
                const response = await rawResponse.json();
                setDirection(response.filter(event => event.id === id)[0].direction);
                setVenue(response.filter(event => event.id === id)[0])
                if(direction){
                   document.getElementById('map-view').src = direction; 
                }
            }
        }
        load()
    },[direction])

    if (!venue.direction) return <></>
    
    return <>
        <div className="direction-button" onClick={() => setIsVisible(true)}>Get Directions
            <img src={ArrowCircleRight} id="arrow-circle-right" alt="icon" />
        </div>
        <MapModal title="My Modal" onClose={() => setIsVisible(false)} isVisible={isVisible}>
            <iframe id="map-view" src="" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </MapModal>
    </>

}