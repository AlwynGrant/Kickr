import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { listImage } from '../../store/image';
import '../../reset.css'
import './ImagePage.css'
import '../../index.css'


function ImagePage() {
    const sessionUser = useSelector(state => state.session.user);
    const [isLogged, setIsLogged] = useState(sessionUser);

    const { userId } = useParams();
    const dispatch = useDispatch();
    const images = useSelector(state => state.image.images);


    // useEffect(() => {
    //     dispatch(listImage(userId));
    // }, [dispatch, userId]);

    // useEffect(() => {
    //     console.log(isLogged)
    //     if (isLogged === undefined) {
    //         const createImageDiv = document.querySelector('.create-newImage')
    //         createImageDiv.setAttribute('hidden', true)
    //     }
    // }, [isLogged])


    return (
    <>
        <div className='image-container'>
            <h1>IMAGE</h1>
            <button className='edit-image'>EDIT</button>
            <button className='delete-image'>DELETE</button>
        </div>
        <div className='comment-container'>
            <h1>COMMENTS</h1>
        </div>
    </>
    );
}

export default ImagePage;
