import React, { useState, useRef } from 'react';
import * as newImageActions from '../../store/image';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { useParams } from 'react-router';
import '../../reset.css'
import './NewImage.css'


function NewImageForm() {
    const params = useParams();
    const fileInputRef = useRef();
    const modalImageRef = useRef();
    const modalRef = useRef();
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
        const newImage = { userId: sessionUser.id, imageUrl: selectedFiles[0], description }
        dispatch(newImageActions.createImage(newImage))
            .then(() => {
                setDescription('');
                setUrl(null);
            })
        history.push(`/user/${sessionUser.id}`);
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

    const removeFile = (name) => {
        // find the index of the item
        // remove the item from array
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);
    }

    // ========================================== DROPZONE HANDLERS

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    // TODO: Limit upload of files over a specific file size.

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

    }
    console.log(selectedFiles[0])
    // ========================================== MODAL

    const openImageModal = (file) => {
        const reader = new FileReader(); // async file/data buffer reader
        modalRef.current.style.display = "block";
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        }
    }

    const closeModal = () => {
        modalRef.current.style.display = "none";
        modalImageRef.current.style.backgroundImage = 'none';
    }


    // ========================================== HIDDEN INPUT

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }
    // ========================================== COMPONENT

    return (
        <div>
            <div className="content">
                <div className="container">
                    {/* <button className='go-back-btn' type='submit' onClick={handleBack}>Back to Images</button> */}
                    <button className='file-upload-btn' onClick={handleSubmit} disabled={!selectedFiles.length}>Upload Image</button>
                    <div
                        className="drop-container"
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                        onClick={fileInputClicked}
                    >
                        <div className="drop-message">
                            <div className="upload-icon"></div>
                            Drag & Drop files here or click to upload
                        </div>
                        <input
                            ref={fileInputRef}
                            className="file-input"
                            type="file"
                            multiple
                            onChange={filesSelected}
                        />
                    </div>
                    <label className='description-box'>
                        <textarea
                            className='description-input'
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Tell us about this kick...'
                        />
                    </label>
                    <div className="file-display-container">
                        {
                            selectedFiles.map((data, i) =>
                                <div className="file-status-bar" key={i}>
                                    <div className='file-details' onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                                        <div className="file-type-logo"></div>
                                        <div className="file-type">{fileType(data.name)}</div>
                                        <div className='file-name'>{data.name}</div>
                                        {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                                    </div>
                                    <div className="file-remove" onClick={() => removeFile(data.name)}>
                                        <p className='x-button'>x</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="modal" ref={modalRef}>
                <div className="overlay"></div>
                <span className="close" onClick={(() => closeModal())}>
                    <p className='x-button'>x</p>
                </span>
                <div className="modal-image" ref={modalImageRef}></div>
            </div>
        </div>

    );
}

export default NewImageForm;
