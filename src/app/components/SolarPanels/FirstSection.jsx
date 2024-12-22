/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { toast } from "sonner";

// Fetch data
const allData = await getAllPageData(2);
const fisrtData = allData?.firstSection || [];

const FirstSection = () => {
  const [input, setinput] = useState({
    title: fisrtData.title,
    subtitle: fisrtData.subtitle,
    video: fisrtData.video,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const videoFile = e.target.video?.files[0];
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      video: input.video,
      pageId: 2,
    };

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
        const videoUrl = cloudinaryData?.url;

        if (videoUrl) {
          updateData.video = videoUrl;
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        alert("An error occurred while uploading the video.");
        return;
      }
    }

    try {
      const apiRes = await fetch(
        `http://localhost:3000/api/dashboard/tesla/firstSection?id=2`,
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
        toast.success("Section updated successfully!");
      } else {
        toast.error("Failed to update Section.");
      }
    } catch (error) {
      console.error("Error updating Section:", error);
      toast.error("An error occurred while updating the Section.");
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleUpdate}>
        <Card>
          <CardHeader>
            <CardTitle>Sec 1 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-medium opacity-90">
                Background Video
              </span>
              <video
                className="sm:max-h-[600px] w-full sm:h-full object-cover rounded"
                autoPlay
                muted
                loop
              >
                <source src={input?.video} type="video/webm" />
              </video>
              <input type="file" name="video" />
            </div>
            <div className="w-full flex max-sm:flex-col sm:items-center sm:justify-between gap-5">
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setinput({ ...input, title: e.target.value })
                  }
                >
                  {input.title}
                </Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
                  onChange={(e) =>
                    setinput({ ...input, subtitle: e.target.value })
                  }
                >
                  {input.subtitle}
                </Textarea>
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

export default FirstSection;
