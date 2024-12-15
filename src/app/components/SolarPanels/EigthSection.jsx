/* eslint-disable @next/next/no-img-element */
"use client";
import getEightSectionData from "@/app/lib/eigthSectionData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";

const EigthSection = () => {
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    titleone: "",
    subtitleone: "",
    titletwo: "",
    subtitletwo: "",
    titlethree: "",
    subtitlethree: "",
    photo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const eightData = await getEightSectionData(1);
      setInput({
        title: eightData.title || "",
        subtitle: eightData.subtitle || "",
        titleone: eightData.titleone || "",
        subtitleone: eightData.subtitleone || "",
        titletwo: eightData.titletwo || "",
        subtitletwo: eightData.subtitletwo || "",
        titlethree: eightData.titlethree || "",
        subtitlethree: eightData.subtitlethree || "",
        photo: eightData.photo || "",
      });
    };

    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoFile = e.target.photo?.files[0];

    const updateData = {
      title: input.title,
      subtitle: input.subtitle,
      titleone: input.titleone,
      subtitleone: input.subtitleone,
      titletwo: input.titletwo,
      subtitletwo: input.subtitletwo,
      titlethree: input.titlethree,
      subtitlethree: input.subtitlethree,
      pageId: 1,
      photo: input.photo, 
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
        `http://localhost:3000/api/dashboard/tesla/eighthSection?id=1`,
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
            <CardTitle>Section 8 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              {["title", "subtitle", "titleone", "subtitleone", "titletwo", "subtitletwo", "titlethree", "subtitlethree"].map(
                (field, index) => (
                  <label key={index} htmlFor={field} className="flex flex-col gap-y-1">
                    <span className="text-sm font-medium opacity-90 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </span>
                    <Textarea
                      id={field}
                      value={input[field]}
                      onChange={(e) =>
                        setInput({ ...input, [field]: e.target.value })
                      }
                    />
                  </label>
                )
              )}
            </div>
            <div className="flex flex-col gap-3">
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

export default EigthSection;
