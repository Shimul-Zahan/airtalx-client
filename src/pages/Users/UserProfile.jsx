import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuGraduationCap } from "react-icons/lu";
import { MdDownload, MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { TbMessage2 } from "react-icons/tb";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [allUsers, setAllUsers] = useState([]);
  const userDescription = useParams();

  useEffect(() => {
    const url = "http://localhost:5000/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const userData = data.find(
          (users) => users.email === userDescription.email
        );
        setAllUsers(userData);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const downloadFile1 = async () => {
    await axios({
      url: `http://localhost:5000/download/resume/${allUsers?.resume}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        if (response.data.size > 0) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${allUsers?.name}_resume.pdf`);
          message.success("Resume Downloaded!");
          document.body.appendChild(link);
          link.click();
        } else {
          message.warning("Resume not uploaded yet");
        }
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        message.error("Failed to download file");
      });
  };

  return (
    <div className="lg:w-3/4 w-11/12 mx-auto my-12">
      <div>
        <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-8 gap-y-7">
          <div className="custom-shadow p-4 col-span-2 rounded-md relative">
            <div className="flex justify-center">
              <label className="avatar w-40">
                <div className="rounded-full border-2 border-white">
                  <div>
                    <img src={allUsers?.photoURL} alt="User Photo" />
                  </div>
                </div>
              </label>
            </div>
            <p className="text-xl lg:absolute bottom-0 mx-auto w-11/12 custom-shadow text-center p-1 my-4 capitalize">
              {allUsers?.role}
            </p>
          </div>
          <div className="custom-shadow rounded-md p-4 col-span-7">
            <div>
              <div className="flex justify-between item relative">
                <h3 className="font-semibold text-3xl pb-2 capitalize">
                  {allUsers?.name}
                </h3>
                <div className="flex gap-2">
                  <button className="border-2 border-black p-2 rounded-md">
                    <TbMessage2 size="1.5em" />
                  </button>

                  <div>
                    <button
                      className="border-2 border-black p-2 rounded-md"
                      onClick={allUsers?.resume ? downloadFile1 : null}
                    >
                      <span className="flex items-center font-semibold text-lg">
                        Resume <MdDownload size="1.5em" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineEmail className="text-2xl pt-1" />
                <p>{allUsers?.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                <LuGraduationCap className="text-2xl pt-1" />
                {allUsers?.studies && <p>{allUsers?.studies}</p>}
                {!allUsers?.studies && <p>N/A</p>}
              </div>
              <div className="flex gap-2 items-center">
                <SlLocationPin className="text-2xl pt-1" />
                {allUsers?.location && <p>{allUsers?.location}</p>}
                {!allUsers?.location && <p>N/A</p>}
              </div>
            </div>
            <h4 className="font-semibold pt-6">Bio</h4>
            {allUsers?.about && <p>{allUsers?.about}</p>}
            {!allUsers?.about && <p>N/A</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
