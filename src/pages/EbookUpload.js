import axios from 'axios';
import { ArrowLeft, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EbookUpload = () => {
    const [loading, setLoading] = useState(false); // Loading state for ebook upload
    const [progress, setProgress] = useState(0); // Track progress
    const { courseId } = useParams();
    const [file, setFile] = useState(null);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange",
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const loadingToastId = toast.loading("Uploading ebook...");
        setLoading(true);
        setProgress(0);
        try {
            const submitData = { ...data, courseId: courseId };
            console.log(submitData);
            const formData = new FormData();
            formData.append("courseId", submitData.courseId);
            formData.append("title", submitData.title);
            formData.append("author", submitData.author);
            formData.append("category", submitData.category);
            formData.append("ebookFile", file);

            console.log(formData);
            console.log("Uploading...");
            const response = await axios.post("/ebooks/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setProgress(100);
            console.log("123", response.data);
            toast.dismiss(loadingToastId);
            toast.success("Ebook uploaded successfully!");
            navigate("/teacher/courses");
        } catch (error) {
            console.error("Error uploading ebook:", error);
            toast.dismiss(loadingToastId);
            toast.error("Error uploading ebook");
        } finally {
            setLoading(false); // Reset loading state
            setProgress(0);
        }
    };

    const handleEbookChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
    };

    const handleEbookClick = () => {
        document.getElementById('ebookFile').click();
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
            <div className="fs-2 fw-semibold text-center mb-3">Upload Ebook</div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="mx-auto create-width mt-2 ">
                {/* Title Field */}
                <div className="row mb-3">
                    <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                        <label htmlFor="title" className="form-label fs-4 fw-bolder">Title</label>
                        <div className="w-60">
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter ebook title"
                                {...register('title', { required: "Title is required" })}
                                className="form-control form-control-lg navbar-search rounded-5 rounded-3"
                            />
                        </div>
                    </div>
                </div>
                {errors.title && <div className="text-danger mt-1">{errors.title.message}</div>}

                {/* Author Field */}
                <div className="row mb-3">
                    <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                        <label htmlFor="author" className="form-label fs-4 fw-bolder">Author</label>
                        <div className="w-60">
                            <input
                                type="text"
                                id="author"
                                placeholder="Enter author name"
                                {...register('author', { required: "Author is required" })}
                                className="form-control form-control-lg navbar-search rounded-5 rounded-3"
                            />
                        </div>
                    </div>
                </div>
                {errors.author && <div className="text-danger mt-1">{errors.author.message}</div>}

                {/* Category Field */}
                <div className="row mb-3">
                    <div className="col-md-12 d-flex align-items-center justify-content-between w-100">
                        <label htmlFor="category" className="form-label fs-4 fw-bolder">Category</label>
                        <div className="w-60">
                            <input
                                type="text"
                                id="category"
                                placeholder="Enter ebook category"
                                {...register('category', { required: "Category is required" })}
                                className="form-control form-control-lg navbar-search rounded-5 rounded-3"
                            />
                        </div>
                    </div>
                </div>
                {errors.category && <div className="text-danger mt-1">{errors.category.message}</div>}

                {/* Ebook Upload */}
                <div className="mb-3 d-flex justify-content-between w-100">
                    <label htmlFor="ebookFile" className="form-label fs-4 fw-bolder">Ebook File</label>
                    <div className="w-60 d-flex justify-content-start">
                        <input
                            type="file"
                            id="ebookFile"
                            accept=".pdf,.epub"
                            onChange={handleEbookChange}
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            disabled={loading}
                            className="btn btn-light p-2 dashboard-btn-shadow"
                            style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "#f0f0f1" }}
                            onClick={handleEbookClick}
                        >
                            <Plus size={40} />
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex align-items-center">
                    <button
                        type="submit" disabled={!isValid}
                        className="bg-tranparent text-white rounded-3 mt-2 text-black border-0 fw-bolder w-100 py-2 fs-5 d-flex align-items-center overflow-hidden position-relative blue text-center justify-content-center"
                        style={{ backgroundColor: '#00FF00', color: '#fff' }}
                    >
                        <span style={{ zIndex: "1000" }}>{loading ? "Uploading ebook" : "Upload Ebook"}</span>
                    </button>
                </div>
            </form>
        </div>

    );
};

export default EbookUpload;
