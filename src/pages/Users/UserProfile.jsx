import { useEffect, useState } from "react";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const [allUsers, setAllUsers] = useState([]);
    const userDescription = useParams();
    
    useEffect(() => {
        const url = "http://localhost:5000/users";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const userData = data.find((users) => users.email === userDescription.email);
                setAllUsers(userData);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="lg:w-3/4 w-11/12 mx-auto my-12">
            <div>
                <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-8 gap-y-7">
                    <div className="custom-shadow p-4 col-span-2 rounded-md relative">
                        <div className="flex justify-center">
                            <div className="w-40 h-40 relative">
                                <img
                                    className="rounded-full w-full h-full object-cover"
                                    src={allUsers?.photoURL}
                                    alt=""
                                />
                            </div>
                        </div>
                        <p className="text-xl lg:absolute bottom-0 mx-auto w-11/12 custom-shadow text-center p-1 my-4 capitalize">
                            {allUsers?.role}
                        </p>
                    </div>
                    <div className="custom-shadow rounded-md p-4 col-span-7">
                        <div>
                            <div className="flex justify-between item relative">
                                <h3 className="font-semibold text-3xl pb-2 capitalize">
                                    {allUsers?.name}
                                </h3>

                            </div>
                            <div className="flex gap-2 items-center">
                                <MdOutlineEmail className="text-2xl pt-1" />
                                <p>{allUsers?.email}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <LuGraduationCap className="text-2xl pt-1" />
                                {allUsers?.studies && <p>{allUsers?.studies}</p>}
                                {!allUsers?.studies && <p>N/A</p>}
                            </div>
                            <div className="flex gap-2 items-center">
                                <SlLocationPin className="text-2xl pt-1" />
                                {allUsers?.location && <p>{allUsers?.location}</p>}
                                {!allUsers?.location && <p>N/A</p>}
                            </div>
                        </div>
                        <h4 className="font-semibold pt-6">Bio</h4>
                        {allUsers?.about && <p>{allUsers?.about}</p>}
                        {!allUsers?.about && <p>N/A</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;