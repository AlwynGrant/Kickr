import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web'
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import './github-image/github-mark.png';
import '../../reset.css';
import './LandingPage.css';

const slides = [
    { id: 0, url: 'https://kickrbucket.s3.us-west-1.amazonaws.com/1632100941407.jpg' },
    { id: 1, url: 'https://kickrbucket.s3.amazonaws.com/1632100867124.jpg' },
    { id: 2, url: 'https://kickrbucket.s3.us-west-1.amazonaws.com/1632100910842.jpg' },
    { id: 3, url: 'https://kickrbucket.s3.us-west-1.amazonaws.com/1632100923868.jpg' },
    { id: 4, url: 'https://kickrbucket.s3.us-west-1.amazonaws.com/1632100931040.jpg' },
];
console.log(slides[4])

function LandingPage() {
    const [index, setIndex] = useState(0)
    const sessionUser = useSelector(state => state.session.user);


    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 700 },
    })

    useEffect(() => {
        const t = setInterval(() => setIndex(state => (state + 1) % slides.length), 7000)
        return () => clearTimeout(t)
    }, [])

    if (sessionUser) return <Redirect to={`/user/${sessionUser.id}`} />;

    return (
    <>
            <div className="flex fill center">
                {transitions((style, i) => (
                    <animated.div
                        className={styles.bg}
                        style={{
                            ...style,
                            backgroundImage: `url(${slides[i].url})`,
                        }}
                    />
                ))}
            </div>
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
