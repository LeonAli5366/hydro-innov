"use client";
import getAllPageData from "@/app/lib/getAllPageData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

// Fetch data
const allData = await getAllPageData(1);
const fourthData = allData?.fourthSection || [];
const fourthObject = fourthData?.[1];

const SubSecondSection = () => {
  const [input, setInput] = useState({
    tag: fourthObject?.tag || "",
    desc: fourthObject?.desc || "",
    video: fourthObject?.video || "",
  });

  const [videoFile, setVideoFile] = useState(null);

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoFile(file);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  // Handle update
  const handleUpdate = async () => {
    let updatedVideoUrl = input.video;

    // Upload video to Cloudinary if a new video is selected
    if (videoFile) {
      const videoData = new FormData();
      videoData.append("file", videoFile);
      videoData.append("upload_preset", "estate");
      videoData.append("cloud_name", "dgupi3gce");

      try {
        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dgupi3gce/video/upload",
          {
            method: "POST",
            body: videoData,
          }
        );
        const cloudinaryData = await cloudinaryRes.json();
        updatedVideoUrl = cloudinaryData?.url;

        if (!updatedVideoUrl) {
          alert("Video upload failed. Please try again.");
          return;
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        alert("An error occurred while uploading the video.");
        return;
      }
    }

    // Prepare data for API update
    const updateData = {
      tag: input.tag,
      desc: input.desc,
      video: updatedVideoUrl,
      pageId: 1,
    };

    console.log("Updating data:", updateData); 

    // Send data to the API
    try {
      const response = await fetch(
        "https://hydro-innov-6gkn-hkxr87350-leonali5366s-projects.vercel.app/api/dashboard/tesla/fourthSection?id=5",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        alert("Data updated successfully!");
        setInput({ ...input, video: updatedVideoUrl }); 
      } else {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        alert("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("An error occurred while updating the data.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <form>
        <div className="flex flex-col gap-y-3 w-full">
          {/* Video preview */}
          <div className="w-full">
            <span className="text-sm font-medium opacity-90">Background Video</span>
            {input.video && (
              <video className="object-cover rounded" autoPlay muted loop>
                <source src={input.video} type="video/mp4" />
              </video>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="mt-2"
            />
          </div>

          {/* Tag */}
          <label htmlFor="tag" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm font-medium opacity-90">Tag</span>
            <Textarea
              id="tag"
              value={input.tag}
              onChange={handleInputChange}
            />
          </label>

          {/* Description */}
          <label htmlFor="desc" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm font-medium opacity-90">Description</span>
            <Textarea
              id="desc"
              value={input.desc}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </form>
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
};

export default SubSecondSection;

