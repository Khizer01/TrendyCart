import { useLocation } from 'react-router-dom';
import { Slider, Categories, Products, NewsLetter } from '../../components/export.js';
import { useEffect } from 'react';

export default function Home() {

  const location = useLocation();

  useEffect(()=> {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },[location]);

  return (
    <>
      <Slider />  
      <Categories />
      <Products filters={{}} limit={7}/>
      <NewsLetter />
    </>
  );
}
