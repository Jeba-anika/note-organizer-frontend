import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";

const Home = () => {
    return (

        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-0 '>
            <div className='bg-sky-300 lg:rounded-bl-xl  md:rounded-bl-xl lg:rounded-tr-none md:rounded-tr-none sm:rounded-tr-xl rounded-tr-xl '>
                <div className='bg-sky-200 w-10 h-10'></div>
                <div className='bg-sky-200 w-10 h-10 ml-10'></div>
                <h2 className='banner-font lg:text-4xl md:text-2xl sm:text-xl text-xl lg:p-20 md:p-10 p-6 sm:p-10  font-bold'>
                    Welcome to OrganizeNote, your one-stop destination for efficient and streamlined note organization! </h2>
            </div>
            <div className='bg-sky-200 relative flex justify-center items-center lg:rounded-bl-none lg:rounded-tr-xl md:rounded-bl-none md:rounded-tr-xl sm:rounded-bl-xl rounded-bl-xl '>
                <div>
                    {/* <img className='w-96' src="" alt="" /> */}
                    <h2 className='banner-font lg:text-4xl md:text-2xl sm:text-xl text-xl lg:p-20 md:p-10 p-6 sm:p-10  font-bold'>Create and categorize notes effortlessly.and access your notes across all devices, ensuring you stay on top of your game no matter where you are. Let's Get Started.</h2>
                    <div className="flex justify-center mb-8">
                        <button className="border border-sky-500 rounded-xl px-6 py-4 text-sky-600 hover:bg-sky-300 font-bold"><Link className="flex justify-center items-center gap-2" to='/notes'>Take Notes <BiSolidRightArrow className='inline'></BiSolidRightArrow></Link></button>
                    </div>
                </div>
                <div className='bg-sky-300 absolute bottom-0 right-0 w-10 h-10'></div>
                <div className='bg-sky-300 absolute bottom-10 right-10 w-10 h-10'></div>
            </div>
        </div>

    );
};

export default Home;