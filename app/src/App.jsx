import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/HomePage";
// import ProfilePage from "./components/profilePage";
import ProfilePage from "./components/ProfilePage";
import SearchPage from "./components/SearchPage";
import TicketsPage from "./components/TicketsPage";
import EventsPage from "./components/EventsPage.jsx";
import Nav from "./components/SiteNavigation/Nav";
import ArtistPage from "./components/ArtistPage";
import { GlobalProvider } from "./context/GlobalContext.jsx";

function App() {

  return (
    <>
      <GlobalProvider>
        <EventContext>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route exact path="/event/:id" element={<EventDetails />} />
              <Route path="/ticket" element={<TicketsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/artist/:id" element={<ArtistPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
            </Routes>
          </BrowserRouter>
        </EventContext>
      </GlobalProvider>
    </>
  );
}

export default App;
