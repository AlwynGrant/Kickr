import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import upload_image from "./navImages/upload_image.png"
import './Navigation.css';
import { useState, useEffect } from 'react';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [nav, setNav] = useState(false)

    useEffect(() => {
       if (window.location.href.endsWith("/image")) setNav(true)
       else setNav(false)
    }, [nav, window.location.href, sessionUser?.id])


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

    const whiteNav = (
        <div className = 'global-navbar-white'>
                < div className = 'link-home-white' >
                    <NavLink exact to="/" className='link home-white'>Kickr</NavLink>
                </div >
        <div className='nav-right-white'>
            <a className='nav-about-white' href="/about">About</a>
            {sessionUser && (
                <NavLink className='create-newImage-white' to='/image'>
                    <i class="fas fa-cloud-upload-alt"></i>
                </NavLink>
            )}
            {isLoaded && sessionLinks}
            </div>
        </div >
    )

    const blackNav = (
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
    )

    return (
        <>
            { nav ? whiteNav : blackNav }
        </>
    );
}

export default Navigation;
