"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ImageSlide = ({ data }) => {
  // Step 1: Define the state to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(true);

  useEffect(() => {
    if (!isCycling) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isCycling, data.length]);

  const handleContentClick = (index) => {
    setCurrentImageIndex(index); // Set the selected image index
    setIsCycling(true); // Start cycling from the selected image
  };

  return (
    <div className="sm:h-screen flex flex-col items-center justify-center gap-y-8 bg-black max-sm:py-10">
      {/* Image based on the current index */}
      <Image
        src={data[currentImageIndex]?.photo || "/images/placeholder-image.webp"} // fallback image
        alt={`Image ${currentImageIndex + 1}`}
        width={1130}
        height={480}
        className="rounded sm:px-5"
      />
      <div className="max-w-[1130px] mx-auto w-full">
        <div
          className={`flex max-sm:flex-col sm:justify-between gap-7 max-sm:px-5`}
        >
          {/* Map through the dynamic data */}
          {data.map((section, index) => (
            <div
              key={index}
              onClick={() => handleContentClick(index)} // Clicking the content will update image
              className={`w-full flex flex-col gap-y-3 border-t-2 pt-3 cursor-pointer transition-opacity ${
                currentImageIndex === index ? "opacity-100" : "opacity-50"
              }`} // Active section has full opacity, others have reduced opacity
            >
              <span className="sm:text-lg text-sm font-bold text-white">
                {section.title}
              </span>
              <p className="text-[13px] font-medium text-white">
                {section.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlide;
