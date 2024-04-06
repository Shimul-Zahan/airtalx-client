import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user?.email);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(userData[0])

    useEffect(() => {
        const url = `http://localhost:5000/users?email=${user?.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setUserData(data);
                setIsLoading(false)
                console.log(data[0].image);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });
    }, [user])

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    return (
        <div className="bg-[#edf7f4]">
            <div className="w-3/4 mx-auto hidden lg:block py-4">
                <div className="flex items-center justify-between">
                    <Link className="w-[60px] flex items-center">
                        <img className="rounded-full" src="logo.jpg" alt="" />
                        <h3 className="text-3xl font-semibold">airTalX</h3>
                    </Link>
                    <div className="flex flex-row gap-8 font-semibold">
                        <Link>Home</Link>
                        <Link to={'/admin/users'}>Users</Link>
                        <Link>Post Job</Link>
                        <Link>Find Job</Link>
                        <Link to={'/jobseeker/dashboard'}>Dashboard (j)</Link>
                        <Link to={'/employer/dashboard'}>Dashboard (e)</Link>
                    </div>
                    <div>
                        {
                            user ?
                                <div className="dropdown pt-1 dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-16 rounded-full border-2 border-[#1d9cb5]">
                                            {isLoading ? (
                                                <p>Loading...</p>
                                            ) : (
                                                <img src={userData?.length > 0 ? userData[0]?.image : user?.photoURL} alt="User Photo" />
                                            )}
                                            <div>
                                                <p>{userData?.length > 0 ? userData[0]?.name : user?.name}</p>
                                            </div>
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" >
                                        <li>
                                            <Link to="/profile" className="justify-between">
                                                <div className="flex items-center gap-2">
                                                    {/* <CgProfile className="text-lg" /> */}
                                                    <p>Profile</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/settings" className="justify-between">
                                                <div className="flex items-center gap-2">
                                                    {/* <FiSettings className="text-lg" /> */}
                                                    <p>Settings</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <div onClick={handleLogOut} className="flex items-center gap-2">
                                                {/* <FiLogOut className="text-lg" /> */}
                                                <p>Logout</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div> :
                                <div className="flex gap-4 font-semibold navbar-end">
                                    <Link to={'/login'}><button>Login</button></Link>
                                    <Link to={'/signup'}><button className="bg-[#1d9cb5] text-white rounded px-2 py-1">Signup</button></Link>
                                </div>
                        }
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
                                <p></p>
                            </div>
                        </div>
                        <div className="w-[60px] flex items-center">
                            <img className="rounded-full" src="logo.jpg" alt="" />
                            <h3 className="text-2xl font-semibold">airTalX</h3>
                        </div>

                    </div>
                    {
                        user ?
                            <div className="dropdown pt-1 dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-16 rounded-full border-2 border-[#1d9cb5]">
                                        {isLoading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <img src={userData?.length > 0 ? userData[0]?.image : user?.photoURL} alt="User Photo" />
                                        )}
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" >
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            <div className="flex items-center gap-2">
                                                {/* <CgProfile className="text-lg" /> */}
                                                <p>Profile</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/settings" className="justify-between">
                                            <div className="flex items-center gap-2">
                                                {/* <FiSettings className="text-lg" /> */}
                                                <p>Settings</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <div onClick={handleLogOut} className="flex items-center gap-2">
                                            {/* <FiLogOut className="text-lg" /> */}
                                            <p>Logout</p>
                                        </div>
                                    </li>
                                </ul>
                            </div> :
                            <div className="flex gap-4 font-semibold navbar-end">
                                <Link to={'/login'}><button>Login</button></Link>
                                <Link to={'/signup'}><button className="bg-[#1d9cb5] text-white rounded px-2 py-1">Signup</button></Link>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;