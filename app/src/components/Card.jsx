import TicketQuantityStatus from "./TicketQuantityStatus";
import ArrowIcon from "../assets/arrow-forward.svg";

const Card = ({concert}) => {
    const venue_name = concert['venue_name']
    const online = venue_name === "ONLINE";
    const startTime = new Date(concert["event_start"]).toString().substring(0, 21);
    const image = concert.image ?? concert["artist_image"];
    const tickets_left = concert['tickets_left']
    const artist_name = concert['artist_name']
    return (
        <>
            <div className="card">
                <div className="header">
                    <img src={image} alt={artist_name}/>
                </div>
                <div className="text">
                    <span className="datetime">{startTime}</span>
                    <h2 className="title">{artist_name}</h2>

                    {tickets_left <= -1 && (
                        <div className="ticket-content">
                            <span className="ticket-content__text-online">Livestream</span>
                        </div>
                    )}
                    {!online && <p className="info">Live at {venue_name}</p>}
                    {tickets_left >= 0 && (
                        <div className="ticket-content">
                            <span className="ticket-content__text">Tickets available</span>
                            <TicketQuantityStatus quantity={tickets_left}/>
                        </div>
                    )}
                </div>
                <button className="btn">
                    <img className="arrow-icon" src={ArrowIcon} alt={'>'}/>
                </button>
            </div>
            <span className="line-break"></span>
        </>
    );
};

export default Card;
