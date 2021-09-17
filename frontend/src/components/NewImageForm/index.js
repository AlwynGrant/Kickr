import React, { useState } from 'react';
import * as newImageActions from '../../store/image';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../../reset.css'
import './NewImage.css'


function NewImageForm() {
    const [url, setUrl] = useState(null); // image upload
    const [description, setDescription] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return <Redirect to="/" />;

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newImage = { userId: sessionUser.id, description, imageUrl: url }
    //     await dispatch(newImageActions.createImage(newImage));
    //     history.push(`/user/${sessionUser.id}`);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newImage = { userId: sessionUser.id, imageUrl: url, description,  }
        dispatch(newImageActions.createImage(newImage))
            .then(() => {
                setDescription('');
                setUrl(null);
            })
        history.push(`/user/${sessionUser.id}`);
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setUrl(file);
    };

    console.log(url)

    return (
        <div className='new-image-container'>
            <form className='new-image-form' onSubmit={handleSubmit}>
                <label>
                    <input
                        type='file'
                        onChange={updateFile}
                        required
                    />
                </label>
                {/* <label>
                    <input
                        type='text'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder='test'
                    />
                </label> */}
                <label>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Tell us about this kick!'
                    />
                </label>
                <button type='submit'>Add new Image</button>
                <div>
                    {sessionUser && (
                        <div>
                            <img style={{ width: "150px" }} src={sessionUser?.profileImageUrl} alt="profile"/>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default NewImageForm;
