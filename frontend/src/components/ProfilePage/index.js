import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { listImage, deleteImage } from '../../store/image';
import { createComment, listComments, editCommentContent, removeComment } from '../../store/comment';
import { createLike, getLikesNum } from '../../store/like';

import { Modal } from '../../context/Modal';
import '../../reset.css'
import './ImagePage.css'
import '../../index.css'

// NEEDS TO BE REVISED
function ImagePage() {
    // MINOR BUG- PROFILE DROPDOWN HIDDEN BEHIND IMAGE SECTION~!
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const sessionUser = useSelector(state => state.session.user);
    const image = useSelector(state => state.images[0]);
    const comments = useSelector(state => state.comments);
    const users = useSelector(state => state.view_user);

    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>

        </>
    );
}

export default ImagePage;
