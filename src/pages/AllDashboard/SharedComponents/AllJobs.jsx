import { useEffect, useState } from "react";
import { SlWallet } from "react-icons/sl";
import { Link } from "react-router-dom";

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    const url = "http://localhost:5000/newJobPost";
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
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 m-3">
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
              <p className="border border-black rounded-md font-semibold p-2">
                {singleJob.jobType}
              </p>
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

export default AllJobs;
