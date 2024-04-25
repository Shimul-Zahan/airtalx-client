import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { MdOutlineEmail } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import { message, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { TbMessage2 } from "react-icons/tb";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      const { name, location, studies, about, newPassword } = values || {};

      const data = new FormData();
      data.append("name", name);
      data.append("password", newPassword);
      data.append("location", location);
      data.append("studies", studies);
      data.append("about", about);
      data.append("images", fileList[0]?.originFileObj || "");
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `http://localhost:5000/update/${user?.email}`;
      try {
        const response = await axios.put(url, data, config);
        console.log("🚀 ~ onFinish ~ response:", response)
        if (response.data.user) {
          message.success("Profile Updated!");
          setUser(response.data.user);
          localStorage.setItem("access-token", response.data.token);
          form.resetFields();
        } else {
          message.error(response.data.message || "Failed to update profile");
        }
      } catch (error) {
        console.error("Update failed:", error);
        message.error("Failed to update. Please try again later.");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      message.error("Failed to update profile. Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
  return (
    <div className="lg:w-3/4 w-11/12 mx-auto my-12">
      <div>
        <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-8 gap-y-7">
          <div className="custom-shadow p-4 col-span-2 rounded-md relative">
            <div className="flex justify-center">
              {/* <div className="w-40 h-40 avatar">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={user?.photoURL}
                  alt=""
                />
              </div> */}
              <label className="avatar w-40">
                <div className="rounded-full border-2 border-white">
                  <div>
                    <img src={user?.photoURL} alt="User Photo" />
                  </div>
                </div>
              </label>
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
                    <button className={`border border-black py-1 px-2 rounded-md ${user?.role !== 'jobseeker' ? 'hidden' : ''}`}>Resume</button>
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
                      <Form
                        name="update_profile"
                        initialValues={user}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                      >
                        <Form.Item
                          label="User Name"
                          name="name"
                          initialValue={user?.name}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Location"
                          name="location"
                          initialValue={user?.location}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Education"
                          name="studies"
                          initialValue={user?.studies}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="user_image"
                          valuePropName="fileList"
                          label="Image"
                          getValueFromEvent={normFile}
                        >
                          <Upload
                            name="logo"
                            action="/upload.do"
                            listType="picture"
                            {...props}
                          >
                            <Button icon={<UploadOutlined />}>
                              Click to upload Image
                            </Button>
                          </Upload>
                        </Form.Item>
                        <Form.Item
                          label="Bio"
                          name="about"
                          initialValue={user?.about}
                        >
                          <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Password" name="newPassword">
                          <Input.Password placeholder="Enter New Password" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                          >
                            Update
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </dialog>
              </div>
              <div className="flex gap-2 items-center">
                <MdOutlineEmail className="text-2xl pt-1" />
                <p>{user?.email}</p>
              </div>
              <div className="flex gap-2 items-center capitalize">
                <LuGraduationCap className="text-2xl pt-1" />
                {user?.studies && <p>{user?.studies}</p>}
                {!user?.studies && <p>N/A</p>}
              </div>
              <div className="flex gap-2 items-center capitalize">
                <SlLocationPin className="text-2xl pt-1" />
                {user?.location && <p>{user?.location}</p>}
                {!user?.location && <p>N/A</p>}
              </div>
            </div>
            <h4 className="font-semibold pt-6">About Me</h4>
            {user?.about && <p className="first-letter:capitalize">{user?.about}</p>}
            {!user?.about && <p>N/A</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
