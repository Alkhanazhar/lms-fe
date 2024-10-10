import axios from 'axios';
import { ArrowLeft, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
        mode: "onChange",
    });
    const [loading, setLoading] = useState(false)
    const role = localStorage.getItem("role")
    console.log(role)
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([])
    const location = useLocation();
    const onSubmit = async (data) => {
        const loadingToastId = toast.loading("Creating Course...");
        setLoading(true);
        const submitData = {
            ...data,
            teacherId: role === "SUB_ADMIN" ? data.teacherId : localStorage.getItem('teacherId'),
            adminId: localStorage.getItem('adminId'),
            createdBy: role
        };
        try {
            const response = await axios.post("/courses/create", submitData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            toast.success("Course created successfully");
            toast.dismiss(loadingToastId);
            navigate("/teacher/courses");
        } catch (error) {
            console.log(error);
            toast.error("Error creating course");
            toast.dismiss(loadingToastId);
        } finally {
            toast.dismiss(loadingToastId);
            setLoading(false);
        }
    };

    // Handle file input change for thumbnail
    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue('thumbnail', file);
        }
    };

    // Handle file input change for video

    const handleThumbnailClick = () => {
        document.getElementById('thumbnail').click();
    };
    useEffect(() => {
        if (role === "SUB_ADMIN"){
            const fetchTeachers = async () => {
                try {
                    const response = await axios.get("/admin/teacher/" + localStorage.getItem("adminId"));
                    setTeachers(response.data);
                } catch (error) {
                    console.log(error);
                    console.log(error.message);
                }
            };
            fetchTeachers();
        }
    }, [])

    return (
        <div className="container mt-4 vh-50 d-flex align-items-center flex-column justify-content-center position-relative">
            <button
                className='btn position-absolute top-0 left-0 text-black btn-sm d-flex align-items-center gap-2'
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className='small-icon' />
                <span className="d-none d-md-block">Back</span>
            </button>
            <div className="fs-2 fw-semibold text-center mb-3">Create Course</div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="mx-auto create-width mt-2 ">
                {/* Course Name Field */}
                <div className="row mb-3">
                    <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                        <label htmlFor="courseName" className="form-label fs-4 fw-bolder">Course Name</label>
                        <div className="w-60">
                            <input
                                type="text"
                                id="courseName"
                                placeholder="Enter course name"
                                {...register('courseName', { required: "Course name is required" })}
                                className="form-control navbar-search rounded-5 form-control-lg rounded-3"
                            />
                        </div>
                    </div>
                    {errors.courseName && <div className="text-danger mt-1">{errors.courseName.message}</div>}
                </div>

                {/* Title Field */}
                <div className="row mb-3">
                    <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                        <label htmlFor="title" className="form-label fs-4 fw-bolder">Title</label>
                        <div className="w-60">
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter course title"
                                {...register('title', { required: "Title is required" })}
                                className="form-control form-control-lg navbar-search rounded-5 rounded-3"
                            />
                        </div>
                    </div>
                    {errors.title && <div className="text-danger mt-1">{errors.title.message}</div>}
                </div>

                {/* Course Type Radio Buttons */}
                <div className="mb-3 d-flex align-items-center justify-content-between w-100">
                    <label className="form-label fs-4 fw-bolder">Type</label>
                    <div className="d-flex gap-4 w-60 align-items-center">
                        <div className="d-flex align-items-center justify-content-between">
                            <input
                                type="radio"
                                id="public"
                                {...register('courseType', { required: "Course type is required" })}
                                value="PUBLIC"
                                className="dashboard-radio"
                            />
                            <label htmlFor="public" className="form-check-label">Public</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <input
                                type="radio"
                                id="private"
                                {...register('courseType', { required: "Course type is required" })}
                                value="PRIVATE"
                                className="dashboard-radio"
                            />
                            <label htmlFor="private" className="form-check-label">Private</label>
                        </div>

                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center justify-content-between w-100">
                    <label htmlFor="description" className="form-label fs-4 fw-bolder">Description</label>
                    <div className="w-60 d-flex justify-content-start">
                        <textarea
                            type="text"
                            id="description"
                            placeholder="Enter course description"
                            {...register('description', { required: "Description is required" })}
                            className="form-control form-control-lg navbar-search rounded-5 rounded-3"
                        />
                    </div>
                </div>

                {errors.courseType && <div className="text-danger mt-1">{errors.courseType.message}</div>}
                {/* Thumbnail Upload */}
                <div className="mb-3 d-flex align-items-center justify-content-between w-100">
                    <label htmlFor="thumbnail" className="form-label fs-4 fw-bolder">Thumbnail</label>
                    <div className="w-60 d-flex justify-content-start">
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            {...register('thumbnail')}
                            onChange={handleThumbnailChange}
                            style={{ display: 'none' }} // Hide the input
                        />
                        <button
                            type="button"
                            className="btn btn-light p-2 dashboard-btn-shadow"
                            style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "#f0f0f1" }}
                            onClick={handleThumbnailClick}
                        >
                            <Plus size={40} />
                        </button>
                    </div>
                </div>

                {/*select option  */}
                {role === "SUB_ADMIN" && (
                    <div className="mb-3 d-flex align-items-center justify-content-between w-100">
                        <label htmlFor="teacherId" className="form-label fs-4 fw-bolder">Teacher</label>
                        <div className="w-60 d-flex justify-content-start">
                            <select
                                id="teacherId"
                                {...register('teacherId', { required: "Teacher selection is required" })}
                                className="form-select form-select-lg navbar-search rounded-5 rounded-3"
                            >
                                <option value="">Select a teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name} {/* Adjust this based on the actual property name for teacher's name */}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="d-flex align-items-center">
                    <button
                        type="submit"
                        className="btn blue text-white rounded-3 mt-2 text-black border-0 fw-bolder w-100 py-2 fs-5 dashboard-btn-shadow"
                        style={{ backgroundColor: '#00FF00', color: '#fff' }}
                        disabled={!isValid} // Disable the button if the form is not valid
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
