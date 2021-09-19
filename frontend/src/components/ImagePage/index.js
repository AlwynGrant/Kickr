import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory} from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import { listImage, deleteImage } from '../../store/image';
import { createComment, listComments, editCommentContent, deleteComment } from '../../store/comment';
import '../../reset.css'
import './ImagePage.css'
import '../../index.css'


function ImagePage() {
    const sessionUser = useSelector(state => state.session.user);
    const image = useSelector(state => state.image.image);
    const comments = useSelector(state => state.comment.comments);

    const { imageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalEditRef = useRef();
    const modalRef = useRef();

    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (!image) dispatch(listImage(imageId));
    }, [dispatch, image, imageId]);

    useEffect(() => {
         dispatch(listComments(imageId));
    }, [dispatch, imageId]);

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteImage(imageId));
        history.push(`/user/${image?.userId}`);
    }

    const handleCommentDelete = async (e, commentId) => {
        e.preventDefault();
        await dispatch(deleteComment(imageId, commentId));
    }

    const handleCommentEdit = async (e, commentId) => {
        e.preventDefault();
        // await dispatch(editCommentContent(imageId, commentId));
    }

    const handleBack = (e) => {
        e.preventDefault();
        history.push(`/user/${ image?.userId }`)
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!sessionUser) return;
        const addComment = {
            userId: sessionUser.id,
            imageId: imageId,
            comment: newComment
        };
        await dispatch(createComment(addComment))
            .then(setNewComment(''));
    }


    // ===================================== MODEL - EDIT COMMENTS

    const openEditModal = () => {
        modalRef.current.style.display = "block";
        // modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    }

    const closeModal = () => {
        modalRef.current.style.display = "none";
        // modalImageRef.current.style.backgroundImage = 'none';
    }

    return (
    <>
        <div className='user-image-container'>
                <div className='user-image-box'>
                <img className='user-image' src={image?.imageUrl} alt='kick'></img>
            </div>
        </div>
        <div className='btn-container'>
            <button className='back-to-images' type='submit' onClick={handleBack}>Back to Images</button>
            {sessionUser && (
                <>
                    <button className='delete-image-btn' onClick={handleDelete}>Delete Image</button>
                    <NavLink to={`/image/${image?.id}/edit`} className='edit-image-btn'>Edit Description</NavLink>
                </>
            )}

        </div>
        <div className='underimage-container'>
            <div className='comment-container'>
                    {sessionUser && (
                        <form className='comment-form-container' onSubmit={handleSubmitComment}>
                            <textarea
                                className='add-comment-box'
                                placeholder='Add a comment'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                            >
                            </textarea>
                            <button className='submit-comment' type='submit'>Comment</button>
                        </form>
                    )}
                {
                    comments?.map((comment) => {
                        return <div className={`comment-box ${comment.id}`} id={comment.id} key={comment.id}>
                            <div className='comment-content-container'>
                                <div className='comment-content-box'>{comment.comment}</div>
                            </div>
                            <div className='comment-data-container'>
                                {/* TODO: INCLUDE COMMENTER USERNAME */}
                                <div className='comment-timestamp-box'>Posted: {comment.createdAt}</div>
                                {comment.userId === sessionUser?.id && sessionUser && (
                                    <div className='comment-tools-container'>
                                        <button className='edit-comment-button' onClick={() => openEditModal()}>Edit</button>
                                        <button className='delete-comment-button' onClick={(e) => handleCommentDelete(e, comment.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                                <div className="modal" ref={modalRef}>
                                    <div className="overlay"></div>
                                    <span className="close" onClick={() => closeModal()}>X</span>
                                    <div className="modal-edit" ref={modalEditRef}>

                                        <form className='edit-comment-form' onSubmit={null}>
                                            <textarea className='edit-comment-box' value={null} onChange={null}></textarea>


                                            <button className='cancel-button' type='button' onClick={null}>Cancel</button>
                                            <button className='submit-edit-button' type='submit'>Submit</button>
                                        </form>






                                        <button className='edit-comment-button' onClick={(e) => handleCommentEdit(e, comment.id)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className='description-section'>
                    <h1 className='description-username'>{sessionUser?.username}</h1>
                    <h2 className='description-create-date'>Posted: {image?.createdAt}</h2>
                    <h2 className='description-content'>{image?.description}</h2>
            </div>
        </div>
    </>
    );
}

export default ImagePage;
