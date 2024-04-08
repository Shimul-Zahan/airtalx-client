import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { SlWallet } from "react-icons/sl";

const MyJobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const url = `http://localhost:5000/myJobPosts?email=${user.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllJobs(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div className="grid grid-cols-3 m-3">
        {
            allJobs.map(singleJob => <div key={singleJob._id}>
                <div className="custom-shadow m-3 p-4 rounded-md">
                    <div className="flex justify-between items-center pb-4">
                        <div>
                            <h3 className="text-2xl font-semibold">{singleJob.jobTitle}</h3>
                            <p>by <span className="text-[#1d9cb5] font-semibold cursor-pointer">{singleJob.companyName}</span></p>
                        </div>
                        <p className="border border-black rounded-md font-semibold p-2">{singleJob.jobType}</p>
                    </div>
                    <div className="flex gap-2 items-center text-lg font-semibold">
                        <SlWallet />
                        <p>{singleJob.salary}</p>
                    </div>
                    <div>
                        <p>{singleJob.jobDescription}</p>
                    </div>
                </div>
            </div>)
        }
    </div>
    );
};

export default MyJobs;