import {Link} from "react-router-dom";

export default function CarouselCard(props) {
    const image = props.image
    const type = props.type
    const id = props.itemId
    return <div className={'carousel-card'} id={`slide-${props['key']}-${props['id']}`}>
        <Link to={type + id} id={id}>
            <img src={image} alt=" image"/>
        </Link>
        <Link to={type}>
            <button>Click me!</button>
        </Link>
    </div>

}