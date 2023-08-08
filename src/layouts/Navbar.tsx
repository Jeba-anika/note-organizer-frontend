import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { removeUser } from '../redux/features/user/userSlice';

const Navbar = () => {
    const { email } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(removeUser())
    }
    return (
        <div className="navbar bg-base-100 ">
            <div className=" ml-6">

                <Link to={'/'} className="btn btn-ghost normal-case text-xl">Note Organizer</Link>
            </div>


            {
                email ? <div className=""><button onClick={handleLogout} className="btn">Logout</button></div>
                    :
                    <div className=" ">
                        <button className="btn mr-5"><Link to='/login'>Login</Link></button>
                        <button className="btn"><Link to='/signup'>Sign Up</Link></button>
                    </div>
            }

        </div>
    );
};

export default Navbar;