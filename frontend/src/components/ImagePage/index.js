import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory} from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { listImage, deleteImage } from '../../store/image';
import { createComment, listComments, editCommentContent, removeComment } from '../../store/comment';
import { Modal } from '../../context/Modal';
import '../../reset.css'
import './ImagePage.css'
import '../../index.css'


function ImagePage() {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const sessionUser = useSelector(state => state.session.user);
    const image = useSelector(state => state.images[0]);
    const comments = useSelector(state => state.comments);

    const { imageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    let [edit, setEdit] = useState('');

    useEffect(() => {
        if (!image) dispatch(listImage(imageId));
    }, [dispatch, image?.views, imageId]);

    useEffect(() => {
         dispatch(listComments(imageId));
    }, [dispatch, imageId]);


    // ============================================================= BACK TO USER PAGE

    const handleBack = (e) => {
        e.preventDefault();
        history.push(`/user/${ image?.userId }`)
    }

    // ============================================================= DELETE IMAGE

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteImage(imageId));
        history.push(`/user/${image?.userId}`);
    }

    // ============================================================= ADD NEW COMMENT

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

    // ============================================================= DELETE COMMENT

    const handleCommentDelete = async (e, commentId) => {
        e.preventDefault();
        await dispatch(removeComment(imageId, commentId));
    }

    // ============================================================= RENDER

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
            {sessionUser && sessionUser?.id === image?.userId && (
                <>
                    <button className='delete-image-btn' onClick={handleDelete}>Delete Image</button>
                    <NavLink to={`/image/${image?.id}/edit`} className='edit-image-btn'>Edit Description</NavLink>
                </>
            )}
            <button className='like-image-btn' onClick={null}>Like</button>
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
                                <textarea
                                    disabled={true}
                                    className={`comment-content-box com${comment.id}`}
                                    value={comment.comment} // FIX & REFACTOR
                                    onChange={(e) => setEdit(e.target.value)}
                                >
                                </textarea>
                            </div>

                            <div className='comment-data-container'>
                                {/* TODO: INCLUDE COMMENTER USERNAME */}
                                <div className='comment-timestamp-box'>Posted: {comment.createdAt}</div>
                                {comment.userId === sessionUser?.id && sessionUser && (
                                    <div className='comment-tools-container'>
                                        <button className='edit-comment-button' disabled={true} onClick={null}>Edit</button>
                                        <button className='delete-comment-button' onClick={(e) => handleCommentDelete(e, comment.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    })
                }
            </div>
            <div className='description-section'>
                    <h1 className='description-username'>{sessionUser?.username}</h1>
                    <h2 className='description-create-date'>Posted: {new Date(image?.createdAt).toLocaleDateString("en-US", options)}</h2>
                    <h2 className='description-create-date'>Views: {image?.views}</h2>
                    <h2 className='description-create-date'>Comments: {comments?.length}</h2>
                    <h2 className='description-create-date'>Likes: LIKE QUANTITY HERE</h2>
                    <h2 className='description-content'>{image?.description}</h2>
            </div>
        </div>
    </>
    );
}

export default ImagePage;
