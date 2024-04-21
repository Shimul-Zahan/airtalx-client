import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { MdOutlineEmail } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const url = `http://localhost:5000/users?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="lg:w-3/4 w-11/12 mx-auto my-12">
      {userData.map((myProfile) => (
        <div key={myProfile._id}>
          <div className="grid grid-cols-9 gap-8">
            <div className="custom-shadow p-4 col-span-2 rounded-md">
              <div className="flex justify-center">
                <div className="w-36 h-36 relative">
                  <img
                    className="rounded-full w-full h-full object-cover"
                    src={myProfile.photoURL}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <p className="text-xl custom-shadow text-center p-1 my-4 capitalize">
                  {myProfile.role}
                </p>
                <div className="flex justify-between item relative">
                  <h3 className="font-semibold text-3xl pb-2 capitalize">
                    {myProfile.name}
                  </h3>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn bg-transparent border-0 hover:bg-transparent hover:border-0"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <FaRegEdit className="text-3xl pt-1 absolute right-0" />
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div className="mx-auto w-11/12 mb-4">
                        <h2 className="text-4xl text-center font-semibold mb-3">
                          Update Your Profile
                        </h2>
                        <form>
                          <div className="pb-4">
                            <label htmlFor="email">User Name</label>
                            <br />
                            <input
                              className="bg-[#f5f5f5] p-2 border-slate-300 border w-full capitalize"
                              value={myProfile.name}
                              type="text"
                              name="name"
                              id=""
                              required
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
                              required
                            />
                          </div>
                          <div className="pb-4">
                            <label htmlFor="email">Education</label>
                            <br />
                            <input
                              className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                              type="text"
                              name="education"
                              id=""
                              required
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
                              required
                            />
                          </div>

                          <div className="pb-4">
                            <label htmlFor="email">Bio</label>
                            <br />
                            <textarea
                              className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                              name="bio"
                              id=""
                              cols="30"
                              rows="5"
                            ></textarea>
                          </div>
                          <div className="pb-4">
                            <label htmlFor="email">Current Password</label>
                            <br />
                            <input
                              className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                              type="password"
                              id=""
                              required
                            />
                          </div>
                          <div className="pb-4">
                            <label htmlFor="email">New Password</label>
                            <br />
                            <input
                              className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                              type="password"
                              name="password"
                              id=""
                              required
                            />
                          </div>
                          <div className="pb-4">
                            <label htmlFor="email">Confirm New Password</label>
                            <br />
                            <input
                              className="bg-[#f5f5f5] p-2 border-slate-300 border w-full"
                              type="password"
                              id=""
                              required
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
                  <p>{myProfile.email}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <LuGraduationCap className="text-2xl pt-1" />
                  <p>name of education institute</p>
                </div>
                <div className="flex gap-2 items-center">
                  <SlLocationPin className="text-2xl pt-1" />
                  <p>location</p>
                </div>
              </div>
            </div>
            <div className="custom-shadow rounded-md p-4 col-span-7">
              <h4 className="font-semibold text-2xl">Bio</h4>
              <p>about me</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
