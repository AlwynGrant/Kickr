import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { listImages } from '../../store/image';
import '../../reset.css'
import './UserPage.css'


function UserPage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.image.images);

    useEffect(() => {
        dispatch(listImages(userId));
    }, [dispatch, userId]);

    const isLogged = () => {
        if (!sessionUser) return
    }


    return (
            <div className='user-container'>
                {
                <NavLink onLoad={isLogged} to='/image'>Upload new Image</NavLink>
                }
            {
                // TODO: MAP OUT IMAGES ONCE THIS COMPONENT HAS ACCESS TO THEM
                images?.map((image) => {
                    return <div key={image.id} className='image-box'>
                        {image.id}
                        {image.imageUrl}
                        </div>
                })
            }

            </div>
    );
}

export default UserPage;
