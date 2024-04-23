import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProviders";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [approveJob, setApproveJob] = useState([]);
  const [jobPost, setJobPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ApproveJobsPerPage] = useState(6);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/job/employe/${user?.email}`
      );
      if (response.status === 200) {
        setApproveJob(response.data);
      } else {
        console.error("Failed to fetch staff data");
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const fetchJobPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/jobPost/employe/${user?.email}`
      );
      if (response.status === 200) {
        setJobPost(response.data);
      } else {
        console.error("Failed to fetch job posts");
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  const handleDeleteBtn = (email) => {
    axios
      .delete(`http://localhost:5000/user/delete/${email}`)
      .then((response) => {
        const { data } = response;
        console.log("🚀 ~ .then ~ response:", response);
        if (data.message) {
          message.success("User deleted successfully");
          fetchData();
          fetchJobPostData();
        } else {
          message.error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        message.error("An error occurred while deleting user");
      });
  };

  useEffect(() => {
    fetchData();
    fetchJobPostData();
  }, []);

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

  // Logic for pagination
  const indexOfLastFlat = currentPage * ApproveJobsPerPage;
  const indexOfFirstFlat = indexOfLastFlat - ApproveJobsPerPage;
  const currentJobs = approveJob.slice(indexOfFirstFlat, indexOfLastFlat);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            Total Staff: {approveJob.length}
          </h4>
        </div>
        <div className="flex justify-between items-center custom-shadow p-4 rounded-md mb-7">
          <h4 className="text-2xl font-semibold">
            Total Job Posted: {jobPost.length}
          </h4>
        </div>
      </div>
      <div className="custom-shadow p-4 rounded-md">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Staff Pannel</h4>
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
              {currentJobs.map((job, index) => (
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
                    <button
                      className="btn btn-error btn-md text-white"
                      onClick={() => handleDeleteBtn(user.email)}
                    >
                      <RiDeleteBin6Line size="1.2em" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* for pagination */}
        <div className=" flex flex-wrap justify-center mb-10 mt-5">
          <button
            className="join-item btn btn-outline mr-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &larr; Previous page
          </button>
          {Array.from(
            { length: Math.ceil(approveJob.length / ApproveJobsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`join-item btn btn-outline mr-2 ${
                  currentPage === i + 1 ? "bg-green-400 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            className="join-item btn btn-outline mr-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(approveJob.length / ApproveJobsPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
