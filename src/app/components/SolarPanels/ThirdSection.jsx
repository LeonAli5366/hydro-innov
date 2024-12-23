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
import React, { useState, useEffect } from "react";
import getAllPageData from "@/app/lib/getAllPageData";
import { toast } from "sonner";

const ThirdSection = () => {
  // Initialize state for input fields and loading state
  const [input, setInput] = useState({
    titleone: "",
    subtitleone: "",
    titletwo: "",
    subtitletwo: "",
    titlthree: "",
    subtitlthree: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPageData(2);
        const thirdData = allData?.thirdSection || {}; // Access thirdSection data

        // Update state with fetched data
        setInput({
          titleone: thirdData.titleone || "",
          subtitleone: thirdData.subtitleone || "",
          titletwo: thirdData.titletwo || "",
          subtitletwo: thirdData.subtitletwo || "",
          titlthree: thirdData.titlthree || "",
          subtitlthree: thirdData.subtitlthree || "",
        });

        setLoading(false); // Finished loading
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []); // Empty array means it runs only once when the component mounts

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = {
      titleone: input.titleone,
      subtitleone: input.subtitleone,
      titletwo: input.titletwo,
      subtitletwo: input.subtitletwo,
      titlthree: input.titlthree,
      subtitlthree: input.subtitlthree,
      pageId: 2,
    };

    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/tesla/thirdSection?id=2`,
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

  // Handle loading or error states
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
            <CardTitle>Section 3 Content</CardTitle>
          </CardHeader>
          <CardContent className="flex max-sm:flex-col sm:justify-between gap-5">
            <div className="w-full space-y-3">
              <label htmlFor="titleone" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title1</span>
                <Textarea
                  name="titleone"
                  id="titleone"
                  value={input.titleone}
                  onChange={(e) =>
                    setInput({ ...input, titleone: e.target.value })
                  }
                />
              </label>
              <label htmlFor="subtitleone" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Subtitle1</span>
                <Textarea
                  name="subtitleone"
                  id="subtitleone"
                  value={input.subtitleone}
                  onChange={(e) =>
                    setInput({ ...input, subtitleone: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="titletwo" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title2</span>
                <Textarea
                  name="titletwo"
                  id="titletwo"
                  value={input.titletwo}
                  onChange={(e) =>
                    setInput({ ...input, titletwo: e.target.value })
                  }
                />
              </label>
              <label htmlFor="subtitletwo" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle2
                </span>
                <Textarea
                  name="subtitletwo"
                  id="subtitletwo"
                  value={input.subtitletwo}
                  onChange={(e) =>
                    setInput({ ...input, subtitletwo: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="titlthree" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title3</span>
                <Textarea
                  name="titlthree"
                  id="titlthree"
                  value={input.titlthree}
                  onChange={(e) =>
                    setInput({ ...input, titlthree: e.target.value })
                  }
                />
              </label>
              <label htmlFor="subtitlthree" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle3
                </span>
                <Textarea
                  name="subtitlthree"
                  id="subtitlthree"
                  value={input.subtitlthree}
                  onChange={(e) =>
                    setInput({ ...input, subtitlthree: e.target.value })
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

export default ThirdSection;
