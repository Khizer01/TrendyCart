import './signUp.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { register } from '../../Api Requests/apiCall';
import { resetError } from '../../store/user/userSlice';
import { useLocation } from 'react-router-dom';

export default function SignUp() {
    const name = useRef('');
    const email = useRef('');
    const pass = useRef('');
    const Confirmpass = useRef('');
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector(state => state.user);
    const [isError, setError] = useState(false);
    const [message ,  setMessage] = useState('');
    const location = useLocation();
    
    useEffect(() => {
      dispatch(resetError());
    }, [dispatch]);

    useEffect(()=> {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },[location]);

    const onSubmit = (e) =>{
        e.preventDefault();
        if(pass.current.value === Confirmpass.current.value){
       try{ register(dispatch, {
          username: name.current.value, 
          email: email.current.value, 
          password: pass.current.value
        });
      } catch(err) {
        setError(error);
        setMessage('Something went wrong!');
       }
     }
        else{
          setError(true);
          setMessage('Your password should match Confirmed Password');
        }
    }

    
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setError(false);
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [isError]);


  return (
    <div className='signup'>
    <div className="signup-wrapper">
      <h1 className="title">CREATE AN ACCOUNT</h1>
      <form onSubmit={onSubmit}>
        <input type="name" placeholder='UserName' ref={name} required />
        <input type="email" placeholder='Email' ref={email} required/>
        <input type="password" placeholder='Password' ref={pass} required />
        <input type="password" placeholder='Confirm Password' ref={Confirmpass} required/>
        <a href="/" className='aggrement'>By creating an account, I consent to the processing of my personal
        data in accordance with the <b>PRIVACY POLICY</b></a>
        <button type='submit' disabled={isFetching}>SIGN UP</button>

        {isError && <p className='login-error'>{message}</p>} 

      </form>
    </div>
  </div>
  )
}
