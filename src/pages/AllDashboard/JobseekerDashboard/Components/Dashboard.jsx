import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProviders";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
    <div className="p-6">
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-7">
        <div className="flex justify-between custom-shadow p-4 rounded-md mb-7">
          <div className="">
            <h4 className="text-2xl font-semibold">Hello {user?.name}</h4>
            <p>{"Here's what's going on"}</p>
          </div>
        </div>
        <div className="flex justify-between items-center custom-shadow p-4 rounded-md mb-7">
          <h4 className="text-2xl font-semibold">
            Running Jobs: {allJobs.length}
          </h4>
        </div>
        <div className="flex justify-between items-center custom-shadow p-4 rounded-md mb-7">
          <h4 className="text-2xl font-semibold">Total completed jobs: 0</h4>
        </div>
      </div>
      <div className="custom-shadow p-4 rounded-md">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">My Job Applications</h4>
          {/* <p>view all</p> */}
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="font-semibold text-base">
                <th>No.</th>
                <th>Owner</th>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Salary</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {allJobs.map((job, index) => (
                <tr key={job?.jobData?._id}>
                  <td>{index + 1}</td>
                  <td>{job?.jobData?.companyName}</td>
                  <td>{job?.jobData?.jobTitle}</td>
                  <td>{job?.jobData?.jobType}</td>
                  <td>{job?.jobData?.salary}</td>
                  <td><Link
                  to={`/${job?.jobData?._id}`}
                  className="text-[#1d9cb5]"
                >
                  <button className="btn btn-warning btn-md">Details</button>
                </Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
