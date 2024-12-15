'use client';

import React, { useEffect, useState } from "react";
import getAllPageData from "@/app/lib/getAllPageData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TenthSection() {
  const [tenthSectionData, setTenthSectionData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedSection, setSelectedSection] = useState(null); 
  const [photoFile, setPhotoFile] = useState(null); 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPageData(1); 
        console.log("All Data:", allData);

        const tenthSection = allData?.tenthSection || [];
        console.log("Tenth Section Data:", tenthSection);

        setTenthSectionData(tenthSection); 
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleEdit = (section) => {
    setSelectedSection({ ...section }); 
    console.log("Editing Section:", section); 
  };

  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSection((prev) => ({ ...prev, [name]: value })); 
  };


  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]); 
  };


  const handleSaveChanges = async () => {
    if (!selectedSection || !selectedSection.id) {
      alert("No section selected for update.");
      return;
    }

    const updateData = { ...selectedSection }; 


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

    // Send update request to the backend
    try {
      const response = await fetch(
        `http://localhost:3000/api/dashboard/tesla/tenthSection?id=${selectedSection.id}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData), 
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the section");
      }

      const updatedSection = await response.json();
      console.log("Updated Section:", updatedSection);

 
      setTenthSectionData((prev) =>
        prev.map((item) =>
          item.id === updatedSection.data.id ? updatedSection.data : item
        )
      );

      alert("Section updated successfully!");
      setSelectedSection(null); 
      setPhotoFile(null); 
    } catch (error) {
      console.error("Error updating section:", error);
      alert("An error occurred while updating the section.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle>Section 10 Content</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {/* Display each section */}
          {
             tenthSectionData.map((section) => (
                <div
                  key={section.id}
                  className="w-full flex justify-between gap-5"
                >
                  <div className="flex flex-col gap-y-3 w-full">
                    {/* Display photo */}
                    <div className="w-full">
                      <span className="text-sm font-medium opacity-90">
                        Image
                      </span>
                      {section.photo ? (
                        <img
                          src={section.photo}
                          alt={section.title || "Section Image"}
                          className="object-cover rounded w-full"
                        />
                      ) : (
                        <p>No photo available</p>
                      )}
                    </div>
  
                    {/* Display title */}
                    <label className="flex flex-col gap-y-1 w-full">
                      <span className="text-sm font-medium opacity-90">
                        Title
                      </span>
                      <Textarea
                        defaultValue={section.title || "No title available"}
                        readOnly
                      />
                    </label>
  
                    {/* Display subtitle */}
                    <label className="flex flex-col gap-y-1 w-full">
                      <span className="text-sm font-medium opacity-90">
                        Subtitle
                      </span>
                      <Textarea
                        defaultValue={section.subtitle || "No subtitle available"}
                        readOnly
                      />
                    </label>
  
                    {/* Edit button */}
                    <Button onClick={() => handleEdit(section)}>Edit</Button>
                  </div>
                </div>
              ))
          }

          {/* Edit form */}
          {selectedSection && (
            <div className="mt-5">
              <h2 className="text-lg font-bold">Edit Section</h2>
              <label className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea
                  name="title"
                  value={selectedSection.title}
                  onChange={handleInputChange}
                />
              </label>
              <label className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea
                  name="subtitle"
                  value={selectedSection.subtitle}
                  onChange={handleInputChange}
                />
              </label>
              <label className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">
                  Upload Photo
                </span>
                <input
                  type="file"
                  name="photo"
                  className="mt-3"
                  onChange={handleFileChange}
                />
              </label>
              <Button onClick={handleSaveChanges} className="mt-3">
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
