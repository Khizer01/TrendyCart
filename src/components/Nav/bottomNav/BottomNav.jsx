import React from 'react';
import { NavLink } from 'react-router-dom';
import './bottomNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/user/userSlice';

export default function BottomNav() {
    
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const Logout = () => {
        dispatch(logout());
    }
    return (
        <div className="bottom-nav">
            <NavLink to="/" ><i className="fa-solid fa-house"></i><span>Home</span></NavLink>
            <NavLink to="/cart" ><i className="fa-solid fa-cart-shopping cart"></i><span>Cart</span></NavLink>
            {user === null ? <NavLink to="/login" ><i className="fa-solid fa-right-to-bracket"></i><span>Login</span></NavLink> : <p onClick={Logout} ><i className="fas fa-sign-out-alt"></i><span>Logout</span></p>}
        </div>
    );
}
