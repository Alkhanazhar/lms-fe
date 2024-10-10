import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTeacher = () => {
    const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = useForm({
        mode: "onChange",
    });
    const navigate = useNavigate();
    const { id } = useParams(); // Get id from URL params

    const fetchSchoolData = async () => {
        try {
            const response = await axios.get(`/teacher/${id}`);
            console.log(response)
            const teacherData = response.data;
            // // Use setValue to populate the form fields
            setValue('name', teacherData.name); // owner's name
            setValue('phoneNumber', teacherData.phoneNumber);
            setValue('email', teacherData.email);
            setValue('username', teacherData.username);
            // setValue('username', teacherData.username);
        } catch (error) {
            console.error("Error fetching school data:", error);
            toast.error("Failed to load school data.");
        }
    };
    // Fetch school data only if `id` exists
    useEffect(() => {
        if (id) {
            fetchSchoolData();
        }
    }, [id]);
    // On form submit

    // const userData = jwtDecode(localStorage.getItem("token"))
    

    const onSubmit = async (data) => {
        try {
            let response;
            const adminId = localStorage.getItem('adminId');

            console.log(adminId, "adminId");
            const submissionData = { ...data, adminId };
            if (id) {
                response = await axios.put(`/teacher/${id}`, submissionData);
            } else {
                response = await axios.post('/teacher', submissionData);
            }
            if (response.status === 200) {
                toast.success(id ? "teacher successfully updated" : "teacher successfully created");
                navigate("/admin/teachers");
            } else {
                console.log(response)
                toast.error(response.data.response || "Something went wrong");
            }
        } catch (error) {
            console.error("Error creating teacher:", error);
            toast.error("Something went wrong, please try again.");
        }
    };
    return (
        <>
           
            <div className='d-flex align-items-center justify-content-center vh-50 position-relative'>
                <button className='btn position-absolute top-0 left-0  text-black btn-sm d-flex align-items-center gap-2 ' onClick={() => navigate(-1)}><ArrowLeft className='small-icon' /><span className="d-none d-md-block">Back</span></button>
                <div className="container mt-4" >
                    <div className="fs-2 fw-semibold text-center mb-3">
                        {id ? 'Edit Teacher' : 'Create Teacher'}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto create-width mt-2'>
                        {/* Teacher Name Field */}
                        <div className="row mb-3">
                            <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                                <label htmlFor="name" className="form-label fs-4 fw-bolder">Name</label>
                                <div className='w-60'>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter teacher's name"
                                        {...register('name', { required: "Name is required" })}
                                        className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                    />
                                </div>
                            </div>
                        </div>
                        {errors.name && <div className="text-danger mt-1">{errors.name.message}</div>}

                        {/* Email Field */}
                        <div className="row mb-3">
                            <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                                <label htmlFor="email" className="form-label fs-4 fw-bolder">Email</label>
                                <div className='w-60'>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter teacher's email"
                                        {...register('email', { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })}
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
                            {errors.username && <div className="text-danger mt-1">{errors.username.message}</div>}
                        </div>


                        <div className="row mb-3">
                            <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                                <label htmlFor="phoneNumber" className="form-label fs-4 fw-bolder">Password</label>
                                <div className='w-60'>

                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter password"
                                        {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                                        className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                    />
                                </div>
                            </div>
                        </div>
                        {errors.password && <div className="text-danger mt-1">{errors.password.message}</div>}

                        {/* Submit Button */}
                        <div className='d-flex align-items-center'>
                            <button
                                type="submit"
                                className="btn blue text-white rounded-3 mt-2 text-black border-0 fw-bolder w-100 py-2 fs-5 dashboard-btn-shadow"
                                style={{ backgroundColor: '#00FF00', color: '#fff' }}
                                disabled={!isValid}  // Disable the button if the form is not valid
                            >
                                {id ? "Update Teacher" : "Create Teacher"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateTeacher;
