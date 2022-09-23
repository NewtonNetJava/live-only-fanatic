import CarouselCard from "./CarouselCard";
import {useEffect, useState} from "react";
import leftArrow from "../assets/chevron_left.svg";
import rightArrow from "../assets/chevron_right.svg";

    const Styles = {
        Buttons: 0, Counter: 1
    }
export default function Carousel(props) {

    const items = props['items'], max = items.length - 1

    const [index, setIndex] = useState(0)

    const [style,setStyle]=useState(Styles.Buttons)

    const uid = props['uid']

    const [item, setItem] = useState(items[0])

    useEffect(pickStyle,[Styles])

    function pickStyle(){
        switch (props.style) {
            case 'Buttons':
                setStyle(Styles.Buttons);
                break;
            case 'Counter':
                setStyle(Styles.Counter)
                break;
        }
    }


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

    if (style === Styles.Buttons) return <div className={'carousel'}>
        <a className={'scroll-button'} onClick={decrementIndex} href={`#slide-${uid}-${index}`}>
            <img src={leftArrow} alt="<-"/>
        </a>

        <div className="slides">
            {items.map((item, itemIndex) => <CarouselCard image={item["image"]} type={props['type']} id={itemIndex}
                                                          itemId={item.id} uid={uid}/>)}
        </div>
        {items.map((item, itemIndex) => {
            return <a className={'index'} onClick={() => {
                setIndex(itemIndex)
            }} href={`#slide-${uid}-${itemIndex}`}>{itemIndex}</a>
        })}

        <a className={'scroll-button'} onClick={incrementIndex} href={`#slide-${uid}-${index}`}>
            <img src={rightArrow} alt=""/>
        </a>
    </div>

    if (style === Styles.Counter) return <div className={'carousel'}>
        <a className={'scroll-button'} onClick={decrementIndex} href={`#slide-${uid}-${index}`}>
            <img src={leftArrow} alt="<-"/>
        </a>

        <div className="slides">
            {items.map((item, itemIndex) => <CarouselCard image={item["image"]} type={props['type']} id={itemIndex}
                                                          itemId={item.id} uid={uid}/>)}
            <p>{index + 1}/{max + 1}</p>
        </div>
        <a className={'scroll-button'} onClick={incrementIndex} href={`#slide-${uid}-${index}`}>
            <img src={rightArrow} alt=""/>
        </a>
    </div>


}