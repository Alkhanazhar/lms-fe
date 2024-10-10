import React, { ChangeEvent, useRef, useState } from "react";
// import styles from "./player.module.scss";

import { formateTime } from "../config/date";
import { FullscreenIcon, Pause, Play } from "lucide-react";

const Player = (props) => {
    const {
        videoURL,
        poster,
        className,
        id,
        playsInline = true,
        controls = false,
        playbackRate = 1,
        videoType = "video/mp4",
        autoPlay = true,
    } = props;
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(playbackRate);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [fullscreen, setFullScreen] = useState(false);

    function handleSeek(event) {
        try {
            const newTime = event.target.value;
            // Check if videoRef.current is not null and has the currentTime property
            if (videoRef.current && 'currentTime' in videoRef.current) {
                videoRef.current.currentTime = newTime;
                setCurrentTime(() => newTime);
            } else {
                throw new Error("Video reference is not available or does not support currentTime.");
            }
        } catch (error) {
            console.error("Failed to seek video:", error);
            // Optionally, handle the error in the UI, e.g., show an error message to the user
        }
    }

    function toggleFullscreen() {
        setFullScreen(!fullscreen);
    }

    function handleTimeUpdate() {
        try {
            // Check if videoRef.current is defined and not null
            if (videoRef?.current) {
                // Safely access currentTime and duration from videoRef.current
                const { currentTime, duration } = videoRef.current;
                setCurrentTime(()=>currentTime);
                setDuration(()=>duration);
            } else {
                // Optionally handle the case where videoRef.current is not available
                throw new Error("Video reference is not available.");
            }
        } catch (error) {
            console.error("Failed to update time:", error);
            // Optionally, handle the error in the UI, e.g., show an error message to the user
        }
    }

    function togglePlay() {
        try {
            if (videoRef.current) {
                if (videoRef.current.paused) {
                    videoRef.current.play().catch(e => {
                        console.error("Error attempting to play the video:", e);
                        // Optionally, handle the error in the UI, e.g., show an error message to the user
                    });
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            } else {
                throw new Error("Video reference is not available.");
            }
        } catch (error) {
            console.error("Failed to toggle play/pause:", error);
        }
    }

    function handleSelect(e) {
        try {
            const value = +e.target.value;  // Convert the value to a number
            if (videoRef.current) {
                videoRef.current.playbackRate = value;
                setPlaybackSpeed(value);
            } else {
                throw new Error("Video reference is not available.");
            }
        } catch (error) {
            console.error("Failed to set playback rate:", error);
            // Optionally, handle the error in the UI, e.g., show an error message to the user
        }
    }

    if (!videoURL) {
        return null;
    }
    return (
        <div
            key={videoURL}
            className={`player-container ${fullscreen ? "player-fullscreen" : ""}`}
        >
            <div
                className={"player-overlay"}
                onMouseEnter={() => {
                    setShowControls(true);
                }}
                onMouseLeave={() => {
                    setShowControls(false);
                }}
                onClick={togglePlay}
            >
                {showControls && (
                    <div
                        className={"player-controlbar"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <input
                            className={"seekbar"}
                            style={{
                                backgroundSize: `${(currentTime * 100) / duration}% 100%`,
                            }}
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                        />
                        <div className={"control"}>
                            {isPlaying ? (
                                <Pause onClick={togglePlay} className={"player-icon"} />
                            ) : (
                                <Play onClick={togglePlay} className={"player-icon"} />
                            )}
                            <p>
                                <span>{formateTime(currentTime)}</span> /{" "}
                                <span>{formateTime(duration)}</span>
                            </p>
                            <select onChange={handleSelect} value={playbackSpeed}>
                                <option value={1}>1x</option>
                                <option value={1.5}>1.5x</option>
                                <option value={2}>2x</option>
                                <option value={2.5}>2.5x</option>
                                <option value={3}>3x</option>
                            </select>
                            <div onClick={toggleFullscreen}>
                                {fullscreen ? (
                                    <FullscreenIcon className={"player-fullscreenBtn"} />
                                ) : (
                                    <FullscreenIcon className={"player-fullscreenBtn"} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <video
                ref={videoRef}
                id={id}
                poster={poster}
                playsInline={playsInline}
                className={className}
                controls={controls}
                autoPlay={autoPlay}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => {
                    setIsPlaying(true);
                }}
            >
                <source src={videoURL} type={videoType} />
            </video>
        </div>
    );
};

export default Player;