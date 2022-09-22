import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useConcertData } from "../context/EventContext";
import useFetch from "../hooks/useFetch";
import Card from "./Card";

export default function ArtistEvents(props) {
  const [events, setEvents] = useState([]);
  const id = parseInt(props["id"]);

  const { data: concerts, error, isPending, getEvents } = useConcertData();
  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (!concerts) return;
    async function load() {
      setEvents(concerts.filter((event) => event.artist_id === id));
    }
    void load();
  }, [concerts]);

  return (
    <>
      <div className="card-container">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {events &&
          events.map((concert) => (
            <Card concert={concert} />
          ))}
      </div>
    </>
  );
}
