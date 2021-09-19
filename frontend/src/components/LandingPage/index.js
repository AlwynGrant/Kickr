import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './github-image/github-mark.png'
import '../../reset.css'
import './LandingPage.css'


function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return <Redirect to={`/user/${sessionUser.id}`} />;

    return (
    <>
        <div className='landing-container'>
            <h1 className='landing-title'>Kick start your collection.</h1>
            <h2 className='landing-subtitle'> Join the Kickr community, home to fans and players <br></br> Share some of your favorite kicks</h2>
            <NavLink className='landing-signup-link' to='/signup'>Start for free</NavLink>
        </div>
        <div className='footer'>
                <a className='footer-github' href='https://github.com/AlwynGrant/Kickr'>
                    <div className='github-img'></div>
                </a>
        </div>
    </>
    );
}

export default LandingPage;
