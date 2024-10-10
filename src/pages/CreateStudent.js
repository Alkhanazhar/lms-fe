import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        mode: "onChange", // Validate on every change
    });

    const navigate = useNavigate();
    // On form submit
    const onSubmit = async (data) => {
        try {
            const adminId = localStorage.getItem("adminId")
            const submissionData = { ...data, adminId };
            console.log(submissionData, "submissionData");
            const response = await axios.post('/student', submissionData); // Adjusted endpoint
            console.log(response);
            // Handle successful submission
            if (response.status === 200) {
                toast.success("Student created successfully!");
                reset();
                navigate('/teacher/students');
            } else {
                toast.error(response.data.response);
            }
        } catch (error) {
            console.error("Error creating student:", error);
            toast.error("Something went wrong, please try again.");
        }
    };

    return (
        <>
            <button className='btn   text-black btn-sm d-flex align-items-center gap-2 ' onClick={() => navigate(-1)}><ArrowLeft className='small-icon' />Back</button>
            <div className="container mt-4 vh-50 d-flex align-items-center flex-column justify-content-center">
                <div className="fs-2 fw-semibold text-center mb-3 ">Create Student</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mx-auto create-width mt-2'>

                    {/* Student Name Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="name" className="form-label fs-4 fw-bolder">Name</label>
                            <div className='w-60'>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter student's full name"
                                    {...register('name', { required: "Name is required" })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.name && <div className="text-danger mt-1">{errors.name.message}</div>}
                    </div>

                    {/* Email Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="email" className="form-label fs-4 fw-bolder">Email</label>
                            <div className='w-60'>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter student's email address"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" }
                                    })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.email && <div className="text-danger mt-1">{errors.email.message}</div>}
                    </div>

                    {/* Phone Number Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="phoneNumber" className="form-label fs-4 fw-bolder">Phone Number</label>
                            <div className='w-60'>
                                <input
                                    type="tel" // Using 'tel' for better numeric input
                                    id="phoneNumber"
                                    placeholder="Enter phone number"
                                    {...register('phoneNumber', {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\d{10}$/, // Exactly 11 digits
                                            message: "Phone number must be exactly 10 digits"
                                        }
                                    })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.phoneNumber && <div className="text-danger mt-1">{errors.phoneNumber.message}</div>}

                    </div>

                    {/* Type Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="type" className="form-label fs-4 fw-bolder">Type</label>
                            <div className='w-60'>
                                <select
                                    id="type"
                                    {...register('type', { required: "Type is required" })}
                                    className="form-select form-select-lg navbar-search rounded-5 rounded-3"
                                >
                                    <option value="INTERNAL">Internal</option>
                                    <option value="EXTERNAL">External</option>
                                </select>
                            </div>
                        </div>
                        {errors.type && <div className=" text-danger mt-1">{errors.type.message}</div>}
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="userName" className="form-label fs-4 fw-bolder">Username</label>
                            <div className='w-60'>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter the username"
                                    {...register('username', { required: "Username is required" })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.username && <div className=" text-danger mt-1">{errors.username.message}</div>}
                    </div>

                    {/* Password Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="password" className="form-label fs-4 fw-bolder">Password</label>
                            <div className='w-60'>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                    {...register('password', { required: "Password is required" })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.password && <div className=" text-danger-color  mt-1">{errors.password.message}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className='d-flex align-items-center'>
                        <button
                            type="submit"
                            className="btn blue text-white rounded-3 mt-2 text-black border-0  fw-bolder  w-100 py-2 fs-5 dashboard-btn-shadow"
                            style={{ backgroundColor: '#00FF00', color: '#fff' }}
                            disabled={!isValid}  // Disable the button if the form is not valid
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateStudent;
