import { jwtDecode } from 'jwt-decode';
import { User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const userPanelRef = useRef(null);
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false)
  const role = localStorage.getItem('role');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("role");
    localStorage.removeItem("adminId");
    toggleUser()
    navigate("/student/login");
  };

  useEffect(() => {
    // Click outside logic
    const handleClickOutside = (event) => {
      if (userPanelRef.current && !userPanelRef.current.contains(event.target)) {
        setShowUser(false);
      }
    };

    // Add click event listener when the user panel is open
    if (showUser) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUser]);

  const token = localStorage.getItem("token")
  const userInfo = token && jwtDecode(token)
  console.log(userInfo)
  const navLinks = {
    SUPER_ADMIN: [
      { path: "/superadmin", name: "Dashboard", },
    ],
    ADMIN: [
      { path: "/admin", name: "Dashboard", },
    ],
    TEACHER: [
      { path: "/teacher", name: "Dashboard", },
    ],
    STUDENT: [
      { path: "/student", name: "Dashboard" },
    ],
    SUB_ADMIN: [
      { path: "/subadmin", name: "Dashboard" },
    ],
  };
  const linksToDisplay = role ? navLinks[role][0] : [];
  const toggleUser = () => {
    setShowUser((prev) => !prev)
  }
  return (
    <div className="position-sticky main-navbar position-relative top-0 w-100 p-2 p-md-2 border-bottom shadow-lg" style={{ zIndex: 1000 }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100 rounded-5 d-flex justify-content-between px-4 align-items-center">
          <Link to={"/"} className='text-white text-decoration-none fs-2'>LMS</Link>
          {/* User Icon */}
          <div className=" ms-auto">
            <User className="bg-lime text-black rounded-5 icon-small cursor-pointer" style={{ padding: "7px", width: "2.2rem", height: "2.2rem" }} onClick={toggleUser} />
            {showUser && (
              <div ref={userPanelRef} className="shadow-lg position-absolute p-3 vh-100  bg-white" style={{ right: 0, top: 0, zIndex: 100, width: "18rem" }}>
                <div className="d-flex flex-column align-items-start">
                  {userInfo && <>
                    <div className='user-info-container mb-4 w-100'>
                      <div className='d-flex align-items-center justify-content-center my-2'>
                        <User className='text-black mx-auto ' style={{ width: "64px", height: "64px" }} />
                      </div>
                      <div className='d-flex align-items-center w-100 justify-content-between text-black'>
                        <div>Email</div>: <div>{userInfo.claims.email}</div>
                      </div>

                      <div className='d-flex align-items-center w-100 justify-content-between text-black'>
                        <div>Name</div>: <div>{userInfo.claims.name}</div>
                      </div>
                      <div className='d-flex align-items-center w-100 justify-content-between text-black'>
                        <div>Phone Number</div>: <div>{userInfo.claims.phoneNumber}</div>
                      </div>

                    </div>

                    <NavLink
                      to={linksToDisplay.path}
                      className="btn btn-light w-100 text-start mb-2"
                      onClick={toggleUser} // Close dropdown when clicked
                    >
                      {linksToDisplay.name}
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className="btn btn-light w-100 text-start mb-2"
                      onClick={toggleUser} // Close dropdown when clicked
                    >
                      View Profile
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="btn btn-light w-100 text-start mb-2"
                      onClick={toggleUser} // Close dropdown when clicked
                    >
                      Settings
                    </NavLink>
                    <button
                      className="btn btn-light w-100 text-start text-danger"
                      onClick={handleLogout} // Close dropdown when clicked
                    >
                      Logout
                    </button></>}
                  {
                    !userInfo && <>
                      <div className='text-black p-2 fs-6 text-center w-100'>Hello! You are New Here</div>
                      {/* <Button> */}
                      <Link to={"/student/login"} className='text-decoration-none  w-100 btn btn-dark-outline blue'>Login</Link>
                      {/* </Button> */}
                      {/* <Button> */}
                      <Link to={"/signup"} className='text-decoration-none mt-2 blue w-100 btn btn-dark-outline'>SignUp</Link>
                      {/* </Button> */}
                    </>
                  }
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div >
  )
}
