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
const allData = await getAllPageData(3);
const thirdData = allData?.thirdSection;

const ThirdSection = () => {
  const [input, setInput] = useState({
    titleone: thirdData.titleone,
    subtitleone: thirdData.subtitleone,
    titletwo: thirdData.titletwo,
    subtitletwo: thirdData.subtitletwo,
    titlthree: thirdData.titlthree,
    subtitlthree: thirdData.subtitlthree,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = {
      titleone: input.titleone,
      subtitleone: input.subtitleone,
      titletwo: input.titletwo,
      subtitle2: input.subtitle2,
      titlthree: input.titlthree,
      subtitlthree: input.subtitlthree,
      pageId: 3,
    };

    try {
      const apiRes = await fetch(
        `https://hydro-innov-6gkn-hkxr87350-leonali5366s-projects.vercel.app/api/dashboard/tesla/thirdSection?id=3`,
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
            <CardTitle>Section 3 Content</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between gap-5">
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title1</span>
                <Textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setInput({ ...input, titleone: e.target.value })
                  }
                >
                  {input.titleone}
                </Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle1
                </span>
                <Textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setInput({ ...input, subtitleone: e.target.value })
                  }
                >
                  {input.subtitleone}
                </Textarea>
              </label>
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title2</span>
                <Textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setInput({ ...input, titletwo: e.target.value })
                  }
                >
                  {input.titletwo}
                </Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle2
                </span>
                <Textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setInput({ ...input, subtitletwo: e.target.value })
                  }
                >
                  {input.subtitletwo}
                </Textarea>
              </label>
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title3</span>
                <Textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setInput({ ...input, titlthree: e.target.value })
                  }
                >
                  {input.titlthree}
                </Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle3
                </span>
                <Textarea
                  name=""
                  id=""
                  onChange={(e) =>
                    setInput({ ...input, subtitlthree: e.target.value })
                  }
                >
                  {input.subtitlthree}
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

export default ThirdSection;
