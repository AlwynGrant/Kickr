import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { editDescription } from '../../store/image';
import '../../reset.css'
import './EditFormPage.css'
import '../../index.css'


function EditFormPage() {
    const sessionUser = useSelector(state => state.session.user);
    const [isLogged, setIsLogged] = useState(sessionUser);
    const { imageId } = useParams();
    const dispatch = useDispatch();
    const image = useSelector(state => state.image.image);

    return (
            <div className='edit-container'>
                <form className='edit-image-form'>
                    <label>
                        <textarea>

                        </textarea>
                    </label>

                </form>
            </div>
    );
}

export default EditFormPage;
