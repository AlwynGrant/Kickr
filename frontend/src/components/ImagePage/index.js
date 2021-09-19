import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory} from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { listImage, deleteImage } from '../../store/image';
import { createComment, listComments, editCommentContent, deleteComment } from '../../store/comment';
import { Modal } from '../../context/Modal';
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


    const comment = comments?.map((comment) => comment);

    const [newComment, setNewComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState('');
    const [editableDiv, setEditableDiv] = useState(false);

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

    const handleCommentEdit = async (e) => {
        e.preventDefault();
        const commentContentBox = document.querySelector('.comment-content-box');
        commentContentBox.setAttribute('contentEditable', true);
        setEditableDiv(true)
        console.log(commentContentBox)
        // await dispatch(editCommentContent(imageId, commentId));
    }

    const handleCancelCommentEdit = async (e) => {
        e.preventDefault();
         setEditableDiv(false)

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

    return (
    <>
        <div className='user-image-container'>
                <div className='user-image-box'>
                <img className='user-image' src={image?.imageUrl} alt='kick' onClick={() => setShowModal(true)}></img>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <img className='user-modal-image' src={image?.imageUrl} alt='kick' onClick={() => setShowModal(true)}></img>
                        </Modal>
                    )}
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
                                {comment.userId === sessionUser?.id && sessionUser && !editableDiv && (
                                    <div className='comment-tools-container'>
                                        <button className='edit-comment-button' onClick={(e) => handleCommentEdit(e)}>Edit</button>
                                        <button className='delete-comment-button' onClick={(e) => handleCommentDelete(e, comment.id)}>Delete</button>
                                    </div>
                                )}
                                {comment.userId === sessionUser?.id && sessionUser && editableDiv && (
                                    <div className='comment-tools-container'>
                                        <button className='edit-comment-button' onClick={(e) => handleCancelCommentEdit(e)}>Cancel</button>
                                        <button className='delete-comment-button' onClick={(e) => handleCommentDelete(e, comment.id)}>Submit</button>
                                    </div>
                                )}
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
