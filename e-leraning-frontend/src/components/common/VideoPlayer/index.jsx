"use client";
import { useState, useRef } from "react";
import PlayPauseButton from "../PlayPauseButton";
import MuteIcon from "@/assets/icons/MuteIcon";
import UnmuteIcon from "@/assets/icons/UnmuteIcon";
import "./style.scss";

const VideoPlayer = ({ src, className }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const handleImageclick = () => {
    togglePlay();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="hero-media">
      <div className="image-hero">
        {!isPlaying && (
          <>
            <div className="video-player-container"></div>
            <PlayPauseButton onClick={handleImageclick} />
          </>
        )}

        <video
          controls={isPlaying}
          ref={videoRef}
          src={src}
          preload="auto"
          loading="lazy"
          autoPlay
          width="100%"
          height="auto"
          className={className}
          poster="/landing-page-video-thumbnail.png"
          loop={true}
          muted={isMuted}
          onPause={handlePause}
          onPlay={handlePlay}
          onVolumeChange={(e) => {
            const video = e.target;
            const isVideoMuted = video.muted;
            setIsMuted(isVideoMuted);
          }}
          playsInline
        />
        <button
          className="mute-btn"
          onClick={() => {
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? (
            <>
              <UnmuteIcon width="24" height="24" /> <span>Unmute</span>
            </>
          ) : (
            <>
              <MuteIcon width="24" height="24" /> <span>Mute</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
