import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../include/Button"; // Assuming your Button component supports a loading prop
import { EyeIcon, EyeOff } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fixed the import, jwtDecode shouldn't be wrapped with {}
import toast from "react-hot-toast";

function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const location = useLocation()
  console.log(location.pathname);

  // Check authentication and role on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      navigateByRole(role);
    }
  }, [navigate]);

  // Function to navigate based on user role
  const navigateByRole = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        navigate("/superadmin");
        break;
      case "ADMIN":
        navigate("/admin");
        break;
      case "TEACHER":
        navigate("/teacher");
        break;
      case "STUDENT":
        navigate("/student");
        break;
      default:
        navigate("/");
    }
  };

  // Toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true); // Set loading state to true
    try {
      const { data: response } = await axios.post(location.pathname, data);
      const token = response.response;
      const decoded = jwtDecode(token);
      // console.log(decoded);

      // Store token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.claims.role);
      if (location.pathname == "/login") {
        localStorage.setItem("adminId", decoded?.claims?.id);
      }
      else if (location.pathname = "/teacher/login") {
        localStorage.setItem("adminId", decoded?.claims?.adminId);
        localStorage.setItem("teacherId", decoded?.claims?.id);
      }
      else if (location.pathname = "/student/login") {
        localStorage.setItem("adminId", decoded?.claims?.adminId)
      }
      toast.success("Successfully logged in");

      if (decoded.claims.type == "EXTERNAL") {
        console.log(decoded.claims, "external")
        navigate("/external-student")
      }
      else {
        // Navigate based on decoded role
        navigateByRole(decoded?.claims?.role);
      }
    } catch (error) {
      console.error(error);
      console.error(error?.message);
      toast.error(error?.response?.data?.response || "Something went wrong");

    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-8 col-lg-4 col-xl-3 col-md-6 d-flex flex-column login-center-div shadow-lg align-items-center justify-content-center p-4">
          <h2 className="login-form-title text-center mb-2 fs-2 fw-bolder">Welcome</h2>
          <div className="form-heading">
            <p>Log in to LMS.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
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
                    message: "Email is not valid",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && <p className="text-danger errorFormHandler">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="row">
              <div className="col-md-12 position-relative">
                <input
                  type={!showPassword ? "password" : "text"}
                  className="form-control login-form-input"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  placeholder="Password"
                />
                <div className="eye-icon" onClick={handleShowPassword}>
                  {showPassword ? <EyeIcon /> : <EyeOff />}
                </div>
              </div>
              {errors.password && <p className="text-danger errorFormHandler">{errors.password.message}</p>}
              <div className="mt-2">
                {location.pathname.includes("/teacher") ? <Link to="/teacher/forget-password" className="forget-password">
                  Forget password?
                </Link> : location.pathname.includes("/student") ? <Link to="/student/forget-password" className="forget-password">
                  Forget password?
                </Link> : <Link to="/forget-password" className="forget-password">
                  Forget password?
                </Link>}

              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <Button type="submit" loading={loading}> {/* Pass the loading prop */}
                {loading ? "Signing In..." : "Sign In"} {/* Button text changes based on loading state */}
              </Button>
            </div>

            <div className="d-flex align-items-center flex-column justify-content-between mt-4">
              {location.pathname.includes("/teacher") ? "" : <div className="mt-1 text-center already-account">
                Teacher Login? <Link to="/teacher/login">Teacher Login</Link>
              </div>}
              {location.pathname.includes("/student") ? "" : <div className="mt-1 text-center already-account">
                Are you a Student ? <Link to="/student/login">Student Login</Link>
              </div>}
              {location.pathname=="/login" ? "" : <div className="mt-1 text-center already-account">
                administrator Login ? <Link to="/login">Admin Login</Link>
              </div>}
            </div>
            <p className="mt-2 text-center already-account">
              Don't have an Account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
