import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import '../../reset.css'
import './LoginForm.css';

function LoginFormPage() {
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return <Redirect to={`/user/${sessionUser.id}`} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleSubmitDEMO = async (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: 'demodude', password: 'password' }));
    }

    return (
        <>
        <div className='login-bg'></div>
        <div className='login-page-container'>
            <div className='login-form-body'>
                <form onSubmit={handleSubmit} className='login-form'>
                    <h4 className='login-form-heading'>Log in to Kickr</h4>
                    <ul className='login-error-list'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label className='username-input'>
                        <br></br>
                        <input
                            className='username'
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            placeholder='Username or Email'
                            required
                        />
                    </label>
                    <label className='password-input'>
                        <br></br>
                        <input
                            className='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />
                    </label>
                    <button className='submit-login' type="submit">Log In</button>
                    <NavLink className='submit-demo' to='/' onClick={handleSubmitDEMO}>Demo User</NavLink>

                    <label className='login-footer'>
                        Not a Kicker? <NavLink className='signup-redirect'to='/signup'>Sign up here.</NavLink>
                    </label>
                </form>
            </div>
        </div>
        </>
    );
}

export default LoginFormPage;
