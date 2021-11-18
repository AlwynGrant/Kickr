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
    const images = useSelector(state => state.image.images);

    const [largeGallery, setLargeGallery] = useState(true)
    const [smallGallery, setSmallGallery] = useState(false)

    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
         dispatch(listImages(userId));
    }, [dispatch, userId]);

    const handleLargeGallery = (e) => {
        e.preventDefault();

        setLargeGallery(true);
        setSmallGallery(false);
    }

    const handleSmallGallery = (e) => {
        e.preventDefault();

        setSmallGallery(true);
        setLargeGallery(false);
    }

    return (
        <div className='main-container'>
            <div className='user-container'>
                <div>
                    <div>
                        <button onClick={(e) => handleLargeGallery(e)}>LARGE IMAGES</button>
                        <button onClick={(e) => handleSmallGallery(e)}>IMAGE GALLERY</button>
                    </div>
                </div>
                {
                    largeGallery &&
                        <div className='l-container'>
                            {!images?.length && sessionUser && (
                                <div className='no-image-div'>
                                    <div>There is no activity to show right now</div> <br></br>
                                    <div>Start by uploading an image</div>
                                </div>
                            )}
                            {
                                images?.map((image) => {
                                    return <NavLink className='image-box' to={`/image/${image.id}`} key={image.id}>
                                    <img className='actual-image' src={image.imageUrl} key={image.id} alt='user-img' ></img>
                                        </NavLink>
                                })
                            }
                        </div>
                }
                {
                    smallGallery &&
                        <div className='s-container'>
                            {!images?.length && sessionUser && (
                                <div className='no-image-div'>
                                    <div>There is no activity to show right now</div> <br></br>
                                    <div>Start by uploading an image</div>
                                </div>
                            )}
                            {
                                images?.map((image) => {
                                    return <NavLink className='image-box' to={`/image/${image.id}`} key={image.id}>
                                    <img className='actual-image' src={image.imageUrl} key={image.id} alt='user-img' ></img>
                                        </NavLink>
                                })
                            }
                        </div>

                }
            </div>
            <div className='sidebar'>
                TEST
            </div>
        </div>

    );
}

export default UserPage;
