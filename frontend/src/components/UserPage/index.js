import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink, Redirect } from 'react-router-dom';
import '../../reset.css'
import './UserPage.css'


function UserPage() {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return <Redirect to="/" />;

    return (
            <div className='user-container'>
                <NavLink to='/new-image'>Upload new Image</NavLink>
            </div>
    );
}

export default UserPage;
