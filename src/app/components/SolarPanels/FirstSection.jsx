/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import getFirstSectionData from "@/app/lib/firstSectionData";
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

const fisrtData = await getFirstSectionData(1);
console.log(fisrtData);

const FirstSection = () => {
  const [input, setinput] = useState({
    title: fisrtData.title,
    subtitle: fisrtData.title,
    video: fisrtData.video,
  });

  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      video: videoUrl,
      pageId: 1,
    };

    console.log(updateData);

    try {
      const apiRes = await fetch(
        `http://localhost:3000/api/dashboard/tesla/firstSection?id=1`,
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
            <CardTitle>Sec 1 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="">
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">
                  Background Video
                </span>

                <video className="object-cover rounded" autoPlay muted loop>
                  <source src={input.video} type="video/webm" />
                </video>
                <input
                  type="file"
                  accept="video/*"
                  name="video"
                  onChange={handleFileChange}
                />
                {isUploading && (
                  <div
                    style={{
                      width: "100%",
                      background: "#f3f3f3",
                      height: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: `${progress}%`,
                        background: "green",
                        height: "100%",
                        borderRadius: "5px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-5">
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
