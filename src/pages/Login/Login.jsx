import './login.css';
import { login } from '../../Api Requests/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { resetError } from '../../store/user/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector(state => state.user);
  const [isError, setError] = useState(false);
  const email = useRef("");
  const pass = useRef("");
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

  const onSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email: email.current.value, password: pass.current.value });
  }

  useEffect(() => {
    if (error) {
      setError(true);
      const timer = setTimeout(() => {
        setError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className='login'>
      <div className="login-wrapper">
        <h1 className="title">SIGN IN</h1>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder='example@email.com' ref={email} />
          <input type="password" placeholder='Password' ref={pass} />
          <button type='submit' disabled={isFetching}>LOGIN</button>
          <a href="/">FORGOT PASSWORD?</a>
          <Link to="/signup">CREATE A NEW ACCOUNT</Link>
        </form>
        {isError && <p className='login-error'>Something Went Wrong!..</p>} 
      </div>
    </div>
  );
}
