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
  const { user } = useContext(AuthContext);
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

  return (
    <div className="grid grid-cols-3 m-3">
      {allJobs.map((singleJob) => (
        <div key={singleJob._id}>
          <div className="custom-shadow m-3 p-4 rounded-md">
            <div className="flex justify-between items-center pb-4">
              <div>
                <h3 className="text-2xl font-semibold">{singleJob.jobTitle}</h3>
                <p>
                  by{" "}
                  <span className="text-[#1d9cb5] font-semibold cursor-pointer">
                    {singleJob.companyName}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="border border-black rounded-md font-semibold p-3">
                  {singleJob.jobType}
                </p>
                <details className="dropdown">
                  <summary className="btn p-0 bg-white text-xl font-semibold border-black hover:border-black hover:bg-white rounded-md w-min">
                    <BsThreeDotsVertical />
                  </summary>
                  <ul className="p-2 custom-shadow menu dropdown-content z-[1] rounded-md bg-white w-fit">
                    <li className="flex">
                      <span>
                        <FaRegEdit className="bg-[#1d9cb5] text-white p-1 text-3xl rounded-md" />
                      </span>
                    </li>
                    <li onClick={() => handleDelete(_id)} className="flex">
                      <span>
                        <RiDeleteBin2Line className="bg-red-500 text-white p-1 text-3xl rounded-md" />
                      </span>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
            <div className="flex gap-2 items-center text-lg font-semibold">
              <SlWallet />
              <p>{singleJob.salary}</p>
            </div>
            <div>
              <p>
                {singleJob.jobDescription}...
                <Link to={`/${singleJob._id}`} className="text-[#1d9cb5]">
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

export default MyJobs;
