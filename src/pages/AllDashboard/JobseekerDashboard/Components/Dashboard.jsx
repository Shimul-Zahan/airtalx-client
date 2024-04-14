import { IoSearchOutline } from "react-icons/io5";

const Dashboard = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between custom-shadow p-4 rounded-md mb-7">
                <div className="">
                    <h4 className="text-2xl font-semibold">Hello {'{user}'}</h4>
                    <p>{"Here's what's going on"}</p>
                </div>
                <div className="flex items-center border border-gray-300 rounded-md">
                    <IoSearchOutline className="text-3xl p-1 text-gray-400" />
                    <input className="p-2" placeholder="Search" type="text" />
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
                                <th>Applied role</th>
                                <th>Applied date</th>
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
            <div className="custom-shadow p-4 rounded-md mt-7">
                <div className="flex justify-between">
                    <h4 className="text-2xl font-semibold">Job Offers</h4>
                    <p>view all</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="font-semibold text-base">
                                <th>No.</th>
                                <th>Company Name</th>
                                <th>Job Position</th>
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