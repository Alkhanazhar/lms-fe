import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../include/Button';
import axios from 'axios';

const VerifyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const location = useLocation()

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Automatically move to the next input
            if (value && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        // Handle OTP submission logic here
        console.log("Submitted OTP: ", enteredOtp);

        if (location.pathname.includes("/admin")) {
            const res = await axios.post("/admin/verify-otp", enteredOtp)
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="shadow-lg rounded p-5 w-md-25 width-50">
                <h2 className="login-form-title text-center mb-3">Enter your One Time Password</h2>
                <h6 className="w-75 text-center m-auto mb-3">
                    Enter your One Time Password and we will send you instructions to reset your password.
                </h6>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center mb-4">
                        {otp.map((_, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                maxLength="1"
                                value={otp[index]}
                                onChange={e => handleChange(e, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                className="form-control otp-input mx-1 text-center"
                                style={{ width: "50px", fontSize: "24px" }} // Adjust styles for better visual
                            />
                        ))}
                    </div>
                    <div>
                        <Button type="submit">Continue</Button>
                        <button className="w-100 rounded p-2 mt-2 btn-secondary">
                            <Link to="/" className="text-decoration-none text-black">Back to LMS</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;
