import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-[#edf7f4]">
            <div className="w-3/4 mx-auto hidden lg:block">
                <div className="flex items-center justify-between ">
                    <Link className="w-[90px]">
                        <img src="logo.jpg" alt="" />
                    </Link>
                    <div className="flex flex-row gap-4 font-semibold">
                        <Link>Home</Link>
                        <Link>About</Link>
                        <Link>Find Job</Link>
                    </div>
                    <div className="flex gap-4 font-semibold">
                        <button>Login</button>
                        <button className="bg-[#1d9cb5] text-white rounded px-2 py-1">Signup</button>
                    </div>
                </div>
            </div>
            <div className="bg-[#edf7f4] lg:hidden block">
                <div className="navbar flex items-center justify-between">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>

                            <div tabIndex={0} className="menu menu-sm dropdown-content font-semibold mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <Link>Home</Link>
                                <Link>About</Link>
                                <Link>Find Job</Link>
                            </div>
                        </div>
                        <div className="w-[60px]">
                            <img src="logo.jpg" alt="" />
                        </div>
                    </div>
                    <div className="flex gap-4 font-semibold navbar-end">
                        <button>Login</button>
                        <button className="bg-[#1d9cb5] text-white rounded px-2 py-1">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;