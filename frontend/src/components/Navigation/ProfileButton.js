import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => { setShowMenu(false) }
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.push('/')
    };

    return (
        <>
            <img onClick={openMenu} class='profile-button' src={sessionUser?.profileImg} />

            {showMenu && (
                <ul className="profile-dropdown">
                    <li> {user.username} </li>
                    <li> {user.email} </li>
                    <li> <button className='logout-btn' onClick={logout}>Log Out</button> </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
