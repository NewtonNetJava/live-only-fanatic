import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../assets/arrow-forward.svg";



export default function () {

    const [venues, setVenues] = useState([])

    useEffect(() => {
        async function load() {
            const rawResponse = await fetch('/data/venues/')
            if (rawResponse.ok) {
                const response = await rawResponse.json()
                setVenues(response.filter(venue => venue.name !== 'ONLINE'))
            }
        }
        void load()
    }, [venues])

    if (!venues) return <></>

    return <>
        <div className="header-title">
            <h1>Venues</h1>
        </div>
        <div className="event-container">
            <div className="card-container">
                <span className="line-break"></span>
                {venues.map((venue) => (
                    <Link
                        to={{ pathname: `/venues/${venue.id}` }}
                        state={{ venue: venue }}
                        key={venue.id}
                    >
                        <div className="card">
                            <div className="text">
                                <span className="datetime">{venue.location}</span>
                                <h2 className="title">{venue.name}</h2>
                            </div>
                            <button className="btn">
                                <img className="arrow-icon" src={ArrowIcon} alt={'>'} />
                            </button>
                        </div>
                        <span className="line-break"></span>
                    </Link>
                ))}
            </div>
        </div>
    </>
}