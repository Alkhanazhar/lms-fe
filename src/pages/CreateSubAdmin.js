import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const CreateSubAdmin = () => {
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        mode: "onChange",
    });

    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate();

    // Function to fetch data if editing

    const fetchSubAdminData = async () => {
        try {
            const response = await axios.get(`/subadmin/${id}`);
            console.log(response);
            const subAdminData = response.data;
            // Use setValue to populate the form fields
            setValue('name', subAdminData.name);
            setValue('email', subAdminData.email);
            setValue('phoneNumber', subAdminData.phoneNumber);
            setValue('username', subAdminData.username);
        } catch (error) {
            console.error("Error fetching sub-admin data:", error);
            toast.error("Failed to load sub-admin data.");
        }
    };

    // Fetch sub-admin data only if `id` exists
    useEffect(() => {
        if (id) {
            fetchSubAdminData();
        }
    }, [id]);

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            let response;
            const adminId = localStorage.getItem('adminId');
            const submissionData = { ...data, adminId };

            if (id) {
                response = await axios.put(`/subadmin/${id}`, submissionData);
                console.log(response, "put");
            } else {
                response = await axios.post('/subadmin', submissionData);
            }

            if (response.status === 200) {
                toast.success(id ? "Sub-admin successfully updated" : "Sub-admin successfully created");
                navigate("/admin/sub-admin");
            } else {
                toast.error(response.data.response || "Something went wrong");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to submit form.");
        }
    };

    return (
        <>
            <div className="container mt-4 vh-50 d-flex align-items-center flex-column justify-content-center position-relative">
                <button
                    className='btn position-absolute top-0 left-0 text-black btn-sm d-flex align-items-center gap-2'
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className='small-icon' />
                    <span className="d-none d-md-block">Back</span>
                </button>
                <div className="fs-2 fw-semibold text-center mb-3">
                    {id ? 'Edit Sub-admin' : 'Create Sub-admin'}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='mx-auto create-width mt-2'>
                    {/* Name Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="name" className="form-label fs-4 fw-bolder">Name</label>
                            <div className='w-60'>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter the name"
                                    {...register('name', { required: "Name is required" })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.name && <div className="text-danger-color mt-1">{errors.name.message}</div>}
                    </div>

                    {/* Email Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="email" className="form-label fs-4 fw-bolder">Email</label>
                            <div className='w-60'>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter the email address"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" }
                                    })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.email && <div className="text-danger-color mt-1">{errors.email.message}</div>}
                    </div>

                    {/* Phone Number Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="phoneNumber" className="form-label fs-4 fw-bolder">Phone Number</label>
                            <div className='w-60'>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    placeholder="Enter phone number"
                                    {...register('phoneNumber', {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\d{10}$/, // Exactly 10 digits
                                            message: "Phone number must be exactly 10 digits"
                                        }
                                    })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.phoneNumber && <div className="text-danger mt-1">{errors.phoneNumber.message}</div>}
                    </div>

                    {/* Username Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="username" className="form-label fs-4 fw-bolder">Username</label>
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
                        {errors.username && <div className="text-danger-color mt-1">{errors.username.message}</div>}
                    </div>

                    {/* Password Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="password" className="form-label fs-4 fw-bolder">Password</label>
                            <div className='w-60'>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter the password"
                                    {...register('password', {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters long" }
                                    })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.password && <div className="text-danger-color mt-1">{errors.password.message}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className='d-flex align-items-center'>
                        <button
                            type="submit"
                            className="btn blue text-white rounded-3 mt-2 text-black border-0 fw-bolder w-100 py-2 fs-5 dashboard-btn-shadow"
                            style={{ backgroundColor: '#00FF00', color: '#fff' }}
                            disabled={!isValid}
                        >
                            {id ? "Update Sub-admin" : "Create Sub-admin"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateSubAdmin;
