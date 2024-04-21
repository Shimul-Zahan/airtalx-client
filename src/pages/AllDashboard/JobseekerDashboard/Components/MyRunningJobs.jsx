import { useContext, useEffect, useState } from "react";
import { SlWallet } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProviders";
import axios from "axios";

const MyRunningJobs = () => {
  const { user } = useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]);
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/appliedJob/jobseeker/${user?.email}`
      );
      if (response.status === 200) {
        setAllJobs(response.data);
      } else {
        throw new Error("Failed to fetch applied jobs.");
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 m-3">
      {allJobs.map((singleJob) => (
        <div key={singleJob?.jobData?._id}>
          <div className="custom-shadow m-3 p-4 rounded-md">
            <div className="flex justify-between items-center pb-4">
              <div>
                <h3 className="text-2xl font-semibold">
                  {singleJob?.jobData?.jobTitle}
                </h3>
                <p>
                  by{" "}
                  <span className="text-[#1d9cb5] font-semibold cursor-pointer">
                    {singleJob?.jobData?.companyName}
                  </span>
                </p>
              </div>
              <p className="border border-black rounded-md font-semibold p-2">
                {singleJob?.jobData?.jobType}
              </p>
            </div>
            <div className="flex gap-2 items-center text-lg font-semibold">
              <SlWallet />
              <p>{singleJob?.jobData?.salary}</p>
            </div>
            <div>
              <p>
                {singleJob?.jobData?.jobDescription}...
                <Link
                  to={`/${singleJob?.jobData?._id}`}
                  className="text-[#1d9cb5]"
                >
                  know more
                </Link>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRunningJobs;
