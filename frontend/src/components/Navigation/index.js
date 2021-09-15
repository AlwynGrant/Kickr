import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div className='link-login'>
                    <NavLink to="/login" className='link login' >Log In</NavLink>
                </div>
                <div className='link-signup'>
                    <NavLink to="/signup" className='link signup' >Sign Up</NavLink>
                </div>

            </>
        );
    }

    return (
            <div className='global-navbar'>
                <div className='link-home'>
                    <NavLink exact to="/" className='link home'>Kickr</NavLink>
                </div>
                <div className='search-bar'>
                    {/* <input value='search...' className='search-input'></input> */}
                </div>
                {isLoaded && sessionLinks}
            </div>
    );
}

export default Navigation;
