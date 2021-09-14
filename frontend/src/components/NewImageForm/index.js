import React, { useState } from 'react';
import * as newImageActions from '../../store/image';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../../reset.css'
import './NewImage.css'


function NewImageForm() {
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.image);

    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newImage = { url, description }
        console.log(newImage)
        await dispatch(newImageActions.createImage(newImage));
    }

    return (
        <div className='new-image-container'>
            <form className='new-image-form' onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='image url'
                        required
                    />
                </label>
                <label>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Tell us about this kick!'
                    />
                </label>
                <button type='submit'>Add new Image</button>
            </form>
        </div>
    );
}

export default NewImageForm;
