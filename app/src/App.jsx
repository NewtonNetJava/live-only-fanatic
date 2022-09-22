import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import SearchPage from "./components/SearchPage";
import TicketsPage from "./components/TicketsPage";
import EventsPage from "./components/EventsPage.jsx";
import Nav from "./components/SiteNavigation/Nav";
import ArtistPage from "./components/ArtistPage";
import EventDetails from "./components/EventDetails";
import OrderConfirmation from "./components/OrderConfirmation";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import RouteGuard from "./components/RouteGard";
import { EventContext } from "./context/EventContext";
import LivestreamPage from "./components/LivestreamPage";
import VenueDetails from "./components/VenueDetails";
import VenuePage from "./components/VenuePage";

function App() {
  return (
    <>
      <GlobalProvider>
        <EventContext>
          <BrowserRouter>
            <Nav />
            <Routes>
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route exact path="/events/:id" element={<EventDetails />} />
                <Route path="/my-tickets" element={<TicketsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/artists/:id" element={<ArtistPage />} />
                <Route path="/livestream/:id" element={<LivestreamPage />} />
                 <Route path="/venues/:id" element={<VenueDetails />} />
                <Route path="/venues" element={<VenuePage />} />
                <Route
                  path="/order-confirmation"
                  element={<OrderConfirmation />}
                />
              </>
            </Routes>
          </BrowserRouter>
        </EventContext>
      </GlobalProvider>
    </>
  );
}

export default App;
