import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import '../../reset.css'
import './UserPage.css'


function UserPage() {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return <Redirect to="/" />;

    return (
            <div className='user-container'>
                <NavLink to='/image'>Upload new Image</NavLink>
            </div>
    );
}

export default UserPage;
