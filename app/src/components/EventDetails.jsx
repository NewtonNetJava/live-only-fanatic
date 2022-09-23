// noinspection JSUnresolvedVariable

import GlobalContext from "../context/GlobalContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useConcertData } from "../context/EventContext";
import shopSvg from "../assets/shop.svg";
import DirectionButton from "./googleMaps/DirectionButton";

function EventDetails() {
  const { auth } = useContext(GlobalContext);
  const { data, getEvents } = useConcertData();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => getEvents(), []);

  const event = data?.find((e) => {
    return e.id === parseInt(id);
  });

  if (!event) {
    return <></>;
  }

  const handlePurchase = () => {
    const abortCont = new AbortController();

    const payload = {
      cancelUrl: window.location.href,
      successUrl: window.location.href+"/order-confirmation",
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: event.artist_name,
            },
            unit_amount: event.ticket_price * 100,
          },
          quantity: quantity,
        },
      ],
      metadata: {
        ticket_id: event.ticket_id,
      },
    };

    fetch("/data/checkout", {
      signal: abortCont.signal,
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        window.location.href = data.url;
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          abortCont.abort();
        }
      });
  };

  const formatStartDate = event.event_start.slice(0, 16);

  return (
    <>
      <Banner event={event} formatStartDate={formatStartDate} />

      <section id="event">
        <div className="event-content">
          <div className="event-text">
            <div>
              <p className="event-info-column">Event: {event.artist_name}</p>
              <p className="event-info-column">Location: {event.location}</p>
              <p className="event-info-column">Date: {formatStartDate}</p>
              <p className="event-info-column">Venue: {event.venue_name}</p>
              <DirectionButton id={event.venue_id} />
            </div>
            <div className="buy-ticket">
              {event.venue_name !== "ONLINE" && (
                <>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: 24,
                      marginBottom: 24,
                    }}
                  >
                    {event.artist_name}
                  </p>
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      marginBottom: 24,
                      display: "block",
                    }}
                  >
                    {event.ticket_price} kr
                  </span>
                  {auth.loggedIn ? (
                    <>
                      <div className="buy-container">
                        <div className="quantity-counter">
                          <button
                            value={quantity}
                            onClick={() => {
                              setQuantity((quantity) => quantity - 1);
                            }}
                            disabled={quantity <= 1 || !quantity}
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            value={quantity}
                            onClick={() =>
                              setQuantity((quantity) => quantity + 1)
                            }
                            disabled={quantity === event.tickets_left}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="cart-button"
                          onClick={handlePurchase}
                          disabled={
                            quantity < 1 || quantity > event.tickets_left
                          }
                        >
                          <img src={shopSvg} id="cart" alt="cart-button" />
                        </button>
                      </div>
                      <p style={{ marginTop: 8 }}>
                        Tickets left: {event.tickets_left}
                      </p>
                    </>
                  ) : (
                    <div>
                      <p id="not-logged-in">Login to buy tickets</p>
                    </div>
                  )}
                </>
              )}

              {event.venue_name === "ONLINE" && (
                <>
                  <Link to={"/livestream/" + id} className="livestream-button">
                    Watch livestream
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CalendarIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={color} height={48} width={48}>
      <path d="m21.65 36.6-6.9-6.85 2.1-2.1 4.8 4.7 9.2-9.2 2.1 2.15ZM9 44q-1.2 0-2.1-.9Q6 42.2 6 41V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h17V4h3.25v3H39q1.2 0 2.1.9.9.9.9 2.1v31q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V19.5H9V41Zm0-24.5h30V10H9Zm0 0V10v6.5Z" />
    </svg>
  );
}

function Banner({ formatStartDate, event }) {
  const image = event.concert_image ?? event.artist_image;
  return (
    <section id="header">
      <div className="image">
        <img src={image} alt="" />
      </div>
      <h2>
        {event.artist_name} live at {event.venue_name}
      </h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CalendarIcon color={"white"} />
        <span className="date" style={{ fontSize: 24, marginLeft: 16 }}>
          {formatStartDate}
        </span>
      </div>
    </section>
  );
}

export default EventDetails;
