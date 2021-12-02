import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import '../../reset.css'

function AboutPage() {
    const sessionUser = useSelector(state => state.session.user);
    const { imageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div>
                <h1>THIS IS AN ABOUT PAGE</h1>
                <p></p>
        </div>
    );
}

export default AboutPage;
