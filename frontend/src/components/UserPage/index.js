import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { listImages } from '../../store/image';
import '../../reset.css'
import './UserPage.css'
import '../../index.css'


function UserPage() {
    const sessionUser = useSelector(state => state.session.user);
    const [isLogged, setIsLogged] = useState(sessionUser);

    const { userId } = useParams();
    const dispatch = useDispatch();
    const images = useSelector(state => state.image.images);


    useEffect(() => {
        dispatch(listImages(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        console.log(isLogged)
        if (isLogged === undefined) {
            const createImageDiv = document.querySelector('.create-newImage')
            createImageDiv.setAttribute('hidden', true)
        }
    },[isLogged])


    return (
        <div className='user-container'>
            <div className='top-container'>

            </div>
            <div className='bottom-container'>
                <NavLink className='create-newImage' to='/image'>Upload new Image</NavLink>
            {
                images?.map((image) => {
                return <NavLink className='image-box' to={`/image/${image.id}`}>
                    <div src={image.imageUrl} key={image.id} >{image.imageUrl}</div>
                       </NavLink>
                })
            }
            </div>

        </div>
    );
}

export default UserPage;
