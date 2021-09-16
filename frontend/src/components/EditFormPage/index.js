import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { editDescription, listImage } from '../../store/image';
import '../../reset.css'
import './EditFormPage.css'
import '../../index.css'


function EditFormPage() {
    const sessionUser = useSelector(state => state.session.user);
    const { imageId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const image = useSelector(state => state.image.image);
    const [edit, setEdit] = useState(image?.description);

    useEffect(() => {
        dispatch(listImage(imageId));
    }, [dispatch, imageId]);

    if (!sessionUser) return <Redirect to={`/login`} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editDescription( imageId , edit));
        history.push(`/image/${imageId}`)
    }

    return (
            <div className='edit-container'>
                <form className='edit-image-form' onSubmit={handleSubmit}>
                    <label>
                        <textarea
                            value={edit}
                            onChange={(e) => setEdit(e.target.value)}
                        >

                        </textarea>
                        <button type='submit'>Submit</button>
                    </label>

                </form>
            </div>
    );
}

export default EditFormPage;
