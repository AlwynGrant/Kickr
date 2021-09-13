import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className='login-form-body'>
            <form onSubmit={handleSubmit} className='login-form'>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='username-input'>
                    Username or Email<br></br>
                    <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required/>
                </label>
                <label className='password-input'>
                    Password<br></br>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <button className='submit-login' type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginFormPage;
