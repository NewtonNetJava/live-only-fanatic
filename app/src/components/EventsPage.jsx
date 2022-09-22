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
          <span className="line-break"></span>
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {concerts &&
            concerts.map((concert) => (
                <Card concert={concert} key={concert.id}/>
            ))}
        </div>
      </div>
    </>
  );
}
export default EventsPage;
