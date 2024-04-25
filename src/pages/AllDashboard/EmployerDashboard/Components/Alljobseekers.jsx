import { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Alljobseekers = () => {
    const [jobseekers, setJobseekers] = useState([]);

    useEffect(() => {
        const url = "http://localhost:5000/users";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const jobseekerData = data.filter(user => user.role === 'jobseeker');
                setJobseekers(jobseekerData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="grid lg:grid-cols-3 grid-cols-1 m-3">
            {jobseekers.map(singleJobseeker => (
                <div className="custom-shadow p-4 m-3 rounded-md" key={singleJobseeker._id}>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#287180] capitalize">{singleJobseeker.name}</h3>
                                <div className="">
                                    {/* <div className="flex gap-2 items-center">
                                        <MdOutlineEmail className="text-2xl pt-1" />
                                        {singleJobseeker?.email && <p>{singleJobseeker?.email}</p>}
                                        {!singleJobseeker?.email && <p>N/A</p>}
                                    </div> */}
                                    <div className="flex gap-2 items-center font-semibold">
                                        <SlLocationPin className="text-2xl pt-1" />
                                        {singleJobseeker?.location && <p>{singleJobseeker?.location}</p>}
                                        {!singleJobseeker?.location && <p>N/A</p>}
                                    </div>
                                </div>
                                <div className={`flex items-center gap-2 mt-5`}>
                                    <button className="border border-black py-1 px-2 rounded-md">Resume</button>
                                    <TbMessage2 className="border border-black text-4xl p-1 rounded-md" />
                                </div>
                            </div>
                            <label className="avatar w-40">
                                <div className="rounded-full border-2 border-white">
                                    <div>
                                        <img src={singleJobseeker?.photoURL} alt="User Photo" />
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className="pt-3">
                            <h4 className="font-semibold">About Me</h4>
                            <div className="">
                                {singleJobseeker?.about && <p className="first-letter:capitalize">{singleJobseeker?.about.substring(0, 120)}...<Link to={`/user/${singleJobseeker?.email}`} className="text-[#1d9cb5] font-semibold">
                                    <button className="">
                                        know more
                                    </button>
                                </Link></p>}
                                {!singleJobseeker?.about && <p>N/A</p>}
                            </div>
                        </div>
                </div>
            ))}
        </div>
    );
};

export default Alljobseekers;
