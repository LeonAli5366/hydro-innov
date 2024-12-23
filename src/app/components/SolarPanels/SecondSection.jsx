/* eslint-disable @next/next/no-img-element */
"use client";
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
import getAllPageData from "@/app/lib/getAllPageData";

// Fetch data
const allData = await getAllPageData(2);
const secondData = allData?.secondSection || [];

const SecondSection = () => {
  const [input, setInput] = useState({
    title: secondData.title,
    subtitle: secondData.subtitle,
    photo: secondData.photo,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoFile = e.target.photo?.files[0];
    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      photo: input.photo,
      pageId: 2,
    };

    console.log(updateData);

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
        `http://localhost:3000/api/dashboard/tesla/secondSection?id=2`,
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
            <CardTitle>Section 2 content</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between gap-5">
            <div className="w-full space-y-3">
              <label htmlFor="title" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea
                  name="title"
                  id="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                />
              </label>
              <label htmlFor="subtitle" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
                  name="subtitle"
                  id="subtitle"
                  value={input.subtitle}
                  onChange={(e) =>
                    setInput({ ...input, subtitle: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="w-full">
              <span className="text-sm font-medium opacity-90">
                Background Photo
              </span>
              {input.photo && (
                <img
                  src={input.photo}
                  alt="Background Photo"
                  width={800}
                  height={500}
                  className="object-cover rounded"
                />
              )}
              <input type="file" name="photo" className="mt-3" />
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

export default SecondSection;
