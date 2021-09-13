import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink, Link, Redirect } from 'react-router-dom';
import '../../reset.css'
import './LandingPage.css'


function LandingPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    // if (sessionUser) return <Redirect to="/user" />;

    return (
    <>
        <div className='landing-container'>
            <h1 className='landing-title'>Kick start your collection.</h1>
            <h2 className='landing-subtitle'> Join the Kickr community, home to fans and players <br></br> sharing what they love. Kicks.</h2>
            <NavLink className='landing-signup-link' to='/signup'>Start for free</NavLink>
        </div>
        <div className='footer-link'>
            <a className='footer-github' href='https://github.com/AlwynGrant/Kickr'>Github</a>
        </div>
    </>
    );
}

export default LandingPage;
