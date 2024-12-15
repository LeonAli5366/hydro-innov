"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SideImageSlide = () => {
  const images = [
    "/images/vertical-carousel-order-design-desktop.webp",
    "/images/vertical-carousel-install-power-on-desktop.webp",
    "/images/vertical-carousel-day-one-onward-desktop.webp",
  ];

  // Content for each image
  const content = [
    {
      title: "From Order to Design",
      description:
        "Share a few details about your home and energy usage. Tesla will then design your solar system to complement your home and meet your current or future energy needs.",
    },
    {
      title: "From Install to Power On",
      description:
        "Tesla completes most solar panel installations within a few months. We handle all the permitting and utility approvals for you. Your Tesla Project Advisor and our Support team are available throughout the entire process.",
    },
    {
      title: "From Day One to Onward",
      description:
        "Solar panels come with a 25-year warranty. Our Support team will be available to you throughout the lifetime of your system.",
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
    <div className="bg-black pb-20">
      <div className="py-[64px]">
        <div className="max-w-[1100px] mx-auto flex max-sm:flex-col-reverse items-center justify-between max-sm:px-5 max-sm:gap-y-5">
          <div className="space-y-8">
            {content.map((section, index) => (
              <div
                className={`space-y-2 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden ${
                  currentImageIndex === index
                    ? "opacity-100 max-h-fit"
                    : "opacity-50 max-h-10"
                }`}
                key={index}
                onClick={() => handleContentClick(index)} // Clicking the content will update image
              >
                <h1 className="text-xl font-semibold text-white">
                  {section.title}
                </h1>
                <p className={`text-[13px] font-medium text-white`}>
                  {section.description}
                </p>
              </div>
            ))}
          </div>
          <Image
            src={images[currentImageIndex]}
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
