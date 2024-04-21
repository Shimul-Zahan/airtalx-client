import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
    const jobDescription = useParams();
    const [jobData, setJobData] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:5000/newJobPost';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const jobData = data.find(job => job._id === jobDescription._id);
                setJobData(jobData);
                console.log(jobData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div className="lg:w-3/4 w-11/12 mx-auto">
            <div className="flex justify-between">
                <div className="pt-20">
                    <h3 className="text-4xl font-semibold lg:w-3/4 pb-2">{jobData?.headline}</h3>
                    <div>
                        <span>by</span>
                        <span className="text-[#1d9cb5] font-semibold pl-1">{jobData?.companyName}</span>
                    </div>
                    <div>
                        <button className="bg-[#1d9cb5] text-white text-xl rounded mt-3 px-6 py-1">Apply</button>
                    </div>
                </div>
                <div className="w-1/4">
                    <img src="job-details-img.svg" alt="" />
                </div>
            </div>
            <div className="pb-12">
                <h4 className="text-5xl font-semibold text-center pb-6">Job Details</h4>
                <div className="flex justify-center gap-10">
                    <div className="text-center custom-shadow p-10 rounded-md w-96">
                        <p>JOB TITLE</p>
                        <h4 className="text-2xl font-semibold capitalize">{jobData?.jobTitle}</h4>
                    </div>
                    <div className="text-center custom-shadow p-10 rounded-md w-96">
                        <p>JOB RATE PER HOUR</p>
                        <h4 className="text-2xl font-semibold">{jobData?.salary}</h4>
                    </div>
                    <div className="text-center custom-shadow p-10 rounded-md w-96">
                        <p>EMPLOYMENT</p>
                        <h4 className="text-2xl font-semibold capitalize">{jobData?.jobType}</h4>
                    </div>
                </div>
            </div>
            <div className="pb-12">
                <h4 className="text-5xl font-semibold text-center pt-8 pb-6">Job Description</h4>
                <p>{jobData?.jobDescription}</p>
            </div>
        </div>
    );
};

export default JobDetails;