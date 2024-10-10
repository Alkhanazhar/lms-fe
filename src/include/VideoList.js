import React, { useContext, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { videos } from "../config/media";
import { CurrentVideo } from "../context/VideoContext";

const VideoList = ({ videos }) => {
    const [videoData, setVideoData] = useState(videos);
    const { setPlayingVideo } = useContext(CurrentVideo);
    const [draggingItem, setDraggingItem] = useState(null);
    // const domainName = mediaJSON.categories[0].imageDomain;

    const handleDragStart = (e, video) => {
        setDraggingItem(video);
        e.dataTransfer.setData("text/plain", "");
    };

    const handleDragEnd = () => {
        setDraggingItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, video) => {
        if (!draggingItem) return;
        const currentIndex = videoData.indexOf(draggingItem);
        const targetIndex = videoData.indexOf(video);
        if (currentIndex !== -1 && targetIndex !== -1) {
            videoData.splice(currentIndex, 1);
            videoData.splice(targetIndex, 0, draggingItem);
            setVideoData([...videoData]);
        }
    };

    return (
        <div className={"listContainer"}>
            {videoData?.map((video) => {
                return (
                    <div
                        className="listItem"
                        key={video?.sources?.[0]}
                        onClick={() => {
                            setPlayingVideo(video);
                        }}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, video)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, video)}
                    >
                        {/* <img src={domainName + video?.thumb} alt="video thumb" /> */}
                        <div>
                            <h4>{video?.title}</h4>
                            <p>{video?.subtitle}</p>
                        </div>
                        <div className={"dragIconContainer"}>
                            <MdDragIndicator />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default VideoList;