import { useRef } from 'react';
import './newLetter.css';

export default function NewsLetter() {
  const email = useRef();
  const handleSubmit = (e) =>{
    e.preventDefault();
    email.current.value = e.target.value;
    console.log(email.current.value);
  }
  return (
    <div className='newsletter'>
      <h1 className="title">Newsletter</h1>
      <p className="desc">Get timely updates for your favorite products.</p>
      <div className="subscribe">
        <input type="email" placeholder='example@gmail.com' ref={email} />
        <button className="bt" onClick={handleSubmit}><i className="fa-regular fa-paper-plane"></i></button>
      </div>
    </div>
  )

}