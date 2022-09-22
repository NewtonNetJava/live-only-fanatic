import { createContext, useContext, useState } from "react";

export const ConcertContext = createContext();

export const useConcertData = () => useContext(ConcertContext);

export const EventContext = ({ children }) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  function getEvents() {
    const abortCont = new AbortController();

    fetch("/data/filtered_concert_details", { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          abortCont.abort();
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
  }

  return (
    <ConcertContext.Provider value={{ data, error, isPending, getEvents }}>
      {children}
    </ConcertContext.Provider>
  );
};
