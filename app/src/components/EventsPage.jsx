import Card from "./Card";
import { useConcertData } from "../context/EventContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function EventsPage() {
  const { data: concerts, error, isPending, getEvents } = useConcertData();
  useEffect(() => {
    getEvents();
  }, []);

  if (!concerts) {
    return <></>;
  }

  return (
    <>
      <div className="header-title">
        <h1>Events</h1>
      </div>
      <div className="event-container">
        <div className="card-container">
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {concerts &&
            concerts.map((concert) => (
              <Link
                to={{ pathname: `/events/${concert.id}` }}
                state={{ concert: concert }}
                key={concert.id}
              >
                <Card concert={concert} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
export default EventsPage;
