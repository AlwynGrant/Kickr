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
    const { imageId } = useParams();
    const dispatch = useDispatch();
    const image = useSelector(state => state.image.image);

    useEffect(() => {
        dispatch(listImage(imageId));
    }, [dispatch, imageId]);



    useEffect(() => {
        if (isLogged === undefined) {
            const editImageDiv = document.querySelector('.edit-image');
            const deleteImageDiv = document.querySelector('.delete-image');
            editImageDiv.setAttribute('hidden', true);
            deleteImageDiv.setAttribute('hidden', true);
        }
    }, [isLogged]);




    return (
    <>
        <div className='image-container'>
            <h1>{image?.imageUrl}</h1>
            <h2>{image?.description}</h2>
            <NavLink to={`/image/${image?.id}/edit`} className='edit-image'>EDIT</NavLink>
            <button className='delete-image'>DELETE</button>
        </div>
        <div className='comment-container'>
            <h1>COMMENTS</h1>
        </div>
    </>
    );
}

export default ImagePage;
