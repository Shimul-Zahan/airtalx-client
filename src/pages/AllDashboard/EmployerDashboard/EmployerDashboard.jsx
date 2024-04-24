import { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AuthContext } from "../../../providers/AuthProviders";
import { AiOutlineHome, AiOutlineProfile } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { MdWorkOutline, MdLogout } from "react-icons/md";
import { BsFilePerson, BsPersonVcard } from "react-icons/bs";
import Dashboard from "./Components/Dashboard";
import PostJob from "./Components/PostJob";
import AllJobs from "../SharedComponents/AllJobs";
import MyJobs from "./Components/MyJobs";
import Applicant from "./Components/Applicant";
import History from "./Components/History";
import { FaHistory } from "react-icons/fa";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-1 flex flex-col my-6 p-4 custom-shadow rounded-md">
        <TabList className="flex flex-col space-y-3">
          <Tab
            className={`font-semibold cursor-pointer flex gap-2 items-center ${
              activeTab === 0 ? "text-[#1d9cb5]" : "text-black"
            }`}
            onClick={() => setActiveTab(0)}
          >
            <AiOutlineHome className="text-xl" />
            <span>Dashboard</span>
          </Tab>
          <Tab
            className={`font-semibold cursor-pointer flex gap-2 items-center ${
              activeTab === 1 ? "text-[#1d9cb5]" : "text-black"
            }`}
            onClick={() => setActiveTab(1)}
          >
            <BiMessageDetail className="text-xl" />
            <span>Inbox</span>
          </Tab>
          <Tab
            className={`font-semibold cursor-pointer flex gap-2 items-center ${
              activeTab === 2 ? "text-[#1d9cb5]" : "text-black"
            }`}
            onClick={() => setActiveTab(2)}
          >
            <AiOutlineProfile className="text-xl" />
            <span>Post a Job</span>
          </Tab>
          <Tab
            className={`font-semibold cursor-pointer flex gap-2 items-center ${
              activeTab === 3 ? "text-[#1d9cb5]" : "text-black"
            }`}
            onClick={() => setActiveTab(3)}
          >
            <BsFilePerson className="text-xl" />
            <span>Applicant</span>
          </Tab>
          <Tab
            className={`font-semibold cursor-pointer flex gap-2 items-center ${
              activeTab === 4 ? "text-[#1d9cb5]" : "text-black"
            }`}
            onClick={() => setActiveTab(4)}
          >
            <FaHistory className="text-xl" />
            <span>History</span>
          </Tab>
          <Tab
            className={`font-semibold cursor-pointer flex gap-2 items-center ${
              activeTab === 5 ? "text-[#1d9cb5]" : "text-black"
            }`}
            onClick={() => setActiveTab(5)}
          >
            <MdWorkOutline className="text-xl" />
            <span>All Jobs</span>
          </Tab>
          <Tab
            className={`font-semibold cursor-pointer flex gap-2 items-center ${
              activeTab === 6 ? "text-[#1d9cb5]" : "text-black"
            }`}
            onClick={() => setActiveTab(6)}
          >
            <BsPersonVcard className="text-xl" />
            <span>My Jobs</span>
          </Tab>
          <div
            onClick={handleLogOut}
            className="font-semibold cursor-pointer flex gap-2 items-center text-red-500"
          >
            <MdLogout className="text-xl" />
            <span>Logout</span>
          </div>
        </TabList>
      </div>
      <div className="col-span-9">
        <Tabs selectedIndex={activeTab}>
          <TabPanel>
            <Dashboard />
          </TabPanel>
          <TabPanel>
            <div>2</div>
          </TabPanel>
          <TabPanel>
            <PostJob />
          </TabPanel>
          <TabPanel>
            <Applicant />
          </TabPanel>
          <TabPanel>
            <History />
          </TabPanel>
          <TabPanel>
            <AllJobs />
          </TabPanel>
          <TabPanel>
            <MyJobs />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;
