import React, { useState } from 'react';
import * as newImageActions from '../../store/image';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../../reset.css'
import './NewImage.css'


function NewImageForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const [url, setUrl] = useState(null);
    const [description, setDescription] = useState('');


    if (!sessionUser) return <Redirect to="/" />;


    const handleSubmit = (e) => {
        e.preventDefault();
        const newImage = { userId: sessionUser.id, imageUrl: url, description }
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
    // ========================================== DROPZONE VALIDATIONS


    // ========================================== DROPZONE HANDLERS

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files);
    }

    // ========================================== /////////////////

    return (
        <>
            <div className='new-image-container'>
                <form className='new-image-form' onSubmit={handleSubmit}>
                    <label className='upload-box'>
                        <input
                            className='upload-input'
                            type='file'
                            onChange={updateFile}
                            required
                        />
                    </label>
                    <label className='description-box'>
                        <input
                            className='description-input'
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Tell us about this kick!'
                        />
                    </label>
                    <button className='submit-new-image' type='submit'>Add new Image</button>
                </form>
            </div>


            {/* =================================== {CUT OFF POINT ----- INTERGRATE IN LATER PHASE!!!} ================================= */}



            <div>
                <p className="title">React Drag and Drop Image Upload</p>
                <div className="content">
                    <div className="container">
                        <div
                            className="drop-container"
                            onDragOver={dragOver}
                            onDragEnter={dragEnter}
                            onDragLeave={dragLeave}
                            onDrop={fileDrop}
                        >
                            <div className="drop-message">
                                <div className="upload-icon"></div>
                                Drag & Drop files here or click to upload
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default NewImageForm;
