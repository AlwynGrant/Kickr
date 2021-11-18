import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import upload_image from "./navImages/upload_image.png"
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
                <div className='nav-right'>
                    <a className='nav-about' href="/about">About</a>
                    {sessionUser && (
                        <NavLink className='create-newImage' to='/image'>
                            <i class="fas fa-cloud-upload-alt"></i>
                        </NavLink>
                    )}
                    {isLoaded && sessionLinks}
                </div>
            </div>
    );
}

export default Navigation;
