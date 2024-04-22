import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar';

const Main = () => {
    return (
        <div className='flex flex-col justify-between'>
            <Navbar />
            <div className='pt-24'>
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default Main;