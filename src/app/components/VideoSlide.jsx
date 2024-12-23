"use client";
import React, { useState } from "react";

const VideoSlide = ({ data }) => {
  const [videoSrc, setVideoSrc] = useState(data[0]?.video);
  const [isActive, setIsActive] = useState(data[0]?.video);

  console.log(videoSrc, isActive);
  // Handle button click to change video source
  const changeVideo = (newVideoSrc) => {
    const videoElement = document.getElementById("videoPlayer");
    // Check if videoElement is not null before calling methods
    if (videoElement) {
      videoElement.pause();
      videoElement.load();
    }
    setVideoSrc(newVideoSrc);
  };
  const changeActive = (active) => {
    setIsActive(active);
  };
  return (
    <div className="w-full sm:h-screen h-[120vh] relative">
      <video
        id="videoPlayer"
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src={videoSrc} type="video/webm" />
      </video>
      <div className="absolute top-0 left-0 right-0 bottom-[70%] bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute top-28 left-0 w-full h-auto">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-y-5 max-sm:px-5">
          <h1 className="text-2xl font-bold text-white">
            Power Your Home or apartment Sustainably
          </h1>
          <p className="text-[13px] font-medium opacity-90 text-white">
            Experience a fully integrated clean energy ecosystem with our
            products—designed to generate, use, store, and charge seamlessly.
            Our interconnected products maximize energy efficiency, reduce
            environmental impact, and help you save on costs.
          </p>
        </div>
      </div>
      <div className="absolute sm:bottom-20 bottom-10 left-0 w-full max-sm:px-5 z-10">
        <div className="max-w-[700px] mx-auto space-y-2">
          <div className="flex items-center gap-x-2 mb-4">
            <button
              onClick={() => {
                changeVideo(data[0]?.video);
                changeActive(data[0]?.video);
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === data[0]?.video ? "bg-white" : "bg-[#5C5E62]"
              }`}
            ></button>
            <button
              onClick={() => {
                changeVideo(data[1]?.video);
                changeActive(data[1]?.video);
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === data[1]?.video ? "bg-white" : "bg-[#5C5E62]"
              }`}
            ></button>
            <button
              onClick={() => {
                changeVideo(data[2]?.video);
                changeActive(data[2]?.video);
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === data[2]?.video ? "bg-white" : "bg-[#5C5E62]"
              }`}
            ></button>
            <button
              onClick={() => {
                changeVideo(data[3]?.video);
                changeActive(data[3]?.video);
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === data[3]?.video ? "bg-white" : "bg-[#5C5E62]"
              }`}
            ></button>
          </div>
          {/* tile & des 1 */}
          <div
            className={`space-y-2 ${
              isActive === data[0]?.video ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              {data[0]?.title}
            </h1>
            <p className="text-[13px] font-medium text-white">
              {data[0]?.subtitle}
            </p>
          </div>
          {/* tile & des 2 */}
          <div
            className={`space-y-2 ${
              isActive === data[1]?.video ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              {data?.title}
            </h1>
            <p className="text-[13px] font-medium text-white">
              {data?.subtitle}
            </p>
          </div>
          {/* tile & des 3 */}
          <div
            className={`space-y-2 ${
              isActive === data[2]?.video ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              {data[2]?.title}
            </h1>
            <p className="text-[13px] font-medium text-white">
              {data[2]?.subtitle}
            </p>
          </div>
          {/* tile & des 4 */}
          <div
            className={`space-y-2 ${
              isActive === data[3]?.video ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              {data[3]?.title}
            </h1>
            <p className="text-[13px] font-medium text-white">
              {data[3]?.subtitle}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-[70%] left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default VideoSlide;
