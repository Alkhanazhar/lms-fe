import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Courses from "./pages/Courses";
import axios from "axios"
import Home from "./pages/Home";
import School from "./pages/School";
import Students from "./pages/Students";
import CreateCourses from "./pages/CreateCourse";
import TeacherDashboard from "./pages/TeacherDashboard";
import Teacher from "./pages/Teacher";
import CreateTeacher from "./pages/CreateTeacher";
import CreateSchool from "./pages/CreateSchool";
import CreateStudent from "./pages/CreateStudent";
import Videos from "./include/Video";
import StudentDashboard from "./pages/StudentDashboard";
import SingleSchool from "./pages/SingleSchool";
import SingleTeacher from "./pages/SingleTeacher";
import VideoUpload from "./pages/VideoUpload";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import 'react-tooltip/dist/react-tooltip.css'
import SingleStudent from "./pages/SingleStudent";
import SettingsProfile from "./pages/SettingsProfile";
import StudentWishList from "./pages/StudentWhishList";
import SubAdmin from "./pages/SubAdmin";
import CreateSubAdmin from "./pages/CreateSubAdmin";
import EbookUpload from "./pages/EbookUpload";
import SingleCourse from "./pages/SingleCourse";
import ExternalStudent from "./pages/ExternalStudent";
import SingleEbook from "./pages/SingleEbook";

// function ProtectedRoute({ children, allowedRoles }) {
//   const location = useLocation();
// const role = localStorage.getItem("role");
//   if (!role) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }
//   return children;
// }

axios.defaults.baseURL = "http://localhost:3001/api/"
export const baseUrl = "http://localhost:3001"

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const role = localStorage.getItem("role");
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/not-found" state={{ from: location }} />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/teacher/login" element={<Login />} />
        <Route path="/student/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/forget-password" element={<ForgetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Discover />} />
        <Route path="/search/:id" element={<Discover />} />
        {/* <Route path="/search/:searchText" element={<SearchPage />} /> */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<SettingsProfile />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="teacher/forget-password" element={<ForgetPassword />} />
        <Route path="student/forget-password" element={<ForgetPassword />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        {/* Superadmin Routes */}
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <Routes>
                <Route path="/" element={<Dashboard />} >
                  {/* Add more parent routes here if needed */}
                  <Route path="/" element={<SuperAdminDashboard />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/create" element={<CreateCourses />} />
                  <Route path="school" element={<School />} />
                  <Route path="school/:id" element={<SingleSchool />} />
                  <Route path="school/:id/edit" element={<CreateSchool />} />
                  <Route path="school/create" element={<CreateSchool />} />
                  <Route path="students" element={<Students />} />
                  <Route path="students/:id" element={<SingleStudent />} />
                  <Route path="teachers" element={<Teacher />} />
                  <Route path="teachers/:id" element={<SingleTeacher />} />
                  <Route path="courses/:courseId" element={<SingleCourse />} />
                  <Route path="courses/:courseId/ebook/:id" element={<SingleEbook />} />
                </Route>

                {/* <Route path="courses/:courseId/videos" element={<Video />} /> */}
              </Routes>
            </ProtectedRoute>
          }
        />
        {/* Parent Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              {/* <ProtectedRoute allowedRoles={["parent"]}> */}
              <Routes>
                <Route path="/" element={<Dashboard />} >
                  {/* Add more parent routes here if needed */}
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/create" element={<CreateCourses />} />
                  <Route path="students" element={<Students />} />
                  <Route path="teachers" element={<Teacher />} />
                  <Route path="sub-admin" element={<SubAdmin />} />
                  <Route path="sub-admin/create" element={<CreateSubAdmin />} />
                  <Route path="teachers/:id" element={<SingleTeacher />} />
                  <Route path="teachers/:id/edit" element={<CreateTeacher />} />
                  <Route path="teachers/create" element={<CreateTeacher />} />
                  <Route path=":id/reset-password" element={<ResetPassword />} />
                  <Route path="courses/:courseId" element={<SingleCourse />} />
                  <Route path="courses/:courseId/ebook/:id" element={<SingleEbook />} />
                </Route>
              </Routes>
            </ProtectedRoute>}
        />


        <Route
          path="/subadmin/*"
          element={
            <ProtectedRoute allowedRoles={["SUB_ADMIN"]}>
              {/* <ProtectedRoute allowedRoles={["parent"]}> */}
              <Routes>
                <Route path="/" element={<Dashboard />} >
                  {/* Add more parent routes here if needed */}
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/create" element={<CreateCourses />} />
                  <Route path="students" element={<Students />} />
                  <Route path="teachers" element={<Teacher />} />
                  <Route path="sub-admin" element={<SubAdmin />} />
                  <Route path="sub-admin/create" element={<CreateSubAdmin />} />
                  <Route path="teachers/:id" element={<SingleTeacher />} />
                  <Route path="teachers/:id/edit" element={<CreateTeacher />} />
                  <Route path="teachers/create" element={<CreateTeacher />} />
                  <Route path=":id/reset-password" element={<ResetPassword />} />
                  <Route path="courses/:courseId" element={<SingleCourse />} />
                  <Route path="courses/:courseId/ebook/:id" element={<SingleEbook />} />
                </Route>
                {/* <Route path="courses/:courseId" element={<Videos />} /> */}
              </Routes>
            </ProtectedRoute>}
        />
        {/* Employee Routes */}
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <Routes>
                <Route path="/" element={<Dashboard />} >
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/create" element={<CreateCourses />} />
                  <Route path="courses/video-upload/:courseId" element={<VideoUpload />} />
                  <Route path="courses/ebook-upload/:courseId" element={<EbookUpload />} />
                  <Route path="students" element={<Students />} />
                  <Route path="students/:id" element={<SingleStudent />} />
                  <Route path="students/create" element={<CreateStudent />} />
                  <Route path="/" element={<TeacherDashboard />} />
                  <Route path=":id/reset-password" element={<ResetPassword />} />
                  <Route path="courses/:courseId" element={<SingleCourse />} />
                  <Route path="courses/:courseId/ebook/:id" element={<SingleEbook />} />
                  {/* Add more parent routes here if needed */}
                </Route>
                <Route path="courses/:courseId/videos" element={<Videos />} />

              </Routes>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Routes>
                <Route path="/" element={<Dashboard />} >
                  <Route path="courses" element={<Courses />} />
                  <Route path="/" element={<StudentDashboard />} />
                  <Route path="wishlist" element={<StudentWishList />} />
                  <Route path="courses/:courseId" element={<SingleCourse />} />
                  <Route path="courses/:courseId/ebook/:id" element={<SingleEbook />} />
                </Route>
                {/* Add more employee routes here if needed */}
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route
          path="/external-student/*"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Routes>
                <Route path="/" element={<Dashboard />} >
                  <Route path="courses" element={<Courses />} />
                  <Route path="/" element={<ExternalStudent />} />
                  <Route path="wishlist" element={<StudentWishList />} />
                  <Route path="courses/:courseId" element={<SingleCourse />} />
                  <Route path="courses/:courseId/ebook/:id" element={<SingleEbook />} />
                </Route>
                {/* Add more employee routes here if needed */}
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/*"
          element={
            <ProtectedRoute allowedRoles={["child"]}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
}
