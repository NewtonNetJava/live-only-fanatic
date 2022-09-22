import useFetch from "../hooks/useFetch";
import Ticket from "./Tickets";
import { useEffect, useContext, useState } from 'react';
import GlobalContext from "../context/GlobalContext";
import BackToTopButton from "./BackToTopButton"

function TicketsPage() {
    const { error, isPending, data: tickets } = useFetch("/data/user_tickets_details");
    const { auth } = useContext(GlobalContext);
    const [filteredTickets, setFilteredTickets] = useState([]);


    useEffect(() => {
        async function load() {
            let rawResponse = await fetch('/data/login')
            if (rawResponse.status === 401) {
                alert("Sign in to display your ticket(s)!");
                window.location.replace("http://127.0.0.1:5173/");
            } if (rawResponse.ok) {
                let response = await rawResponse.json();

            }
        }
        load()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            function filterTickets() {
                if (tickets) {
                    const filTickets = tickets.filter(ticket => ticket.user_id == auth.id)
                    setFilteredTickets(filTickets)
                }
            }
            filterTickets()
        }, 100)
    }, [tickets])

    return (
        <>
            <h1 className="ticket-header">My tickets</h1>
            <div className="container">
                {auth.loggedIn && (
                    <div className="card-container">
                        {error && <div>{error}</div>}
                        {isPending && <div>Loading...</div>}
                        {filteredTickets &&
                            filteredTickets.map((ticket) => <Ticket key={ticket} props={ticket} />)}
                    </div>
                )}
                <BackToTopButton />

            </div>
        </>
    );


}
export default TicketsPage;
