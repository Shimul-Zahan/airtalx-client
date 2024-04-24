import { useEffect, useState } from "react";
import { SlWallet } from "react-icons/sl";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allJobsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState("");
  const [typeSelect, seTypeSelect] = useState("");

  // Function to fetch filtered job data
  const fetchFilteredJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/filterJob", {
        params: {
          searchValue: searchValue,
          typeSelect: typeSelect,
        },
      });
      setAllJobs(response.data);
    } catch (error) {
      console.error("Error fetching filtered job data:", error);
    }
  };

  useEffect(() => {
    const url = "http://localhost:5000/newJobPost";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllJobs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Call the function to fetch filtered job data
    fetchFilteredJobs();
  }, [searchValue, typeSelect]);
  // Logic for pagination
  const indexOfLastFlat = currentPage * allJobsPerPage;
  const indexOfFirstFlat = indexOfLastFlat - allJobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstFlat, indexOfLastFlat);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleTypeSelect = (e) => {
    seTypeSelect(e.target.value);
  };
  return (
    <>
      {/* search functionality */}
      <div className="flex items-center gap-2 justify-center">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <IoMdSearch size="1.5em" />
        </label>
        <select
          className="select select-bordered w-full max-w-xs font-semibold"
          value={typeSelect}
          onChange={handleTypeSelect}
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="Job">Job</option>
          <option value="Employer">Employer</option>
        </select>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 m-3">
        {currentJobs.map((singleJob) => (
          <div key={singleJob._id}>
            <div className="custom-shadow m-3 p-4 rounded-md">
              <div className="flex justify-between items-center pb-4">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {singleJob.jobTitle}
                  </h3>
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
                  {singleJob.jobDescription.substring(0, 40)}...
                  <Link to={`/${singleJob._id}`} className="text-[#1d9cb5]">
                    know more
                  </Link>
                </p>
              </div>
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
          { length: Math.ceil(allJobs.length / allJobsPerPage) },
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
          disabled={currentPage === Math.ceil(allJobs.length / allJobsPerPage)}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

export default AllJobs;
