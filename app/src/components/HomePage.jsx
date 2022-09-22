import Carousel from "./Carousel.jsx";
import useFetch from "../hooks/useFetch.jsx";
import VideoComponent from "./VideoComponent";

export default function HomePage() {

    const {
        data: concerts
    } = useFetch('data/concert_details')

    if (!concerts) return <></>

    const onlineConcerts = concerts.filter(concert => concert['venue_name'] === 'ONLINE')
    const offlineConcerts = concerts.filter(concert => concert['venue_name'] !== 'ONLINE')

    return (
        <>
            <h1 style={{display:"none"}}>Homepage</h1>
            <Carousel items={onlineConcerts} style={'Buttons'} type={'/events/'} uid={'online'}/>
            <Carousel items={offlineConcerts} style={'Counter'} type={'/events/'} uid={'offline'}/>
        </>
    );
}
