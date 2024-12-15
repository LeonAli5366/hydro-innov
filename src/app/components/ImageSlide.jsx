"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ImageSlide = () => {
  const images = [
    "/images/solar-panels-carousel-01-desktop.webp",
    "/images/solar-panels-carousel-02-desktop.webp",
    "/images/solar-panels-carousel-03-desktop.webp",
    "/images/solar-panels-carousel-04-desktop.webp",
  ];

  // Content for each image
  const content = [
    {
      title: "Sleek Design",
      description:
        "All-black panels deliver a clean, uniform, and modern monochromatic appearance.",
    },
    {
      title: "Built for All Weather",
      description:
        "Sealed installation points ensure protection against rain, snow, and ice, keeping your system reliable year-round.",
    },
    {
      title: "Hassle-Free Installation",
      description:
        "Simplified hardware and efficient installation reduce roof impact, with some setups requiring no tools at all.",
    },
    {
      title: "Discrete and Streamlined",
      description:
        "Ultra-thin panels offer a low-profile design that blends seamlessly with your roof, terrace, or balcony for a subtle and elegant look.",
    },
  ];

  // Step 2: Define the state to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(true);

  useEffect(() => {
    if (!isCycling) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isCycling, images.length]);

  const handleContentClick = (index) => {
    setCurrentImageIndex(index); // Set the selected image index
    setIsCycling(true); // Start cycling from the selected image
  };
  return (
    <div className="sm:h-screen flex flex-col items-center justify-center gap-y-8 bg-black">
      <Image
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        width={1130}
        height={480}
        className="rounded"
      />
      <div className="max-w-[1130px] mx-auto overflow-hidden w-full">
        <div
          className={`max-sm:w-[300vw] flex justify-between gap-7 max-sm:px-5`}
        >
          {content.map((section, index) => (
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
              <p className="text-[13px] font-medium text-white">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlide;
