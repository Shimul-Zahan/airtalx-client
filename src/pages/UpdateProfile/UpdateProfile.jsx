import { AuthContext } from "../../providers/AuthProviders";
import { message, Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Option } from "antd/es/mentions";
import { useContext, useState } from "react";

const UpdateProfile = () => {
  const [fileList, setFileList] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          // note: 'Hi, man!',
        });
        break;
      case "female":
        form.setFieldsValue({
          // note: 'Hi, lady!',
        });
        break;
      case "other":
        form.setFieldsValue({
          // note: 'Hi there!',
        });
        break;
      default:
    }
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

  const onFinish = async (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      const {
        name,
        location,
        studies,
        about,
        newPassword,
        preferredSalary,
        preferredJobType,
        expertiseField,
        expertiseLevel,
        jobPosition,
        jobCompanyName,
      } = values || {};

      const data = new FormData();
      data.append("name", name || user?.name);
      data.append("password", newPassword);
      data.append("location", location || user?.location);
      data.append("studies", studies || user?.studies);
      data.append("about", about || user?.about);
      data.append("preferredSalary", preferredSalary || user?.preferredSalary);
      data.append("expertiseField", expertiseField || user?.expertiseField);
      data.append(
        "preferredJobType",
        preferredJobType || user?.preferredJobType
      );
      data.append("expertiseLevel", expertiseLevel || user?.expertiseLevel);
      data.append("jobPosition", jobPosition || user?.jobPosition);
      data.append("jobCompanyName", jobCompanyName || user?.jobCompanyName);
      data.append("role", user?.role);
      data.append("oldPass", user?.password);
      data.append("isUpdate", newPassword ? "False" : "True");
      data.append("images", fileList[0]?.originFileObj || "");
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `http://localhost:5000/update/${user?.email}`;
      try {
        const response = await axios.put(url, data, config);
        console.log("🚀 ~ onFinish ~ response:", response);
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

  return (
    <div className="lg:w-1/2 w-11/12 mx-auto">
      <div className="mx-auto w-11/12 mb-4">
        <h2 className="text-3xl pb-3 text-center font-semibold my-5">
          Update Your Profile
        </h2>
        <Form
          name="update_profile"
          initialValues={user}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item label="User Name" name="name" initialValue={user?.name}>
            <Input />
          </Form.Item>

          {user && user?.role === "jobseeker" && (
            <>
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
                label="Preferred Salary"
                name="preferredSalary"
                initialValue={user?.preferredSalary}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Preferred Job Type"
                name="preferredJobType"
                initialValue={user?.preferredJobType}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Expertise Field"
                name="expertiseField"
                initialValue={user?.expertiseField}
              >
                <Input />
              </Form.Item>
              <Form.Item name="expertiseLevel" label="Expertise Level">
                <Select
                  placeholder="Select an option"
                  onChange={onGenderChange}
                  allowClear
                  className="z-10"
                >
                  <Option value="Beginner: 1-2 years of experience">Beginner: 1-2 years of experience</Option>
                  <Option value="Intermediate: 3-5 years of experience">Intermediate: 3-5 years of experience</Option>
                  <Option value="Advanced: 6+ years of experience">Advanced: 6+ years of experience</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Job Position"
                name="jobPosition"
                initialValue={user?.jobPosition}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Current Company Name"
                name="jobCompanyName"
                initialValue={user?.jobCompanyName}
              >
                <Input />
              </Form.Item>
            </>
          )}
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
              <Button icon={<UploadOutlined />}>Click to upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Bio" name="about" initialValue={user?.about}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Password" name="newPassword">
            <Input.Password placeholder="Enter New Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
