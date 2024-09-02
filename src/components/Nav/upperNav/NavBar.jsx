import React from 'react';
import './nav.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../../assets/logo/Logo__2.png';
import SearchBox from '../searchBox/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/user/userSlice';

export default function NavBar() {
    const cartQuantity = useSelector(state => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    const Logout = () => {
        dispatch(logout());
    }
    const OpenNav = () => {
        document.querySelector('.menus').classList.add('show');
        document.querySelector('.cross').classList.add('visible');
        document.querySelector('.menu').classList.remove('visible');
    }
    const CloseNav = () => {
        document.querySelector('.menus').classList.remove('show');
        document.querySelector('.cross').classList.remove('visible');
        document.querySelector('.menu').classList.add('visible');
    }
    return (
        <nav className='navbar'>
            <div className="logo">
                <NavLink to="/"><img src={Logo} alt="TrendyCart" /></NavLink>
            </div>
            <div className="search-container">
                <SearchBox />
            </div>
            <div className="tabs">
                <div className="menus">
                    <NavLink to="/"><i className="fa-solid fa-house"></i>Home</NavLink>
                    {user === null ? <NavLink to="/login" className='login-button'><i className="fa-solid fa-right-to-bracket"></i>Login/Signup</NavLink> : <button className='login-button' onClick={Logout}>Logout<i className="fas fa-sign-out-alt"></i>
                    </button>}
                    <NavLink to="/cart" className="cart"><i className="fa-solid fa-cart-shopping"></i><p className="num">{cartQuantity}</p></NavLink>
                </div>
                <i className="fa-solid fa-bars toggle menu visible" onClick={OpenNav}></i>
                <i className=" fa-regular fa-circle-xmark toggle cross" onClick={CloseNav}></i>
            </div>
        </nav>
    );
}
