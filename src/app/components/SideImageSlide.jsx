"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SideImageSlide = ({ data }) => {
  // State to store the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(true);

  // Automatically cycle images every 5 seconds
  useEffect(() => {
    if (!isCycling || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isCycling, data.length]);

  // Handle content click to change the image manually
  const handleContentClick = (index) => {
    setCurrentImageIndex(index); // Set the selected image index
    setIsCycling(true); // Start cycling from the selected image
  };

  // If no data is passed, display loading state
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black pb-20">
      <div className="py-[64px]">
        <div className="max-w-[1100px] mx-auto flex max-sm:flex-col-reverse items-center justify-between max-sm:px-5 max-sm:gap-y-5">
          <div className="space-y-8">
            {data.map((section, index) => (
              <div
                key={section.id}
                className={`space-y-2 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden ${
                  currentImageIndex === index
                    ? "opacity-100 max-h-fit"
                    : "opacity-50 max-h-10"
                }`}
                onClick={() => handleContentClick(index)} // Clicking the content will update image
              >
                <h1 className="text-xl font-semibold text-white">
                  {section.title}
                </h1>
                <p className={`text-[13px] font-medium text-white`}>
                  {section.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Displaying the Image */}
          <Image
            src={data[currentImageIndex].photo} // Dynamic image source from data
            alt={`Image ${currentImageIndex + 1}`}
            width={620}
            height={465}
            className="rounded-lg sm:ml-12"
          />
        </div>
      </div>
    </div>
  );
};

export default SideImageSlide;
