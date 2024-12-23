"use client";
import getAllPageData from "@/app/lib/getAllPageData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

// Fetch data
const allData = await getAllPageData(2);
const sixthData = allData?.sixthSection || [];

const firstObject = sixthData?.[0];

const FirstSection = () => {
  // Sub section 1
  const [input, setInput] = useState({
    title: firstObject?.title || "",
    subtitle: firstObject?.subtitle || "",
    photo: firstObject?.photo || "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  // Handle image selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoFile(file);
  };

  // Handle update
  const handleUpdate = async () => {
    let updatedPhotoUrl = input.photo;

    // If there's a new photo, upload it to Cloudinary
    if (photoFile) {
      const photoData = new FormData();
      photoData.append("file", photoFile);
      photoData.append("upload_preset", "estate");
      photoData.append("cloud_name", "dgupi3gce");

      try {
        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dgupi3gce/image/upload",
          {
            method: "POST",
            body: photoData,
          }
        );
        const cloudinaryData = await cloudinaryRes.json();
        updatedPhotoUrl = cloudinaryData?.url;

        if (!updatedPhotoUrl) {
          toast.error("Image upload failed. Please try again.");
          return;
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.error("An error occurred while uploading the photo.");
        return;
      }
    }

    // Prepare data for the API
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      photo: updatedPhotoUrl,
      pageId: 2,
    };

    // Update the data via API
    try {
      const response = await fetch(
        "http://localhost:3000/api/dashboard/tesla/sixthSection?id=1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        toast.success("Data updated successfully!");
      } else {
        toast.error("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("An error occurred while updating the data.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <form>
        <div className="flex flex-col gap-y-3 w-full">
          {/* background image 1 */}
          <div className="w-full flex flex-col gap-2">
            <span className="text-sm font-medium opacity-90">Image 1</span>
            <Image
              src={input.photo}
              alt=""
              width={800}
              height={500}
              className="sm:max-h-[600px] sm:h-full max-w-full w-full object-cover rounded"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="flex max-sm:flex-col sm:items-center sm:justify-between gap-5 w-full">
            <label htmlFor="" className="flex flex-col gap-y-1 w-full">
              <span className="text-sm font-medium opacity-90">Title 1</span>
              <Textarea
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-y-1 w-full">
              <span className="text-sm font-medium opacity-90">Subtitle 1</span>
              <Textarea
                value={input.subtitle}
                onChange={(e) =>
                  setInput({ ...input, subtitle: e.target.value })
                }
              />
            </label>
          </div>
        </div>
      </form>
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
};

export default FirstSection;
