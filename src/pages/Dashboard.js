import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  School, Users, Book, List, User2, LogOut, User,
  ShieldMinus, Heart, Menu, X,
  UserIcon
} from 'lucide-react'; // Import Lucide icons
import { jwtDecode } from "jwt-decode";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [showUser, setShowUser] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const userPanelRef = useRef(null);
  const token = localStorage.getItem('token');
  const userInfo = token && jwtDecode(token)
  console.log(userInfo);
  const navLinks = {
    SUPER_ADMIN: [
      { path: "/superadmin", name: "Dashboard", icon: <ShieldMinus strokeWidth={2} className="icon-size" /> },
      { path: "/superadmin/school", name: "School", icon: <School strokeWidth={2} className="icon-size" /> },
    ],
    ADMIN: [
      { path: "/admin", name: "Dashboard", icon: <ShieldMinus className="icon-size" /> },
      { path: "/admin/sub-admin", name: "Sub-admin", icon: <UserIcon className="icon-size" /> },
      { path: "/admin/teachers", name: "Teachers", icon: <Users className="icon-size" /> },
      { path: "/admin/students", name: "Students", icon: <User2 strokeWidth={2} className="icon-size" /> },
      { path: "/admin/courses", name: "Courses", icon: <Book className="icon-size" /> },
    ],
    TEACHER: [
      { path: "/teacher", name: "Dashboard", icon: <ShieldMinus className="icon-size" /> },
      { path: "/teacher/courses", name: "Courses", icon: <Book className="icon-size" /> },
      { path: "/teacher/students", name: "Students", icon: <Users className="icon-size" /> },
    ],
    STUDENT: [
      { path: userInfo.claims.type == "EXTERNAL" ? "/external-student" : "/student", name: "Dashboard", icon: <ShieldMinus className="icon-size" /> },
      { path: userInfo.claims.type == "EXTERNAL" ? "/external-student/courses" : "/courses", name: "Courses", icon: <Book className="icon-size" /> },
    ],
    SUB_ADMIN: [
      { path: "/subadmin", name: "Dashboard", icon: <ShieldMinus strokeWidth={2} className="icon-size" /> },
      { path: "/subadmin/teachers", name: "Teachers", icon: <Users className="icon-size" /> },
      { path: "/subadmin/students", name: "Students", icon: <User2 strokeWidth={2} className="icon-size" /> },
      { path: "/subadmin/courses", name: "Courses", icon: <Book className="icon-size" /> },
    ],
  };

  const linksToDisplay = role ? navLinks[role] : [];

  const toggleUser = () => {
    setShowUser((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    toggleUser();
    navigate("/");
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar((prev) => !prev);
  };

  const userData = jwtDecode(localStorage.getItem("token"));
  console.log(userData);

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

  useEffect(() => {
    return () => {
      setShowSidebar(false);
      setShowMobileSidebar(false);
    };
  }, []);

  return (
    <div>
      {/* Sidebar */}
      {showSidebar && (
        <div className="col-12 col-md-3 col-lg-2 sidebar bg-gray position-fixed vh-100 d-flex flex-column p-3 d-none d-md-block">
          <div className="d-flex flex-column align-items-center">
            <Link to="/" className="text-center fs-5 my-3 text-white text-decoration-none fw-light">
              L M S
            </Link>
            <ul className="nav flex-column mb-auto w-100">
              {linksToDisplay.map((link, index) => (
                <li key={index} className="nav-item mb-2">
                  <Link
                    to={link.path}
                    className={`fs-6 d-flex align-items-center justify-content-start gap-3 p-2 px-4 text-decoration-none ${location.pathname === link.path ? "bg-white text-black rounded" : "text-white"
                      }`}
                  >
                    <span className={`${location.pathname === link.path ? "bg-white text-black rounded" : "text-lime"}`}>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`col-12 ${showSidebar && "col-md-9 col-lg-10 offset-md-3 offset-lg-2"} mt-md-0`}>
        {/* Navbar */}
        <div className="position-sticky top-0 w-100 bg-white p-2 p-md-3 border-bottom" style={{ zIndex: 1000 }}>
          <div className="d-flex justify-content-between align-items-center">
            {showMobileSidebar && (
              <ul className="nav d-flex d-md-none position-absolute shadow-lg top-0 left-0 flex-column bg-white vh-100">
                <div className="w-100 d-flex align-content-center justify-content-end">
                  <X onClick={toggleMobileSidebar} className="cursor-pointer small-icon my-2 mx-2" />
                </div>
                {linksToDisplay.map((link, index) => (
                  <li key={index} className="nav-item m-2">
                    <Link
                      to={link.path}
                      className={`text-decoration-none d-flex align-items-center justify-content-start gap-2 me-2 p-2 ${location.pathname === link.path ? "bg-gray-color text-white rounded navbar" : "text-black"
                        }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <div className="w-100 d-flex justify-content-between px-3 align-items-center">
              <Menu className="cursor-pointer d-md-block d-none" onClick={toggleSidebar} />
              <Menu className="cursor-pointer d-md-none d-block" onClick={toggleMobileSidebar} />
              {/* User Icon */}
              <div className="ms-auto gap-3 d-flex align-items-center justify-content-center">
                <input className="navbar-search d-none d-md-block" placeholder="search" />
                {role === "STUDENT" && <Link to="/student/wishlist" className="text-black d-inline-block">
                  <Heart />
                </Link>}
                <User
                  className="bg-gray text-white rounded-5 icon-small cursor-pointer"
                  style={{ padding: "7px", width: "2.2rem", height: "2.2rem" }}
                  onClick={toggleUser}
                />
                {showUser && (
                  <div
                    ref={userPanelRef}
                    className="shadow-lg position-absolute vh-100 bg-white px-3 right-0 top-0"
                    style={{ right: 0, top: '3rem', zIndex: 100, width: "18rem" }}
                  >
                    <div className="d-flex flex-column align-items-start">
                      <div className="w-100 d-flex align-content-center justify-content-end">
                        <X onClick={toggleUser} className="cursor-pointer small-icon my-3" />
                      </div>
                      <div className="d-flex align-items-center mb-3 w-100">
                        <div className="text-center mx-auto">
                          <User className="me-2 mb-2" style={{ width: "4rem", height: "4rem" }} />
                          <div className="fw-bold text-capitalize">{userData?.claims?.name}</div>
                          <div className="text-muted">{userData?.claims?.email}</div>
                          <div className="text-muted">+91-{userData?.claims?.phoneNumber}</div>
                        </div>
                      </div>
                      {userData?.claims?.role === "ADMIN" && (
                        <NavLink
                          to={`/admin/${userData?.claims?.id}/reset-password`}
                          className="btn btn-light w-100 text-start mb-2"
                          onClick={toggleUser}
                        >
                          Reset Password
                        </NavLink>
                      )}
                      {userData?.claims?.role === "TEACHER" && (
                        <NavLink
                          to={`/teacher/${userData?.claims?.id}/reset-password`}
                          className="btn btn-light w-100 text-start mb-2"
                          onClick={toggleUser}
                        >
                          Reset Password
                        </NavLink>
                      )}
                      <NavLink to="/settings" className="btn btn-light w-100 text-start mb-2">
                        Settings
                      </NavLink>
                      <button onClick={handleLogout} className="btn btn-light w-100 text-start">
                        <LogOut className="small-icon me-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
