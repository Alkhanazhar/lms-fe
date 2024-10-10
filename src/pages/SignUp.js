import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOff } from "lucide-react"
import Button from "../include/Button";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {

  const location = useLocation()
  const [showPassword, setShowPassword] = useState(true)
  const { register, formState: { errors }, handleSubmit } = useForm()
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/student-external", data);
      console.log(res.data)
      navigate("/login")
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong Try again")
    }
  };

  // Effect to check authentication and role on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token || role) {
      if (role === "SUPER_ADMIN") {
        navigate("/superadmin");
      } else if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "TEACHER") {
        navigate("/teacher");
      }
    }
  }, [navigate]);

  return (
    <div className="relative ">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center ">
          <div className="col-12 col-lg-3 d-flex flex-column login-center-div shadow-lg align-items-center justify-content-center p-4">
            <h2 className="login-form-title text-center mb-2 fw-bold fs-2">Welcome</h2>
            <div className="form-heading ">
              <p >Sign up to LMS.</p>
            </div>
            {/* Your content goes here */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-100">
              {/* Name */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control login-form-input"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: 3,
                  })}
                  placeholder="Name"
                />
                {errors.name && <p className="text-danger errorFormHandler">{errors.name.message}</p>}
              </div>
              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control login-form-input"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Email is not valid"
                    }
                  })}
                  placeholder="Email"
                />
                {errors.email && <p className="text-danger errorFormHandler">{errors.email.message}</p>}
              </div>
              {/* PhoneNumber */}
              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control login-form-input"
                  id="phoneNumber"
                  {...register('phoneNumber', {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/, // Exactly 11 digits
                      message: "Phone number must be exactly 10 digits"
                    }
                  })}
                  placeholder="Phone number"
                />
                {errors.phoneNumber && <p className="text-danger errorFormHandler">{errors.phoneNumber.message}</p>}
              </div>



              {/* Username */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control login-form-input"
                  id="userName"
                  {...register("username", {
                    required: "username is required",
                  })}
                  placeholder="Username"
                />
                {errors.username && <p className="text-danger errorFormHandler">{errors.username.message}</p>}
              </div>
              {/* Password */}
              <div className="row mt-2">
                <div className="col-md-12 position-relative">
                  <input
                    type={showPassword ? "password" : "text"}
                    className="form-control login-form-input"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long"
                      }
                    })}
                    placeholder="Password"
                  />
                  <div className="eye-icon" onClick={handleShowPassword}>
                    {showPassword ? <EyeIcon /> : <EyeOff />}
                  </div>

                </div>
                {errors.password && <p className="text-danger errorFormHandler">{errors.password.message}</p>}
              </div>
              {/* Submit Button */}
              <div className="d-grid mt-2">
                <Button type="submit"  >Sign up</Button>
              </div>
              <p className="mt-2 text-center already-account">
                Already have an Account <Link to={"/login"}>Login</Link>  </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
