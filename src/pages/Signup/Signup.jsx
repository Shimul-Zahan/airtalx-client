import { RiFileUserLine } from "react-icons/ri";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { TiTick } from "react-icons/ti";

const Signup = () => {
    return (
        <div className="lg:w-3/4 w-11/12 mx-auto lg:my-28 my-12">
            <div className="text-center pb-6">
                <h1 className="text-5xl pb-2 font-bold text-[#004d70]">Get Started</h1>
                <p className="text-lg font-semibold">In our website you can signup either as an employer or an jobseeker.</p>
            </div>
            <div className="flex md:flex-row flex-col justify-center gap-6">
                <div className="bg-[#edf7f4] p-3 w-[400px] custom-shadow">
                    <h3 className="text-4xl text-center font-semibold text-[#318b9e]">Employer</h3>
                    <div className="text-9xl py-2 flex justify-center "><RiFileUserLine /></div>
                    <button className="w-full bg-[#1d9cb5] rounded text-white text-2xl p-1">I want to hire</button>
                    <ul className="text-lg font-semibold pt-3">
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Post Jobs</span></li>
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Message Applicants</span></li>
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Hire staff</span></li>
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Pay your Staff</span></li>
                    </ul>
                </div>
                <div className="bg-[#edf7f4] p-3 w-[400px] custom-shadow">
                    <h3 className="text-4xl text-center font-semibold text-[#318b9e]">Jobseeker</h3>
                    <div className="text-9xl py-2 flex justify-center"><PiShoppingBagOpenBold /></div>
                    <button className="w-full bg-[#1d9cb5] rounded text-white text-2xl p-1">I want a job</button>
                    <ul className="text-lg font-semibold pt-3">
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Find online jobs</span></li>
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Apply for jobs</span></li>
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Submit your project</span></li>
                        <li className="flex items-center"><TiTick className="absolute bg-[#1d9cb5] text-white rounded-full" /><span className="pl-8">Get paid</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Signup;