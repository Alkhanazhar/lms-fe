import axios from 'axios';
import { ArrowDownToDotIcon, Bookmark, ChevronDown, ChevronUp, Plus, Tag, TagIcon, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../include/DeleteModal';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip'

const Courses = () => {
  const [showMore, setShowMore] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const role = localStorage.getItem("role");
  const user = jwtDecode(localStorage.getItem("token"))

  const fetchCourses = async () => {
    try {
      let response;
      console.log(localStorage.getItem("role"));
      if (role === "SUPER_ADMIN") {
        response = await axios.get("courses/list");

      } else if (role === "ADMIN") {
        response = await axios.get("/courses/admin/" + localStorage.getItem("adminId"));
      } else if (role === "TEACHER") {
        response = await axios.get("/courses/teacher/" + localStorage.getItem("teacherId"));
      } else if (role === "STUDENT") {
        if (user.claims.type) {
          if (user.claims.type == "INTERNAL") {
            response = await axios.get("/courses/admin/" + localStorage.getItem("adminId"));
          }
          else if (user.claims.type == "EXTERNAL") {
            response = await axios.get("/courses/type/PUBLIC")
          }
        }
      }
      setCourses(response?.data);
      setFilteredCourses(response?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectChange = (event, course) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Navigate based on the selected option
    switch (value) {
      case 'addVideo':
        navigate(`video-upload/${course?.id}`);
        break;
      case 'addEbook':
        navigate(`ebook-upload/${course?.id}`);
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  };

  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  const handleEdit = (id) => {
    navigate(`/superadmin/school/${id}/edit`);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`/courses/delete/${courseId}`);
      const copy = courses?.filter(course => course?.id !== courseId);
      setCourses(copy);
      setFilteredCourses(copy);
      toast.success("Course deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete student.");
      console.log(err);
    }
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    if (filter === "ALL") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses?.filter(course => course?.courseType === filter));
    }
  };

  const handleToggleWishlist = async (course) => {
    try {
      await axios.post("http://localhost:3001/" + user?.claims?.studentId + "/wishlist/" + course?.id + "/toggle", {
        studentId: user?.claims?.studentId,
        courseId: course?.id
      });
      fetchWishlist();
    } catch (error) {
      console.log("Failed to toggle wishlist");
    }
  };

  const visibleCourses = showMore ? filteredCourses : filteredCourses?.slice(0, 4);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const location = useLocation();

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("student/" + user?.claims?.studentId + "/wishlist");
      console.log(response.data, "wishlist");
      setWishlist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (role == "STUDENT") fetchWishlist();
  }, []);

  return (
    <div className="container">
      <div className="d-flex w-100 align-items-center justify-content-between mb-3">
        <div className="fs-3 fw-semibold">Course</div>
        {(role === "TEACHER" || role === "SUB_ADMIN") &&
          <Link to={location.pathname + "/create"} className='blue text-white btn dashboard-btn-shadow fw-medium'>Create Course</Link>
        }
        {role === "ADMIN" && courses.length > 0 && (
          <div>
            <select className='form-select' onChange={handleFilterChange}>
              <option value="ALL">All</option>
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>
        )}
      </div>
      <div className="row g-3 mb-2">
        {filteredCourses?.length === 0 && <div className="text-center">No courses found</div>}
        {visibleCourses?.map(course => (
          <div key={course?.id} className="col-12 col-md-6 col-lg-3">
            <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".6rem" }}>
              <Link to={`${role === "ADMIN" ? "/admin/" : role === "TEACHER" ? "/teacher/" : role === "SUPER_ADMIN" ? "/superadmin/" : role === "STUDENT" ? "/student/" : ""}courses/${course?.id}`}>
                <img src={course?.thumbnail} className="card-img-top" alt={course?.courseName} style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }} />
              </Link>
              <div className="text-white pt-2 px-1">
                <div className="d-flex justify-content-between">
                  <div className='w-100'>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                      <div className="card-title fs-5 text-capitalize">{course?.courseName}</div>
                      {role === "ADMIN" &&
                        <Trash2 className='small-icon text-danger cursor-pointer' onClick={() => openDeleteModal(course)} />}
                    </div>
                    {user?.claims?.type == "INTERNAL" && <div className={`text-small fw-medium ${course?.courseType === "PRIVATE" ? "text-success" : "text-danger"}`}>{course?.courseType}</div>}
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <div className="fw-medium text-gray description">{course?.description?.substring(0, 40)}</div>
                  {role === "TEACHER" && <select
                    className="form-select-sm"
                    value={selectedOption}
                    onChange={(e) => handleSelectChange(e, course)}
                    aria-label="Select course material"
                  >
                    <option value=""><Plus className='text-black' />Add material</option>
                    <option value="addVideo">Add Video</option>
                    <option value="addEbook">Add eBook</option>
                  </select>}
                  {role === "STUDENT" && (
                    <div>
                      <Bookmark onClick={() => handleToggleWishlist(course)} data-tooltip-id={`${course?.courseName}`} data-tooltip-content="Add to wishlist!" className={`small-icon cursor-pointer ${wishlist.includes(course?.courseId) && "text-danger bg-black"}`} />
                      <Tooltip id={course?.courseName} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        filteredCourses?.length > 4 && (
          <div className="text-center mb-2">
            <button className="btn text-black" onClick={toggleShowMore}>
              {showMore ? "Show Less" : "Show More"}
              {showMore ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        )
      }
      {
        studentToDelete &&
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={() => {
            handleDelete(studentToDelete.id);
            closeDeleteModal();
          }}
          studentName={studentToDelete.name}
        />
      }
    </div>
  );
};

export default Courses;
