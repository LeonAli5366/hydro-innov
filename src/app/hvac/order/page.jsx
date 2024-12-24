import Order from "@/app/components/Order";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-between px-14 pt-14 bg-white gap-x-10">
      <video
        className="w-[80%] h-[90vh] object-cover rounded-xl sticky top-14"
        autoPlay
        muted
        loop
      >
        <source
          src="/videos/landing-page-hero-video_d.webm"
          type="video/webm"
        />
      </video>
      <Order />
    </div>
  );
};

export default page;
