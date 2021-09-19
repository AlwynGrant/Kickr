import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { listImages } from '../../store/image';
import '../../reset.css'
import './UserPage.css'
import '../../index.css'


function UserPage() {
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.image.images);

    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
         dispatch(listImages(userId));
    }, [dispatch, userId]);

    return (
        <div className='user-container'>
            <div className='top-container'>

            </div>
            {sessionUser && (
                <NavLink className='create-newImage' to='/image'>UPLOAD IMAGE</NavLink>
            )}
            <div className='bottom-container'>
            {!images?.length && (
                <div className='no-image-div'>
                    <h1>There is no activity to show right now</h1> <br></br>
                    <h1>Start by uploading an image</h1>
                </div>
            )}
            {
                    images?.map((image) => {
                    return <NavLink className='image-box' to={`/image/${image.id}`}>
                        <img className='actual-image' src={image.imageUrl} key={image.id} alt='user-img' ></img>
                            </NavLink>
                    })
                }
            </div>

        </div>
    );
}

export default UserPage;
