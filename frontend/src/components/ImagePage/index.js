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
    console.log(comments?.[0].userId)
    console.log(sessionUser?.id)

    const match = comments?.map((comment) => comment.userId === sessionUser?.id)
    const [isLogged, setIsLogged] = useState(sessionUser);
    const [newComment, setNewComment] = useState('');
    const [userMatch, setUserMatch] = useState(match);

    const { imageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listImage(imageId));
        dispatch(listComments(imageId));
    }, [dispatch, imageId]);

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteImage(imageId));
        history.push(`/user/${image?.userId}`)
    }

    const handleCommentDelete = (e, commentId) => {
        e.preventDefault();
        dispatch(deleteComment(imageId, commentId));
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
            <h1>{image?.imageUrl}</h1>
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
                        >
                        </textarea>
                        <button type='submit'>Comment</button>
                    </form>
                )}
            {
                comments?.map((comment) => {
                    return <div className='comment-box' id={comment.id} key={comment.id}>
                        {comment.comment} <br></br>
                        {comment.updatedAt} <br></br>
                        {/* TODO: INCLUDE COMMENTER USERNAME */}
                        {match && isLogged && (
                            <>
                                <button className='edit-comment-button'>Edit</button>
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
