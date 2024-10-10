import axios from 'axios';
import { ArrowLeft, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const VideoUpload = () => {
    const [loading, setLoading] = useState(false); // Loading state for video upload
    const [progress, setProgress] = useState(0); // Track progress
    const [course, setCourse] = useState(null); // Store course data
    const [loadingCourse, setLoadingCourse] = useState(false); // Loading state for fetching course data
    const { courseId } = useParams();
    const [files, setFiles] = useState([]);
    const [videoPreviews, setVideoPreviews] = useState([]); // New state to hold video preview URLs
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
    });
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const loadingToastId = toast.loading("Uploading video...");
        setLoading(true);
        setProgress(0);
        try {
            const submitData = { ...data, courseId: courseId };
            console.log(submitData)
            const formData = new FormData();
            formData.append("courseId", submitData.courseId);
            formData.append("title", submitData.title);
            formData.append("description", submitData.description);
            files.forEach((file) => {
                formData.append("files", file);
            });
            console.log("abc", files);
            console.log(formData)
            console.log("Uploading...");
            const response = await axios.post("videos/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setProgress(100);
            console.log("123", response.data);
            toast.dismiss(loadingToastId);
            toast.success("Video uploaded successfully!");
            navigate("/teacher/courses");
        } catch (error) {
            console.error("Error uploading video:", error);
            toast.dismiss(loadingToastId);
            toast.error("Error uploading video");
        } finally {
            setLoading(false); // Reset loading state
            setProgress(0);
        }
    };

    const handleVideoChange = (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Store files
        setFiles((prev) => [...prev, ...selectedFiles]);

        // Generate video previews
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setVideoPreviews((prev) => [...prev, ...newPreviews]);

        console.log(selectedFiles);
    };

    const handleVideoClick = () => {
        document.getElementById('video').click();
    };



    return (
        <div className="container mt-4 vh-50 position-relative d-flex align-items-center flex-column justify-content-center">
            <button
                className='btn position-absolute top-0 left-0 text-black btn-sm d-flex align-items-center gap-2'
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className='small-icon' />
                <span className="d-none d-md-block">Back</span>
            </button>
            {loadingCourse ? (
                // Loading spinner or message while fetching course data
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading course data...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="fs-2 fw-semibold text-center mb-3">Upload Video</div>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="mx-auto create-width mt-2">
                        {/* Title Field */}
                        <div className="row mb-3">
                            <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                                <label htmlFor="title" className="form-label fs-4 fw-bolder">Title</label>
                                <div className="w-60">
                                    <input
                                        type="text"
                                        id="title"
                                        placeholder="Enter video title"
                                        {...register('title', { required: "Title is required" })}
                                        className="form-control form-control-lg navbar-search rounded-5 rounded-3"
                                    />
                                </div>
                            </div>
                        </div>
                        {errors.title && <div className="text-danger mt-1">{errors.title.message}</div>}

                        {/* Description Field */}
                        <div className="mb-3 d-flex align-items-center justify-content-between w-100">
                            <label htmlFor="description" className="form-label fs-4 fw-bolder">Description</label>
                            <div className="w-60 d-flex justify-content-start">
                                <textarea
                                    id="description"
                                    placeholder="Enter video description"
                                    {...register('description', { required: "Description is required" })}
                                    className="form-control form-control-lg navbar-search rounded-5 rounded-3"
                                />
                            </div>
                        </div>
                        {errors.description && <div className="text-danger mt-1">{errors.description.message}</div>}

                        {/* Video Upload */}
                        <div className="mb-3 d-flex justify-content-between w-100">
                            <label htmlFor="video" className="form-label fs-4 fw-bolder">Video</label>
                            <div className="w-60 d-flex justify-content-start">
                                <input
                                    type="file"
                                    id="video"
                                    accept="video/*"
                                    multiple
                                    onChange={handleVideoChange}
                                    style={{ display: 'none' }}
                                />
                                <div>
                                    {videoPreviews.length > 0 && (
                                        <div className="mb-3">
                                            <div className="d-flex flex-wrap gap-2">
                                                {videoPreviews.map((videoUrl, index) => (
                                                    <video key={index} width="100" className='rounded-3 shadow-sm' style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "#f0f0f1" }} height="120" controls>
                                                        <source src={videoUrl} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ))}
                                                <button
                                                    type="button"
                                                    disabled={loading}
                                                    className="btn btn-light p-2 dashboard-btn-shadow"
                                                    style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "#f0f0f1" }}
                                                    onClick={handleVideoClick}
                                                >
                                                    <Plus size={40} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {videoPreviews.length == 0 && <button
                                        type="button"
                                        className="btn btn-light p-2 dashboard-btn-shadow"
                                        style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "#f0f0f1" }}
                                        onClick={handleVideoClick}
                                    >
                                        <Plus size={40} />
                                    </button>}
                                </div>
                            </div>
                        </div>

                        {/* Display Selected Videos */}


                        {/* Submit Button */}
                        <div className="d-flex align-items-center">
                            <button
                                type="submit"
                                className="bg-tranparent text-white rounded-3 mt-2 text-black border-0 fw-bolder w-100 py-2 fs-5 d-flex align-items-center overflow-hidden position-relative blue text-center justify-content-center"
                            >
                                <span style={{ zIndex: "1000" }}>{loading ? "Uploading video" : "Upload Video"}</span>
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default VideoUpload;
