import Lottie from "lottie-react";
import LoginModel from "../../../public/login-model.json"
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    return (
        <div className="lg:w-1/2 w-11/12 mx-auto">
            <div className="flex justify-between gap-20 md:py-36 py-10">
                <div className="w-full md:block hidden">
                    <Lottie animationData={LoginModel} />
                </div>
                <div className='w-[600px] bg-[#edf7f4] custom-shadow rounded-lg p-8 mb-4'>
                    <h2 className='text-4xl text-center font-semibold mb-3 uppercase'>Login</h2>
                    <form>
                        <div className='flex flex-col gap-5'>
                            <div className='pb-2'>
                                <label htmlFor="email">Email</label><br />
                                <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="email" name="email" id="" required />
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="password">Password</label><br />
                                <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="password" name="password" id="" required />
                            </div>
                            <div className='flex gap-2 mb-3'>
                                <button className='w-full bg-[#1d9cb5] rounded text-white font-semibold p-2 mt-3'>Login</button>
                            </div>
                        </div>
                    </form>
                    <p className='text-center'>--------- or ---------</p>
                    <div className='flex text-center gap-2 mb-3'>
                        <button className='w-full border-[#1d9cb5] border rounded font-semibold p-2 mt-3 flex justify-center items-center gap-3'>
                            <FaGoogle />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                    <div className='text-center'>
                        <small>Don't have an account? <Link to='/signup' className='text-[#1d7edd] font-semibold'>Signup now</Link></small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;