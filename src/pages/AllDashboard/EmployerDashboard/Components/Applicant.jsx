import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProviders";
import { RiDeleteBin6Line } from "react-icons/ri";
import { message } from "antd";

const Applicant = () => {
  const { user } = useContext(AuthContext);
  const [pendingJob, setPendingJob] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/job/employe/pending/${user?.email}`
      );
      if (response.status === 200) {
        setPendingJob(response.data);
      } else {
        console.error("Failed to fetch staff data");
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const handleMakeApproved = (email, jobId) => {
    axios
      .patch(`http://localhost:5000/appliedJob/updateStatus/${email}`, {
        jobId: jobId,
        status: "approved",
      })
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response)
        if (response.status === 200) {
          message.success(response.data.message);
          fetchData();
        } else {
          message.error("Failed to approve application");
        }
      })
      .catch((error) => {
        console.error("Error updating application status:", error);
        message.error("Failed to approve application");
      });
  };
  const handleMakeReject = (email, jobId) => {
    axios.patch(`http://localhost:5000/appliedJob/updateStatus/${email}`, {
      jobId: jobId,
      status: "rejected",
    })
      .then((response) => {
        if (response.status === 200) {
            message.error("Job application Rejected!");
          fetchData();
        } else {
          message.error("Failed to reject application");
        }
      })
      .catch((error) => {
        console.error("Error updating application status:", error);
        message.error("Failed to reject application");
      });
  };

  useEffect(() => {
    fetchData();
  }, [pendingJob]);

  const getBadgeClass = (role) => {
    switch (role) {
      case "approved":
        return "badge-accent";
      case "pending":
        return "badge-warning";
      default:
        return "";
    }
  };
  return (
    <div className="p-6">
      <div className="custom-shadow p-4 rounded-md">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Staff Pannel</h4>
          <p>view all</p>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>No.</th>
                <th>Staff Email</th>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {pendingJob.map((job, index) => (
                <tr key={job?.jobData?._id}>
                  <td>{index + 1}</td>
                  <td>{job?.userEmail}</td>
                  <td>{job?.jobData?.jobTitle}</td>
                  <td>{job?.jobData?.jobType}</td>
                  <td>{job?.jobData?.salary}</td>
                  <td>
                    <div
                      className={`badge ${getBadgeClass(
                        job?.status
                      )} badge-md text-white`}
                    >
                      {job?.status}
                    </div>
                  </td>
                  <td>
                    <Link to={`/${job?.jobId}`} className="text-[#1d9cb5]">
                      <button className="btn btn-warning btn-md text-white">
                        Details
                      </button>
                    </Link>
                  </td>
                  <td>
                    <div className="flex  justify-center">
                      <div className="text-red-700 text-xl cursor-pointer"></div>
                      <div className=" flex flex-col gap-2">
                        <button
                          className="btn btn-success btn-sm text-white w-32"
                          onClick={() => handleMakeApproved(job.userEmail, job.jobId)}
                        >
                          Approved
                        </button>
                        <button
                          className="btn btn-error btn-sm text-white w-32"
                          onClick={() => handleMakeReject(job.userEmail, job.jobId)}
                        >
                          Rejected
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applicant;