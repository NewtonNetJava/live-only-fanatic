import Carousel from "./Carousel.jsx";
import useFetch from "../hooks/useFetch.jsx";

export default function () {

    const {
        data: concerts
    } = useFetch('data/concert_details')

    if (!concerts) return <></>

    const onlineConcerts = concerts.filter(concert => concert['venue_name'] === 'ONLINE')
    const offlineConcerts = concerts.filter(concert => concert['venue_name'] !== 'ONLINE')

    return (
        <>
            <h1 style={{display:"none"}}>Homepage</h1>
            <Carousel items={onlineConcerts}  type={'/events/'} uid={'online'}/>
            <Carousel items={offlineConcerts}  type={'/events/'} uid={'offline'}/>
        </>
    );
}
