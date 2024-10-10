import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; // Fixed the jwtDecode import

const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Watch the value of newPassword to validate confirmPassword
    const newPassword = watch('newPassword', '');

    // Decode token from localStorage (assuming a JWT token)
    const userData = jwtDecode(localStorage.getItem("token"));
    const role = localStorage.getItem("role");

    const onSubmit = async (data) => {
        setLoading(true);
        const payload = {
            id: userData.claims.id, // Assuming claims contain the user's id
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }
        try {
            if (role === "ADMIN") {
                // API call for admin password reset
                const response = await axios.patch('/admin/' + userData.claims.id + '/reset-password', payload);
                console.log(response);
                // Clear user session and navigate to login
            }

            if (role == "TEACHER") {
                console.log("/teacher password reset logic");
                // Add API logic for teacher if needed
                const response = await axios.patch('/teacher/' + userData?.claims?.id + '/reset-password', payload);
            }
            localStorage.removeItem("token");
            localStorage.removeItem("adminId");
            localStorage.removeItem("role");
            toast.success('Password reset successful!');
            navigate('/login');
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error('Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="shadow-lg rounded p-5 width-50">
                <div className='fs-3 text-center'>Reset Password</div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    {/* Old Password Field */}
                    <div className="mb-3">
                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            placeholder="Enter old password"
                            {...register('oldPassword', { required: "Old password is required" })}
                            className="form-control"
                        />
                        {errors.oldPassword && <span className="text-danger">{errors.oldPassword.message}</span>}
                    </div>

                    {/* New Password Field */}
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Enter new password"
                            {...register('newPassword', {
                                required: "New password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters long" }
                            })}
                            className="form-control"
                        />
                        {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            {...register('confirmPassword', {
                                required: "Please confirm your password",
                                validate: (value) => value === newPassword || "Passwords do not match"
                            })}
                            className="form-control"
                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn text-white blue fw-light w-100" disabled={!isValid}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
