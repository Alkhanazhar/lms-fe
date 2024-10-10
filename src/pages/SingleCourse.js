import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SingleCourse = () => {
    const { courseId } = useParams();
    const [videosData, setVideosData] = useState([]);
    const [ebooksData, setEbooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const role=localStorage.getItem("role")

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`videos/course/${courseId}`);
            console.log(response.data);
            setVideosData(response.data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const fetchEbooks = async () => {
        try {
            const response = await axios.get(`ebooks/course/${courseId}`);
            console.log(response.data)
            setEbooksData(response.data.ebooks);
        } catch (error) {
            console.error("Error fetching ebooks:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCourse(), fetchEbooks()]);
            setLoading(false);
        };
        fetchData();
    }, [courseId]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (videosData.length === 0 && ebooksData.length === 0) {
        return (
            <div>
                <button
                    className="btn text-black btn-sm d-flex align-items-center gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="small-icon" />
                    Back
                </button>
                <div className="text-center">No content found for this course</div>
            </div>
        );
    }

    return (
        <div className="container ">
            <button
                className="btn text-black btn-sm d-flex align-items-center gap-2 mb-4"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="small-icon" />
                Back
            </button>
            {videosData?.length > 0 && (
                <div className="row my-4">
                    <h2 className="mb-3">Videos</h2>
                    <div className="row row-cols-1 row-cols-md-3">
                        {videosData.map((video) => (
                            <div key={video?.id} className="col-12 col-md-6 col-lg-3">
                                <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".6rem" }}>
                                    <Link to={`${role === "ADMIN" ? "/admin/" : role === "TEACHER" ? "/teacher/" : role === "SUPER_ADMIN" ? "/superadmin/" : role === "STUDENT" ? "/student/" : ""}courses/${video?.courseId}/videos`}>
                                        <img src={'https://plus.unsplash.com/premium_photo-1709384733824-ce2b3cc8dcd1?q=80&w=1815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} className="card-img-top" alt={video?.courseName} style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }} />
                                    </Link>
                                    <div className="card-title fs-5 text-white text-capitalize">{video?.name}</div>
                                    <p className="text-white">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {ebooksData.length > 0 && (
                <div className="my-4">
                    <h2 className="mb-3">Ebooks</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {ebooksData.map((ebook) => {
                            return <div key={ebook?.id} className="col-12 col-md-6 col-lg-3">
                                <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".6rem" }}>
                                    <Link to={"ebook/" + ebook.id} className="text-decoration-none">
                                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ70qdkYWc_o9uyXoAggMWWy0hqqoX_GLBffQ&s"} className="card-img-top object-cover" style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }} alt={ebook.title} />
                                        <div className="text-white p-2">
                                            <h5 className="card-title">{ebook.title}</h5>
                                            <p className="">{ebook.author}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleCourse;
