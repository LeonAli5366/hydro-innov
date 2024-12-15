"use client";
import React, { useState } from "react";

const VideoSlide = () => {
  const [videoSrc, setVideoSrc] = useState("/videos/video-slide-1.webm");
  const [isActive, setIsActive] = useState("/videos/video-slide-1.webm");

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
                changeVideo("/videos/video-slide-1.webm");
                changeActive("/videos/video-slide-1.webm");
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === "/videos/video-slide-1.webm"
                  ? "bg-white"
                  : "bg-[#5C5E62]"
              }`}
            ></button>
            <button
              onClick={() => {
                changeVideo("/videos/video-slide-2.webm");
                changeActive("/videos/video-slide-2.webm");
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === "/videos/video-slide-2.webm"
                  ? "bg-white"
                  : "bg-[#5C5E62]"
              }`}
            ></button>
            <button
              onClick={() => {
                changeVideo("/videos/video-slide-3.webm");
                changeActive("/videos/video-slide-3.webm");
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === "/videos/video-slide-3.webm"
                  ? "bg-white"
                  : "bg-[#5C5E62]"
              }`}
            ></button>
            <button
              onClick={() => {
                changeVideo("/videos/video-slide-4.webm");
                changeActive("/videos/video-slide-4.webm");
              }}
              className={`size-3 rounded-full transition-all duration-500 ${
                isActive === "/videos/video-slide-4.webm"
                  ? "bg-white"
                  : "bg-[#5C5E62]"
              }`}
            ></button>
          </div>
          {/* tile & des 1 */}
          <div
            className={`space-y-2 ${
              isActive === "/videos/video-slide-1.webm" ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              Generate Clean Energy
            </h1>
            <p className="text-[13px] font-medium text-white">
              Harness the sun&apos;s power with our solar panels to produce
              renewable energy whenever sunlight is available.
            </p>
          </div>
          {/* tile & des 2 */}
          <div
            className={`space-y-2 ${
              isActive === "/videos/video-slide-2.webm" ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              Power Your Life
            </h1>
            <p className="text-[13px] font-medium text-white">
              Use solar energy to run everything from your TV to your internet,
              keeping your home and apartment running sustainably.
            </p>
          </div>
          {/* tile & des 3 */}
          <div
            className={`space-y-2 ${
              isActive === "/videos/video-slide-3.webm" ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              Store Excess Energy
            </h1>
            <p className="text-[13px] font-medium text-white">
              Save surplus solar power in Powerwall for use during storms,
              outages, or when utility rates spike.
            </p>
          </div>
          {/* tile & des 4 */}
          <div
            className={`space-y-2 ${
              isActive === "/videos/video-slide-4.webm" ? "block" : "hidden"
            }`}
          >
            <h1 className="sm:text-lg sm:font-bold font-semibold text-white">
              Charge Your EV
            </h1>
            <p className="text-[13px] font-medium text-white">
              Power your electric vehicle at home or apartment with clean energy
              using a wall connector.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-[70%] left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default VideoSlide;
