import { AuthContext } from "../../../../providers/AuthProviders";
import { useContext } from "react";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    console.log("🚀 ~ Dashboard ~ user:", user)
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
                    <h4 className="text-2xl font-semibold">Running Jobs: 3</h4>
                </div>
                <div className="flex justify-between items-center custom-shadow p-4 rounded-md mb-7">
                    <h4 className="text-2xl font-semibold">Total completed jobs: 14</h4>
                </div>
            </div>
            <div className="custom-shadow p-4 rounded-md">
                <div className="flex justify-between">
                    <h4 className="text-2xl font-semibold">My Job Applications</h4>
                    <p>view all</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold text-base">
                                <th>No.</th>
                                <th>Job Title</th>
                                <th>Applied role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;