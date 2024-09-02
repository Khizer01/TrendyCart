import './slider.css';
import sliderItems from '../../store/slideItems/slideItems';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (dir) => {
        if (dir === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
        } else {
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSlideIndex((prevIndex) => (prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0));
        }, 10000);

        return () => clearTimeout(timer); 
    }, [slideIndex]);

    return (
        <div className='slider-container'>
            <div className="arrow-left" onClick={() => handleClick('left')}>
                <i className="fa-solid fa-caret-left"></i>
            </div>
            <div className="wrapper" style={{ transform: `translateX(${slideIndex * -100}vw)` }}>
                {sliderItems.map((item) => (
                    <div className="slide" key={item.id} style={{ backgroundColor: item.color }}>
                        <div className="image">
                            <img src={item.img} alt="outfit img" />
                        </div>
                        <div className="info">
                            <h1 className='title'>{item.title}</h1>
                            <p className='desc'>{item.desc}</p>
                            <Link to={`/products/${item.cat}`} className='button'>SHOP NOW</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="arrow-right" onClick={() => handleClick('right')}>
                <i className="fa-solid fa-caret-right"></i>
            </div>
        </div>
    );
}
