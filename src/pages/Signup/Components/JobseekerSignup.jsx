import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import Jobseeker from "../../../../public/jobseeker.json"
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const JobseekerSignup = () => {
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`;
    const { createUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmitJ = (data, e) => {
        const formJ = e.target;
        const name = formJ.name.value;
        const email = formJ.email.value;
        const password = formJ.password.value;
        const confirmPassword = formJ.confirmPassword.value;
        const role = formJ.role.value;
        const formData = new FormData();
        formData.append('image', data.photoURL[0]);

        if (!/(?=.*[A-Z]).*[a-z]/.test(password)) {
            setError('Please add at least one uppercase and one lowercase letter');
            return;
        }
        if (password !== confirmPassword) {
            setError('Password and Confirm Password does not match')
            return;
        }

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Image upload failed');
                }
                return res.json();
            })
            .then(imgResponse => {
                const userDataWithImage = {
                    name, email, role,
                    image: imgResponse.data.display_url
                };

                createUser(data.email, data.password)
                    .then(result => {
                        const loggedUser = result.user;
                        console.log(loggedUser);
                        logOut();
                        navigate('/login');

                        // Store user data in the database
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userDataWithImage)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log('User data stored:', data);
                            })
                            .catch(error => {
                                console.error('Error storing user data:', error);
                            });
                    })
                    .catch(error => {
                        // Error creating user
                        console.error('Error creating user:', error);
                        setError(customErrorMessage(error));
                    });
            })
            .catch(error => {
                console.error('Image upload error:', error);
            });
    }

    const customErrorMessage = (error, password) => {
        if (error.message.includes('auth/email-already-in-use')) {
            return 'This email address is already in use. Please use a different email address.';
        }
        else if (error.message.includes('auth/weak-password')) {
            return 'The password provided is too weak. Please choose a stronger password.';
        }
        else if (error.message.includes('auth/invalid-email')) {
            return 'The email address you entered is not valid. Please enter a valid email address.';
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add at least one uppercase letter');
            return;
        }
        else {
            return 'An error occurred while signing up. Please try again.';
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center gap-20 py-12">
                <div className="w-full md:block hidden">
                    <Lottie animationData={Jobseeker} />
                </div>
                <div className='w-[600px] mt-12 bg-[#edf7f4] custom-shadow rounded-lg p-8 mb-4'>
                    <h2 className='text-xl text-center font-semibold mb-3 uppercase'>Jobseeker Signup</h2>
                    <form onSubmit={handleSubmit(onSubmitJ)}>
                        <div className='flex flex-col gap-5'>
                            <div className='pb-2'>
                                <label htmlFor="email">Name</label><br />
                                <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="text" name="name" {...register("name")} id="" required />
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="email">Email</label><br />
                                <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="email" name="email" {...register("email")} id="" required />
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="password">Password</label><br />
                                <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="password" name="password" {...register("password")} id="" required />
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="password">Confirm Password</label><br />
                                <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="password" name="confirmPassword" {...register("confirmPassword")} id="" required />
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="password">Role</label><br />
                                <input className='bg-[#f5f5f5] rounded p-2 border-slate-300 border w-full' type="text" value={'jobseeker'} name="role" {...register("role")} id="" required />
                            </div>
                            <div className='pb-2'>
                                <label htmlFor="email">Photo</label><br />
                                <input className='bg-[#f5f5f5] p-2 border-slate-300 border w-72' type="file" name="photoURL" {...register("photoURL")} required />
                            </div>
                            <div className='flex gap-2 mb-3'>
                                <button className='w-full bg-[#1d9cb5] rounded text-white font-semibold p-2 mt-3'>Signup</button>
                            </div>
                        </div>
                    </form>
                    <div className='text-center'>
                        <small>Already have an account? <Link to='/login' className='text-[#1d7edd] font-semibold'>Login Now</Link></small>
                    </div>
                    <p className="text-center pt-8 text-red-700 font-semibold">{error}</p>
                </div>
            </div>
        </div>
    );
};

export default JobseekerSignup;