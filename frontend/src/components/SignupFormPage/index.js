import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
    <>
        <div className='signup-bg'></div>
        <div className='signup-page-container'>
            <div className='signup-form-body'>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <h4 className='signup-form-heading'>Sign up to Kickr</h4>
                    <ul className='signup-error-list'>
                        { errors.map((error, idx) => <li key={idx}>{error}</li>) }
                    </ul>
                    <label className='email-input'>
                        <br></br>
                        <input
                            className='email'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                        />
                    </label>
                    <label className='username-input'>
                        <br></br>
                        <input
                            className='username'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
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
                    <label className='confirm-password-input'>
                        <br></br>
                        <input
                            className='confirm-password'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm Password'
                            required
                        />
                    </label>
                    <button className='submit-signup' type="submit">Sign Up</button>
                    <label className='singup-footer'>
                        Already a Kicker? <NavLink className='login-redirect' to='/login'>Log in here.</NavLink>
                    </label>
                </form>
            </div>
        </div>
    </>
    );
}

export default SignupFormPage;
