import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { MdOutlineDeleteForever, MdOutlineEmail, MdWorkOutline } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import { message, Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser, logOut } = useContext(AuthContext);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  console.log(user)

  const handleDeleteAccount = () => {
    axios
      .delete(`http://localhost:5000/user/delete/${user?.email}`)
      .then((response) => {
        const { data } = response;
        console.log("🚀 ~ .then ~ response:", response);
        if (data.message) {
          message.success("Profile deleted successfully");
          logOut();
        } else {
          message.error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        message.error("An error occurred while deleting user");
      });
  };

  const normFile = (e) => {
    setFileList(e.fileList);
    // console.log(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    multiple: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => {
      return false;
    },
    fileList,
  };

  const upload1 = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`http://localhost:5000/resume/upload/${user?.email}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.user) {
          message.success("Resume Uploaded Successfully!");
          setUser(res.data.user);
          localStorage.setItem("access-token", res.data.token);
          setFile(null);
        } else {
          message.error(res.data.message || "Failed to update profile");
        }
      })
      .catch((error) => {
        console.error("Error uploading Resume:", error);
      });
  };

  const downloadFile1 = async () => {
    await axios({
      url: `http://localhost:5000/download/resume/${user?.resume}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        if (response.data.size > 0) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${user?.name}_resume.pdf`);
          message.success("Resume Downloaded!");
          setFile(null);
          document.body.appendChild(link);
          link.click();
        } else {
          message.warning("File not converted yet");
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
        <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-8 gap-7">
          <div className="custom-shadow p-4 lg:col-span-2 rounded-md relative">
            <div className="flex justify-center">
              <label className="avatar w-48">
                <div className="rounded-full border-2 border-white">
                  <div>
                    <img src={user?.photoURL} alt="User Photo" />
                  </div>
                </div>
              </label>
            </div>
            <div className="text-lg lg:absolute bottom-0 mx-auto w-[90%] text-center capitalize">
              <p>Member Since: </p>
              <p className="custom-shadow p-1 mb-4 capitalize">{user?.role}</p>
            </div>
          </div>
          <div className="custom-shadow rounded-md p-4 lg:col-span-7">
            <div>
              <div className="flex justify-between item">
                <div>
                  <h3 className="font-semibold text-4xl pb-5 capitalize">
                    {user?.name}
                  </h3>
                </div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    {user.role === "jobseeker" && (
                      <>
                        <button
                          className="border border-black py-2 px-3 rounded-md text-xl"
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        >
                          Resume Upload
                        </button>
                        <dialog
                          id="my_modal_5"
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-lg mb-5 text-center">
                              Uplaod Resume!
                            </h3>
                            <div className="flex justify-center gap-3">
                              <input
                                type="file"
                                className="file-input file-input-primary "
                                onChange={(e) => setFile(e.target.files[0])}
                              />
                              <button
                                type="button"
                                className="btn btn-primary btn-outline font-bold"
                                onClick={upload1}
                              >
                                Upload
                              </button>
                            </div>
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn btn-error text-white">
                                  Close
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                        <button className="border border-black py-2 px-3 rounded-md text-xl">
                          <IoMdDownload
                            className={`${user?.resume ? "" : "disabled"}`}
                            size="1.5em"
                            style={{
                              cursor: user?.resume ? "pointer" : "not-allowed",
                            }}
                            onClick={user?.resume ? downloadFile1 : null}
                          />
                        </button>
                      </>
                    )}

                    <Link to={'/updateProfile'}>
                      <FaRegEdit className="text-5xl p-2 cursor-pointer rounded-md border border-black right-0" />
                    </Link>
                  </div>
                </div>
                {/* <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    
                  </div>
                </dialog> */}
              </div>
              <div className="flex gap-2 items-center pb-2">
                <MdOutlineEmail className="text-3xl border border-black rounded-full p-1" />
                <p>{user?.email}</p>
              </div>
              <div className="flex gap-2 items-center capitalize pb-2">
                <SlLocationPin className="text-3xl border border-black rounded-full p-1" />
                {user?.location && <p>{user?.location}</p>}
                {!user?.location && <p>N/A</p>}
              </div>
              <div className="flex gap-2 items-center capitalize pb-2">
                <LuGraduationCap className="text-3xl border border-black rounded-full p-1" />
                {user?.studies && <p>{user?.studies}</p>}
                {!user?.studies && <p>N/A</p>}
              </div>
              <div className="flex gap-2 items-center capitalize pb-2">
                <MdWorkOutline className="text-3xl border border-black rounded-full p-1" />
                {user?.jobCompanyName && <p>{user?.jobCompanyName}</p>}
                {!user?.jobCompanyName && <p>N/A</p>}
              </div>
            </div>
            <div className="pt-5">
              <div className="flex items-center gap-2 first-letter:capitalize">
                <span className="font-semibold">Preferred Salary:</span> {user?.preferredSalary && <p>{user?.preferredSalary}/hr</p>}
                {!user?.preferredSalary && <p>N/A</p>}
              </div>
              <div className="flex items-center gap-2 capitalize">
                <span className="font-semibold">Skill Level:</span> {user?.expertiseLevel && <p>{user?.expertiseLevel}</p>}
                {!user?.expertiseLevel && <p>N/A</p>}
              </div>
              <div className="flex items-center gap-2 capitalize">
                <span className="font-semibold">Preferred Employment:</span> {user?.preferredJobType && <p>{user?.preferredJobType}</p>}
                {!user?.preferredJobType && <p>N/A</p>}
              </div>
            </div>
          </div>
          <div className="custom-shadow lg:col-span-9 rounded-md p-3">
            <div className="pb-6">
              <h4 className="font-semibold pb-2">Expertise field</h4>
              <div>
                <span>
                  {user?.expertiseField && <span className="border border-black capitalize px-2 py-1 mr-3 rounded-full text-base">{user?.expertiseField}</span>}
                  {!user?.expertiseField && <p>N/A</p>}
                </span>
                {/* <span className="border border-black px-2 py-1 mr-3 rounded-full text-base">Graphic Designer</span>
                <span className="border border-black px-2 py-1 mr-3 rounded-full text-base">Graphic Designer</span>
                <span className="border border-black px-2 py-1 mr-3 rounded-full text-base">Graphic Designer</span> */}
              </div>
            </div>
            <h4 className="font-semibold pt-6">About Me</h4>
            {user?.about && (
              <p className="first-letter:capitalize">{user?.about}</p>
            )}
            {!user?.about && <p>N/A</p>}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="btn btn-error text-white font-bold"
            onClick={handleDeleteAccount}
          >
            Delete Account <MdOutlineDeleteForever size="2em" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
