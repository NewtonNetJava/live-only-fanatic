// noinspection JSUnresolvedVariable

const Tickets = ({props}) => {
    const data = props;
    const online = data.venue_location === "ONLINE"
    const image = data.concert_image ?? data.artist_image;
    const startTime = new Date(data.event_start).toString().substring(0, 21)

    return (
        <>
            <div className="ticket">
                <div className="text">
                    <div className="header">
                        <img src={image} alt={data.artist_name}/>
                    </div>
                    {data.quantity > 1 && (
                        <p>Tickets for: </p>
                    )}
                    {data.quantity === 1 && (
                        <p>Ticket for: </p>
                    )}
                    <h1 className="title">{data.artist_name}</h1>
                    {online && (
                        <p className="info">Livestream, {startTime}</p>
                    )}
                    {!online && (
                        <p className="info">
                            Live at {data.venue_name}, {startTime}
                        </p>
                    )}
                    {data.quantity >= 0 && (
                        <span>
                            <p className="ticketInfo">{data.first_name} {data.last_name}</p>
                            <p className="ticketInfo">Quantity: {data.quantity}</p>
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Tickets;
