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
        if(!images) dispatch(listImages(userId));
    }, [dispatch, images, userId]);

    return (
        <div className='user-container'>
            <div className='top-container'>

            </div>
            <div className='bottom-container'>
            {sessionUser && (
                <NavLink className='create-newImage' to='/image'>Upload new Image</NavLink>
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
