import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProviders";
import { RiDeleteBin6Line } from "react-icons/ri";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="p-6">
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-7">
                <div className="flex justify-between custom-shadow p-4 rounded-md mb-7">
                    <div className="">
                        <h4 className="text-2xl font-semibold">Hello {user?.name}</h4>
                        <p>{"Here's what's going on"}</p>
                    </div>
                    {/* <div className="flex items-center border border-gray-300 rounded-md">
                    <IoSearchOutline className="text-3xl p-1 text-gray-400" />
                    <input className="p-2" placeholder="Search" type="text" />
                </div> */}
                </div>
                <div className="flex justify-between items-center custom-shadow p-4 rounded-md mb-7">
                    <h4 className="text-2xl font-semibold">Total Staff: 13</h4>
                </div>
                <div className="flex justify-between items-center custom-shadow p-4 rounded-md mb-7">
                    <h4 className="text-2xl font-semibold">Total Job Posted: 4</h4>
                </div>
            </div>
            <div className="custom-shadow p-4 rounded-md">
                <div className="flex justify-between">
                    <h4 className="text-2xl font-semibold">Staff Pannel</h4>
                    <p>view all</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold text-base">
                                <th>No.</th>
                                <th>Staff Name</th>
                                <th>Job Title</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td className="text-red-700 text-2xl"><RiDeleteBin6Line /></td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td className="text-red-700 text-2xl"><RiDeleteBin6Line /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;