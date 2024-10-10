import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const CreateSchool = () => {
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        mode: "onChange",
    });

    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate();

    // Function to fetch data if editing
    const fetchSchoolData = async () => {
        try {
            const response = await axios.get(`/admin/${id}`);
            console.log(response)
            const schoolData = response.data;
            // Use setValue to populate the form fields
            setValue('schoolName', schoolData.schoolName);
            setValue('name', schoolData.name); // owner's name
            setValue('phoneNumber', schoolData.phoneNumber);
            setValue('email', schoolData.email);
            setValue('username', schoolData.username);
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

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            let response;
            const adminId = localStorage.getItem('adminId');
            const submissionData = { ...data, adminId };
            if (id) {
                response = await axios.put(`/admin/${id}`, submissionData);
                console.log(response, "put");
            } else {
                response = await axios.post('/admin', submissionData);
            }

            if (response.status === 200) {
                toast.success(id ? "School successfully updated" : "School successfully created");
                navigate("/superadmin/school");
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
                <button className='btn position-absolute top-0  left-0 text-black btn-sm d-flex align-items-center gap-2 ' onClick={() => navigate(-1)}><ArrowLeft className='small-icon' /><span className="d-none d-md-block">Back</span></button>
                <div className="fs-2 fw-semibold text-center mb-3">
                    {id ? 'Edit School' : 'Create School'}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='mx-auto create-width mt-2'>
                    {/* School Name Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="schoolName" className="form-label fs-4 fw-bolder">School Name</label>
                            <div className='w-60'>
                                <input
                                    type="text"
                                    id="schoolName"
                                    placeholder="Enter the school name"
                                    {...register('schoolName', { required: "School name is required" })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.schoolName && <div className="text-danger-color mt-1">{errors.schoolName.message}</div>}
                    </div>

                    {/* Owner's Name Field */}
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="ownersName" className="form-label fs-4 fw-bolder">Owner's Name</label>
                            <div className='w-60'>
                                <input
                                    type="text"
                                    id="ownersName"
                                    placeholder="Enter the owner's name"
                                    {...register('name', { required: "Name is required" })}
                                    className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                                />
                            </div>
                        </div>
                        {errors.name && <div className="text-danger-color mt-1">{errors.name.message}</div>}
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

                    {/* Username Field */}
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
                                    {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
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
                            {id ? "Update School" : "Create School"}
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default CreateSchool;
