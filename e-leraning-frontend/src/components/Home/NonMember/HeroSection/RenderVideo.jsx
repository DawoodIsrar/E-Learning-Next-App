"use client";
import { explainerVideo } from "@/utils/data";
import { useWindowWidth } from "@/utils/windowWidthHook";
import VideoPlayer from "@/components/common/VideoPlayer";

const RenderVideo = () => {
  const { width } = useWindowWidth();
  const video = width < 767 ? explainerVideo.mobile : explainerVideo.desktop;
  return <VideoPlayer src={video} />;
};

export default RenderVideo;
