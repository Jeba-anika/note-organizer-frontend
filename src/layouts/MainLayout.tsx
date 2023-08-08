import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div >
            <Navbar />
            <div className="max-w-[1440px] lg:mx-auto md:mx-auto sm:mr-5 sm:ml-5 mr-5 ml-5 min-h-screen" >
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;