import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { listImages } from '../../store/image';
import '../../reset.css'
import './UserPage.css'


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
        <div className='user-container' id='user-container'>
            <NavLink className='create-newImage' to='/image'>Upload new Image</NavLink>
        {
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
