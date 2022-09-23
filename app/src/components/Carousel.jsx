import CarouselCard from "./CarouselCard";
import {useEffect, useState} from "react";
import leftArrow from "../assets/chevron_left.svg";
import rightArrow from "../assets/chevron_right.svg";

export default function Carousel(props) {

    const items = props['items'], max = items.length - 1

    const [index, setIndex] = useState(0)


    const uid = props['uid']

    const [item, setItem] = useState(items[0])


    function incrementIndex() {
        if (index >= max) {
            setIndex(0)
            return 0
        } else {
            setIndex(index + 1)
            return index + 1
        }
    }

    const decrementIndex = () => {
        if (index === 0) setIndex(max); else setIndex(index - 1);
    }

    useEffect(() => {
        setItem(items[index])
    }, [index])

    if (!item) return <></>

    return <div className={'carousel'}>
        <a className={'scroll-button'} onClick={decrementIndex} href={`#slide-${uid}-${index}`}>
            <img src={leftArrow} alt="<-"/>
        </a>

        <div className="slides">
            {items.map((item, itemIndex) => <CarouselCard key={uid+item.id} image={item["image"]} type={props['type']} id={itemIndex}
                                                          itemId={item.id} uid={uid}/>)}
            <p>{index + 1}/{max + 1}</p>
        </div>
        <a className={'scroll-button'} onClick={incrementIndex} href={`#slide-${uid}-${index}`}>
            <img src={rightArrow} alt=""/>
        </a>
    </div>


}