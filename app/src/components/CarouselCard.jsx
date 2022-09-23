import {Link} from "react-router-dom";

export default function CarouselCard(props) {
    const image = props.image
    const type = props.type
    const id = props.itemId
    return <div className={'carousel-card'} id={`slide-${props['uid']}-${props['id']}`}>
        <Link to={type + id} id={id}>
            <img src={image} alt=" image"/>
        </Link>
        
    </div>

}