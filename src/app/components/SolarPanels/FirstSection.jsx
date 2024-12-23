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
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const FirstSection = () => {
  // State to store the fetched data
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    video: "",
  });
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPageData(2);
        const firstData = allData?.firstSection || {};
        
        // Update the state with fetched data
        setInput({
          title: firstData.title || "",
          subtitle: firstData.subtitle || "",
          video: firstData.video || "",
        });
        setLoading(false); // Data loaded successfully
      } catch (err) {
        setError("Error fetching data");
        setLoading(false); // Error occurred, stop loading
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); // Empty dependency array ensures this runs only once on mount

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/tesla/firstSection?id=2`,
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

  // Show loading or error if applicable
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                    setInput({ ...input, title: e.target.value })
                  }
                  value={input.title} // Set value from state
                />
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
                  onChange={(e) =>
                    setInput({ ...input, subtitle: e.target.value })
                  }
                  value={input.subtitle} // Set value from state
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

export default FirstSection;
