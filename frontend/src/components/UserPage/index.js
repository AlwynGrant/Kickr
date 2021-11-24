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
    const images = useSelector(state => state.images);

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
                        <button className='size-btns' onClick={(e) => handleLargeGallery(e)}><i class="fas fa-square"></i></button>
                        <button className='size-btns' onClick={(e) => handleSmallGallery(e)}><i class="fas fa-th-large"></i></button>
                    </div>
                </div>
                {
                    largeGallery &&
                        <div className='l-container'>
                            {
                                images?.map((image) => {
                                    return <NavLink className='l-image-box' to={`/images/${image.id}`} key={image.id}>
                                    <img className='l-actual-image' src={image.imageUrl} key={image.id} alt='user-img' ></img>
                                        </NavLink>
                                })
                            }
                        </div>
                }
                {
                    smallGallery &&
                        <div className='s-container'>
                            {
                                images?.map((image) => {
                                    return <NavLink className='s-image-box' to={`/images/${image.id}`} key={image.id}>
                                    <img className='s-actual-image' src={image.imageUrl} key={image.id} alt='user-img' ></img>
                                        </NavLink>
                                })
                            }
                        </div>

                }
            </div>
            <div className='sidebar'>
                <div className='sidebar-div1'>FEATURED KICKS</div>
                <div className='sidebar-div2'>HOT KICKS</div>
                <div className='sidebar-div3'>div3</div>
            </div>
        </div>

    );
}

export default UserPage;
