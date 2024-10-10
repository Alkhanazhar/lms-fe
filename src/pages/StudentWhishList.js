import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Bookmark, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const StudentWishList = () => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const userDetails = token && jwtDecode(token)
    const [data, setData] = useState([])
    console.log(userDetails)
    const fetchWishList = async () => {
        try {
            const response = await axios.get("/student/" + userDetails?.claims?.studentId + "/wishlist")
            console.log(response.data)
            setData(() => response.data)
            console.log("wishlist")
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleToggleWishlist = async (course) => {
        try {
            await axios.post("http://localhost:3001/" + userDetails?.claims?.studentId + "/wishlist/" + course?.id + "/toggle", {
                studentId: userDetails?.claims?.studentId,
                courseId: course?.id
            });
            fetchWishList();
        } catch (error) {
            console.log("Failed to toggle wishlist");
        }
    };

    useEffect(() => {
        fetchWishList()
    }, [])

    return (
        <div className="container">
            <div className="w-100 align-items-center justify-content-between mb-3">
                <div className="fs-3 fw-semibold">Wishlist</div>
                <div className="row g-3 mb-2 mt-1">
                    {data?.length === 0 && <div className="text-center">No courses found</div>}
                    {data?.map(course => (
                        <div key={course?.id} className="col-12 col-md-6 col-lg-3">
                            <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".6rem" }}>
                                <img src={course?.thumbnail} className="card-img-top" alt={course?.courseName} style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }} />
                                <div className="text-white pt-2 px-1">
                                    <div className="d-flex justify-content-between">
                                        <div className='w-100'>
                                            <div className='d-flex align-items-center justify-content-between w-100'>
                                                <div className="card-title fs-5 text-capitalize">{course?.courseName}</div>

                                            </div>
                                            {userDetails?.claims?.type == "INTERNAL" && <div className={`text-small fw-medium ${course?.courseType === "PRIVATE" ? "text-success" : "text-danger"}`}>{course?.courseType}</div>}
                                        </div>
                                    </div>
                                    {role === "STUDENT" && (
                                        <div className='w-100 d-flex justify-content-end'>
                                            <Bookmark onClick={() => handleToggleWishlist(course)} className={`small-icon cursor-pointer`} />
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StudentWishList