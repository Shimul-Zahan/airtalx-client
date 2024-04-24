import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { MdOutlineEmail } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import { message } from "antd";
import { TbMessage2 } from "react-icons/tb";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  // console.log("🚀 ~ Profile ~ user:", user)

  const updateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const location = form.location.value;
    const studies = form.study.value;
    const photoURL = form.photoURL.value;
    const about = form.about.value;
    const password = form.newPassword.value;
    const updatedProfile = {
      name,
      location,
      studies,
      photoURL,
      about,
      password,
    };

    fetch(`http://localhost:5000/update/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data)

        if (data) {
          message.success("Profile Updated!");
          setUser(data.user)
          localStorage.setItem("access-token", data.token)
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="lg:w-3/4 w-11/12 mx-auto my-12">
      <div>
        <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-8 gap-y-7">
          <div className="custom-shadow p-4 col-span-2 rounded-md relative">
            <div className="flex justify-center">
              <div className="w-40 h-40 relative">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
            </div>
            <p className="text-xl lg:absolute bottom-0 mx-auto w-11/12 custom-shadow text-center p-1 my-4 capitalize">
              {user?.role}
            </p>
          </div>
          <div className="custom-shadow rounded-md p-4 col-span-7">
            <div>
              <div className="flex justify-between item">
                <h3 className="font-semibold text-3xl pb-2 capitalize">{user?.name}</h3>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <button className="border border-black py-1 px-2 rounded-md">Resume</button>
                    <FaRegEdit className="text-4xl p-1 cursor-pointer rounded-md border border-black right-0" onClick={() => document.getElementById("my_modal_3").showModal()} />
                  </div>
                </div>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <div className="mx-auto w-11/12 mb-4">
                      <h2 className="text-4xl text-center font-semibold mb-3">
                        Update Your Profile
                      </h2>
                      <form onSubmit={updateProfile}>
                        <div className="pb-4">
                          <label htmlFor="email">User Name</label>
                          <br />
                          <input
                            className="bg-[#f5f5f5] p-2 border-slate-300 border w-full capitalize"
                            type="text"
                            name="name"
                            placeholder={user?.name}
                          />
                        </div>

                        <div className="pb-4">
                          <label htmlFor="email">Location</label>
                          <br />
                          <input
                            className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                            type="text"
                            name="location"
                            id=""
                            placeholder={user?.location}
                          />
                        </div>
                        <div className="pb-4">
                          <label htmlFor="email">Education</label>
                          <br />
                          <input
                            className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                            type="text"
                            name="study"
                            placeholder={user?.studies}
                            id=""
                          />
                        </div>
                        <div className="pb-4">
                          <label htmlFor="email">Profile Photo</label>
                          <br />
                          <input
                            className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                            type="file"
                            name="photoURL"
                            id=""
                          />
                        </div>

                        <div className="pb-4">
                          <label htmlFor="email">Bio</label>
                          <br />
                          <textarea
                            className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                            name="about"
                            id=""
                            cols="30"
                            placeholder={user?.about}
                            rows="5"
                          ></textarea>
                        </div>
                        <div className="pb-4">
                          <label htmlFor="email">New Password</label>
                          <br />
                          <input
                            className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                            type="password"
                            name="password"
                            id=""
                          />
                        </div>
                        <div className="pb-4">
                          <label htmlFor="email">Confirm New Password</label>
                          <br />
                          <input
                            className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                            type="password"
                            name="newPassword"
                            id=""
                          />
                        </div>
                        <button className="w-full bg-[#287180] text-white font-semibold p-2 mt-4 mb-3">
                          Update
                        </button>
                        <br />
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineEmail className="text-2xl pt-1" />
                <p>{user?.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                <LuGraduationCap className="text-2xl pt-1" />
                {user?.studies && <p>{user?.studies}</p>}
                {!user?.studies && <p>N/A</p>}
              </div>
              <div className="flex gap-2 items-center">
                <SlLocationPin className="text-2xl pt-1" />
                {user?.location && <p>{user?.location}</p>}
                {!user?.location && <p>N/A</p>}
              </div>
            </div>
            <h4 className="font-semibold pt-6">About Me</h4>
            {user?.about && <p>{user?.about}</p>}
            {!user?.about && <p>N/A</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
