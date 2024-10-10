import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../App";
import { ArrowLeft } from "lucide-react";

const SingleEbook = () => {
    const [ebook, setEbook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [url, setEbookUrl] = useState("");
    const { id } = useParams();
    const navigate=useNavigate()

    useEffect(() => {
        const fetchEbook = async () => {
            try {
                const response = await axios.get(`/ebooks/${id}`);
                const modifiedUrl = response.data.filePath.replace('http://localhost:8080 ', baseUrl);
                let parts = modifiedUrl.split(baseUrl);
                let cleanedUrl = baseUrl + parts[1].trim();
                setEbook(response.data);
                setEbookUrl(() => cleanedUrl);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch ebook. Please try again later.');
                setLoading(false);
            }
        };
        fetchEbook()
    }, [id]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger m-3" role="alert">{error}</div>;
    if (!ebook) return <div className="alert alert-warning m-3" role="alert">No ebook found</div>;

    return (
        <div className="container mt-5">
            <button

                className="btn  btn-sm d-flex align-items-center  gap-2 text-black"

                onClick={() => navigate(-1)}

            >

                <ArrowLeft />Back

            </button>
            <div className="card">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="img-fluid rounded-start " style={{ height: '100%', objectFit: "cover" }}
                            alt={`Cover of ${ebook.title}`}
                        />
                    </div>
                    <div className="col-md-8 ">
                        <div className="card-body  d-flex align-items-start gap-2 flex-column " style={{ height: "100%" }}>
                            <div className="fs-2 text-capitalize">{ebook.title}</div>
                            <div className="card-text fs-6"><>Author:</> {ebook.author}</div>
                            <div className="card-text fs-6 description"><>Description:</> {ebook.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</div>
                            <div className="card-text fs-6">
                                <strong>Published Date:</strong> {new Date(ebook.publishedDate).toLocaleDateString()}
                            </div>

                            {url.length > 0 ? (
                                <div className="mt-4">
                                    <Link
                                        to={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        Open PDF
                                    </Link>
                                </div>
                            ) : (
                                <span className="text-muted">Loading PDF...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleEbook;
