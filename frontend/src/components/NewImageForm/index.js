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
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


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

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) return false
        return true;
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                // add to an array so we can display the name of file
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                // add a new property called invalid
                files[i]['invalid'] = true;
                // add to the same array so we can display the name of the file
                setSelectedFiles(selectedFiles => [...selectedFiles, files[i]]);
                // set error msg
                setErrorMessage('File type is not supported at this time!');
            }
        }
    }

    // ========================================== DROPZONE HANDLERS

    //  To limit uploading files over a specific file size, for possible future use.

    // const fileSize = (size) => {
    //     if (size === 0) return '0 Bytes';
    //     const k = 1024;
    //     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    //     const i = Math.floor(Math.log(size) / Math.log(k));
    //     return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    // }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }





    // ========================================== FILE VALIDATORS

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
        if (files.length) handleFiles(files)
        // console.log(files)
    }

    // ========================================== COMPONENT

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

                        <div className="file-display-container">
                            {
                                selectedFiles.map((data, i) =>
                                    <div className="file-status-bar" key={i}>
                                        <div>
                                            <div className="file-type-logo"></div>
                                            <div className="file-type">{fileType(data.name)}</div>
                                            <span className='file-name'>{data.name}</span>
                                            {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                                        </div>
                                        <div className="file-remove">X</div>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default NewImageForm;
