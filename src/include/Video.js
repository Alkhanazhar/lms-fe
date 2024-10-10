import { useEffect, useState } from "react";
import Player from "./Player"

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { ArrowLeft } from "lucide-react";

export default function Videos() {

    const { courseId } = useParams();

    const [videosData, setVideosData] = useState([]); // Initialize as an empty array

    const [playing, setPlaying] = useState(null); // Initialize as null

    const navigate = useNavigate();

    const fetchCourse = async () => {

        try {

            const response = await axios.get("videos/course/" + courseId);

            console.log(response.data, "videos");

            setVideosData(response.data);

            setPlaying(response.data[0]); // Set the first video as the currently playing video

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchCourse();

        // Cleanup function to reset 'playing' state on component unmount

        return () => {

            setPlaying(null); // Clear the 'playing' state when the component unmounts

        };

    }, [courseId]); // Re-fetch data if courseId changes

    return (

        <main className={"bg-gray-color"}>

            <button
                className="btn text-white btn-sm d-flex align-items-center ms-3 gap-2 pt-3" onClick={() => navigate(-1)}
            ><ArrowLeft />Back
            </button>

            <div className="main">

                <div>

                    {playing ? (

                        <>

                            <Player autoPlay={true} videoURL={playing?.videoPaths[0]} />

                            <div className={"videoDetails"}>

                                <h2>{playing?.title}</h2>

                                <p className={"desc"}>{playing?.description}</p>

                            </div>

                        </>

                    ) : (

                        <p>Loading video...</p> // Optional loading state

                    )}

                </div>

                <div>

                    {

                        <div className={"listContainer"}>

                            {videosData?.map((video) => {

                                return (

                                    <div

                                        className="listItem px-2 position-relative"

                                        key={video?.sources?.[0]}

                                        onClick={() => {

                                            setPlaying(video);

                                        }}

                                    >

                                        <div className="d-flex align-items-center justify-content-center">

                                            <img

                                                src="https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

                                                width={"50"}

                                                height={"50"}

                                                alt="video thumb"

                                            />

                                        </div>

                                        <div className="w-50">

                                            <h3 className="text-capitalize">{video?.title}</h3>

                                            <p>{video?.description}</p>

                                        </div>

                                        {playing?.id === video?.id && (

                                            <div className="w-100 h-100 position-absolute top-0 left-0 bg-gray-opacity text-white d-flex align-items-center justify-content-center">

                                                playing

                                            </div>

                                        )}

                                    </div>

                                );

                            })}

                        </div>

                    }

                </div>

            </div>

        </main>

    );

}