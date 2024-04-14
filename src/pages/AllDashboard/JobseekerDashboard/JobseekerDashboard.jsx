import { useContext, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AuthContext } from '../../../providers/AuthProviders';
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { MdWorkOutline, MdLogout } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs"
import Dashboard from './Components/Dashboard';
import AllJobs from '../SharedComponents/AllJobs';

const JobseekerDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    return (
        <div className="grid grid-cols-10">
            <div className="col-span-1 flex flex-col my-6 p-4 custom-shadow rounded-md">
                <TabList className="flex flex-col space-y-3">
                    <Tab
                        className={`font-semibold cursor-pointer flex gap-2 items-center ${activeTab === 0 ? 'text-[#1d9cb5]' : 'text-black'}`}
                        onClick={() => setActiveTab(0)}
                    >   
                        <AiOutlineHome className='text-xl'/>
                        <span>Dashboard</span>
                    </Tab>
                    <Tab
                        className={`font-semibold cursor-pointer flex gap-2 items-center ${activeTab === 1 ? 'text-[#1d9cb5]' : 'text-black'}`}
                        onClick={() => setActiveTab(1)}
                    >
                        <BiMessageDetail className='text-xl'/>
                        <span>Inbox</span>
                    </Tab>
                    <Tab
                        className={`font-semibold cursor-pointer flex gap-2 items-center ${activeTab === 2 ? 'text-[#1d9cb5]' : 'text-black'}`}
                        onClick={() => setActiveTab(2)}
                    >
                        <MdWorkOutline className='text-xl'/>
                        <span>All Jobs</span>
                    </Tab>
                    <Tab
                        className={`font-semibold cursor-pointer flex gap-2 items-center ${activeTab === 3 ? 'text-[#1d9cb5]' : 'text-black'}`}
                        onClick={() => setActiveTab(3)}
                    >
                        <BsPersonVcard className='text-xl'/>
                        <span>My Jobs</span>
                    </Tab>
                    <div onClick={handleLogOut} className='font-semibold cursor-pointer flex gap-2 items-center text-red-500'>
                        <MdLogout className='text-xl'/>
                        <span>Logout</span>
                    </div>
                </TabList>
            </div>
            <div className="col-span-9">
                <Tabs selectedIndex={activeTab}>
                    <TabPanel>
                        <Dashboard/>
                    </TabPanel>
                    <TabPanel>
                        <div>2</div>
                    </TabPanel>
                    <TabPanel>
                        <AllJobs/>
                    </TabPanel>
                    <TabPanel>
                        <div>4</div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default JobseekerDashboard;
