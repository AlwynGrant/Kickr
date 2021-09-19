import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory} from 'react-router-dom';
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

    const { imageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

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

    return (
    <>
        <div className='user-image-container'>
                <div className='user-image-box'>
                <img className='user-image' src={image?.imageUrl} alt='kick'></img>
            </div>
            <h2>{image?.description}</h2>
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
        <div className='comment-container'>
            <h1>COMMENTS</h1>
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
                        <button type='submit'>Comment</button>
                    </form>
                )}
            {
                comments?.map((comment) => {
                    return <div className={`comment-box ${comment.id}`} id={comment.id} key={comment.id}>
                        <div className='comment-content-box'>{comment.comment}</div> <br></br>
                        <div className='comment-timestamp-box'>{comment.updatedAt}</div> <br></br>
                        {/* TODO: INCLUDE COMMENTER USERNAME */}
                        {comment.userId === sessionUser?.id && sessionUser && (
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
