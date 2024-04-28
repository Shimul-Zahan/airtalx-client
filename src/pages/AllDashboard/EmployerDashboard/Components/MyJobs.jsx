import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProviders";
import { SlWallet } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyJobs = (_id) => {
  const [allJobs, setAllJobs] = useState([]);
  console.log("🚀 ~ MyJobs ~ allJobs:", allJobs)
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPostJobsPerPage] = useState(6);
  useEffect(() => {
    const url = `http://localhost:5000/myJobPosts?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllJobs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/myJobPosts/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const remaining = allJobs.filter((myJob) => myJob._id !== _id);
              setAllJobs(remaining);
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // Logic for pagination
  const indexOfLastFlat = currentPage * allPostJobsPerPage;
  const indexOfFirstFlat = indexOfLastFlat - allPostJobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstFlat, indexOfLastFlat);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="grid grid-cols-3 m-3">
        {currentJobs.map((singleJob) => (
          <div className="custom-shadow m-3 p-4 rounded-md" key={singleJob._id}>
            <div className="flex justify-between pb-4">
              <div>
                <h3 className="text-2xl font-semibold">
                  {singleJob.jobTitle}
                </h3>
                <p className="mb-3 text-base font-semibold">{singleJob.jobPostDate}</p>
                <p>
                  by{" "}
                  <Link to={`/user/${singleJob.email}`}>
                    <span className="text-[#1d9cb5] capitalize font-semibold cursor-pointer">
                      {singleJob.companyName}
                    </span>
                  </Link>
                </p>
              </div>
              <div className="">
                <p className="border border-black rounded-md font-semibold p-3">
                  {singleJob.jobType}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center pb-2 text-lg font-semibold">
              <SlWallet />
              <p>${singleJob.startingSalary}/hr</p> -
              <p>${singleJob.endingSalary}/hr</p>
            </div>
            <div>
              <p className="first-letter:capitalize">
                {singleJob.jobDescription.substring(0, 120)}...
                <Link to={`/jobdetails/${singleJob._id}`} className="text-[#1d9cb5]">
                  know more
                </Link>
              </p>
            </div>
          </div>
        ))}
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
          { length: Math.ceil(allJobs.length / allPostJobsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`join-item btn btn-outline mr-2 ${currentPage === i + 1 ? "bg-green-400 text-white" : ""
                }`}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          className="join-item btn btn-outline mr-2"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(allJobs.length / allPostJobsPerPage)}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

export default MyJobs;
