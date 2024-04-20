import Lottie from "lottie-react";
import Employer from "../../../../public/employer.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { message } from "antd";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const EmployerSignup = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const { signinWithGoogle, user } = useContext(AuthContext);
  console.log("🚀 ~ EmployerSignup ~ user:", user);
  const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`;
  const navigate = useNavigate();

  if (user) {
    console.log("roleE", user?.role);
    if (user?.role == "jobseeker") navigate("/jobseeker/dashboard");
    if (user?.role == "employer") navigate("/employer/dashboard");
  }

  const onSubmitE = async (data, e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const role = form.role.value;
    const formData = new FormData();
    formData.append("image", data.photoURL[0]);

    // Validate password
    if (!/(?=.*[A-Z]).*[a-z]/.test(password)) {
      setError("Please add at least one uppercase and one lowercase letter");
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    // Fetch image upload
    try {
      const imgResponse = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      if (!imgResponse.ok) {
        message.error("Image upload failed");
      }
      const imgData = await imgResponse.json();
      const userDataWithImage = {
        name,
        email,
        role,
        password,
        photoURL: imgData.data.display_url,
      };

      // Send user data to signup endpoint
      const url = "http://localhost:5000/signup";
      const response = await axios.post(url, userDataWithImage);
      if (response.status === 200) {
        message.success("Signup successful");
        navigate("/login", { replace: true });
      } else {
        message.error("Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      message.error("Failed to signup. Please try again later.");
    }
  };

  const handleGoogleLogin = () => {
    signinWithGoogle()
      .then((result) => {
        const person = result?.user;
        console.log("🚀 ~ .then ~ person:", person);

        if (person) {
          const userData = {
            name: person?.displayName,
            email: person?.email,
            role: "employer",
            password: "",
            photoURL: person?.photoURL,
          };

          axios
            .post("http://localhost:5000/google/signup", userData, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              console.log("🚀 ~ .then ~ response:", response.data);
              if (!response) {
                message.error("Failed to Signup");
              }
              message.success("Login successful");
              localStorage.setItem("access-token", response.data?.token);
              if (response?.data?.user?.role == "jobseeker")
                navigate("/jobseeker/dashboard");
              if (response?.data?.user?.role == "employer")
                navigate("/employer/dashboard");
            })
            .catch((error) => {
              console.error("Error posting user data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
      });
  };

  return (
    <div>
      <div className="flex justify-between gap-20 py-24">
        <div className="w-full md:block hidden">
          <Lottie animationData={Employer} />
        </div>
        <div className="w-[600px] bg-[#edf7f4] custom-shadow rounded-lg p-8 mb-4">
          <h2 className="text-xl text-center font-semibold mb-3 uppercase">
            Employer Signup
          </h2>
          <form onSubmit={handleSubmit(onSubmitE)}>
            <div className="flex flex-col gap-5">
              <div className="pb-2">
                <label htmlFor="email">Name</label>
                <br />
                <input
                  className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                  type="text"
                  name="name"
                  {...register("name")}
                  id=""
                  required
                />
              </div>
              <div className="pb-2">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                  type="email"
                  name="email"
                  {...register("email")}
                  id=""
                  required
                />
              </div>
              <div className="pb-2">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                  type="password"
                  name="password"
                  {...register("password")}
                  id=""
                  required
                />
              </div>
              <div className="pb-2">
                <label htmlFor="password">Confirm Password</label>
                <br />
                <input
                  className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                  type="password"
                  name="password"
                  {...register("confirmPassword")}
                  id=""
                  required
                />
              </div>
              <div className="pb-2">
                <label htmlFor="password">Role</label>
                <br />
                <input
                  className="bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full"
                  type="text"
                  value={"employer"}
                  name="role"
                  {...register("role")}
                  id=""
                  required
                />
              </div>
              <div className="pb-2">
                <label htmlFor="email">Photo</label>
                <br />
                <input
                  className="bg-[#f5f5f5] p-2 border-slate-300 border w-72"
                  type="file"
                  name="photoURL"
                  {...register("photoURL")}
                  required
                />
              </div>
              <div className="flex gap-2 mb-3">
                <button className="w-full bg-[#1d9cb5] rounded text-white font-semibold p-2 mt-3">
                  Signup
                </button>
              </div>
            </div>
          </form>
          <div className="text-center">
            <small>
              Already have an account?{" "}
              <Link to="/login" className="text-[#1d7edd] font-semibold">
                Login now
              </Link>
            </small>
          </div>
          <div className="flex text-center gap-2 mb-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full border-[#1d9cb5] border rounded font-semibold p-2 mt-3 flex justify-center items-center gap-3"
            >
              <FaGoogle />
              <span>Continue with Google</span>
            </button>
          </div>
          <p className="text-center pt-8 text-red-700 font-semibold">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;
