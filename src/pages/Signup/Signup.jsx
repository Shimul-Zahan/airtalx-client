import { useState } from 'react';
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Employer from "../../../public/employer.json"
import Jobseeker from "../../../public/jobseeker.json"

const Signup = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="lg:w-1/2 w-11/12 mx-auto lg:my-28 my-12">
            <div className="text-center pb-6">
                <h1 className="text-5xl pb-2 font-bold">Get Started</h1>
                <p className="text-lg font-semibold">In our website you can signup either as an employer or a jobseeker.</p>
            </div>
            <div className="flex justify-center gap-8">
                <button
                    className={`cursor-pointer text-2xl font-semibold focus:outline-none ${activeTab === 0 ? 'text-[#1d9cb5]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(0)}
                >
                    I want to hire
                </button>
                <button
                    className={`cursor-pointer text-2xl font-semibold focus:outline-none ${activeTab === 1 ? 'text-[#1d9cb5]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(1)}
                >
                    I want a job
                </button>
            </div>
            {activeTab === 0 ?
                <div className="flex justify-between gap-20 md:py-36 py-12">
                    <div className="w-full md:block hidden">
                        <Lottie animationData={Employer}/>
                    </div>
                    <div className='w-[600px] bg-[#edf7f4] custom-shadow rounded-lg p-8 mb-4'>
                        <h2 className='text-xl text-center font-semibold mb-3 uppercase'>Employer Signup</h2>
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
                                <div className='pb-2'>
                                    <label htmlFor="password">Confirm Password</label><br />
                                    <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="password" name="password" id="" required />
                                </div>
                                <div className='flex gap-2 mb-3'>
                                    <button className='w-full bg-[#1d9cb5] rounded text-white font-semibold p-2 mt-3'>Login</button>
                                </div>
                            </div>
                        </form>
                        <div className='text-center'>
                            <small>Already have an account? <Link to='/login' className='text-[#1d7edd] font-semibold'>Signup now</Link></small>
                        </div>
                    </div>
                </div> :
                <div className="flex justify-between items-center gap-20 md:py-36 py-12">
                    <div className="w-full md:block hidden">
                        <Lottie animationData={Jobseeker}/>
                    </div>
                    <div className='w-[600px] bg-[#edf7f4] custom-shadow rounded-lg p-8 mb-4'>
                        <h2 className='text-xl text-center font-semibold mb-3 uppercase'>Jobseeker Signup</h2>
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
                                <div className='pb-2'>
                                    <label htmlFor="password">Confirm Password</label><br />
                                    <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="password" name="password" id="" required />
                                </div>
                                <div className='flex gap-2 mb-3'>
                                    <button className='w-full bg-[#1d9cb5] rounded text-white font-semibold p-2 mt-3'>Login</button>
                                </div>
                            </div>
                        </form>
                        <div className='text-center'>
                            <small>Already have an account? <Link to='/login' className='text-[#1d7edd] font-semibold'>Signup now</Link></small>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default Signup;
