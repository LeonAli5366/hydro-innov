/* eslint-disable @next/next/no-img-element */
"use client";
import getAllPageData from "@/app/lib/getAllPageData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

// Fetch data
const allData = await getAllPageData(1);
const seventhData = allData?.seventhSection || [];

const SeventhSection = () => {
  const [input, setInput] = useState({
    title: seventhData.title,
    subtitle: seventhData.subtitle,
    photo: seventhData.photo,
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined!");
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoFile = e.target.photo?.files[0];
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      photo: input.photo,
      pageId: 1,
    };

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
        const photoUrl = cloudinaryData?.url;

        if (photoUrl) {
          updateData.photo = photoUrl;
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("An error occurred while uploading the photo.");
        return;
      }
    }

    try {
      const apiRes = await fetch(
        `${apiUrl}/api/dashboard/tesla/seventhSection?id=1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const apiData = await apiRes.json();

      if (apiData.status === "Success") {
        alert("Section updated successfully!");
      } else {
        alert("Failed to update Section.");
      }
    } catch (error) {
      console.error("Error updating Section:", error);
      alert("An error occurred while updating the Section.");
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleUpdate}>
        <Card>
          <CardHeader>
            <CardTitle>Section 7 Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full">
              <span className="text-sm font-medium opacity-90">
                Background Image
              </span>
              <img
                src={input.photo || "/placeholder-image.jpg"}
                alt="Section Background"
                width={800}
                height={500}
                className="object-cover rounded"
              />
              <input type="file" name="photo" />
            </div>
            <div className="flex justify-between gap-x-5 w-full">
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                />
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
                  value={input.subtitle}
                  onChange={(e) =>
                    setInput({ ...input, subtitle: e.target.value })
                  }
                />
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Update</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SeventhSection;
