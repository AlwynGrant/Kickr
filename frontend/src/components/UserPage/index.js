import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { listImages } from '../../store/image';
import '../../reset.css'
import './UserPage.css'


function UserPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => Object.values(state.image)[0]);
    console.log(images);

    // if (!sessionUser) return <Redirect to="/" />

    useEffect(() => {
        dispatch(listImages(sessionUser.id))
    }, [dispatch, sessionUser.id]);

    return (
            <div className='user-container'>
                <NavLink to='/image'>Upload new Image</NavLink>
            {
                // TODO: MAP OUT IMAGES ONCE THIS COMPONENT HAS ACCESS TO THEM
                // images.map((image) => {
                //     return <div className='image-box'>{image}</div>
                // })
            }

            </div>
    );
}

export default UserPage;
