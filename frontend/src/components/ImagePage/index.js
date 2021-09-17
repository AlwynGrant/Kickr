import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { listImage, deleteImage } from '../../store/image';
import { createComment, listComments, editCommentContent, deleteComment } from '../../store/comment';
import '../../reset.css'
import './ImagePage.css'
import '../../index.css'


function ImagePage() {
    const sessionUser = useSelector(state => state.session.user);
    const image = useSelector(state => state.image.image);
    const comments = useSelector(state => state.comment.comments);

    const [isLogged, setIsLogged] = useState(sessionUser);
    const [newComment, setNewComment] = useState('');

    const { imageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!image) dispatch(listImage(imageId));
    }, [dispatch, image, imageId]);

    useEffect(() => {
        if (!comments) dispatch(listComments(imageId));
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
        if (!isLogged) return;
        const addComment = {
            userId: sessionUser.id,
            imageId: imageId,
            comment: newComment
        };
        await dispatch(createComment(addComment));
    }

    return (
    <>
        <div className='image-container'>
            <button type='submit' onClick={handleBack}>Back to Images</button>
                <div className='image-box'>
                <img className='actual-image' src={image?.imageUrl}></img>
            </div>
            <h2>{image?.description}</h2>
            {isLogged && (
                <>
                    <NavLink to={`/image/${image?.id}/edit`} className='edit-image'>EDIT</NavLink>
                    <button className='delete-image' onClick={handleDelete}>DELETE</button>
                </>
            )}
        </div>
        <div className='comment-container'>
            <h1>COMMENTS</h1>
                {isLogged && (
                    <form className='comment-form-container' onSubmit={handleSubmitComment}>
                        <textarea
                            className='add-comment-box'
                            placeholder='Add a comment'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        >
                        </textarea>
                        <button type='submit'>Comment</button>
                    </form>
                )}
            {
                comments?.map((comment) => {
                    return <div className={`comment-box ${comment.id}`} id={comment.id} key={comment.id}>
                        <div className='comment-content-box'>{comment.comment}</div> <br></br>
                        <div className='comment-timestamp-box'>{comment.updatedAt}</div> <br></br>
                        {/* TODO: INCLUDE COMMENTER USERNAME */}
                        {comment.userId === sessionUser?.id && isLogged && (
                            <>
                                <button className='edit-comment-button' onClick={(e) => handleCommentEdit(e, comment.id)}>Edit</button>
                                <button className='delete-comment-button' onClick={(e) => handleCommentDelete(e, comment.id)}>Delete</button>
                            </>
                        )}
                    </div>
                })
            }
        </div>
    </>
    );
}

export default ImagePage;
