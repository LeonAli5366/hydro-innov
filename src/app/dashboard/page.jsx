import React from "react";
import { DataTable } from "../components/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="p-5 space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Update, Delete & Add products</CardDescription>
        </CardHeader>
        <CardContent>
          {/* all products */}
          <div className="space-y-10">
            <div className="space-y-2">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">
                  <span className="text-sm font-medium opacity-90">Title</span>
                  <Input />
                </label>
                <label htmlFor="">
                  <span className="text-sm font-medium opacity-90">
                    Description
                  </span>
                  <Input />
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium opacity-90">Image</span>
                <Image
                  src={"/images/pw-selector-image.webp"}
                  alt=""
                  width={200}
                  height={200}
                  className="min-w-[300px]"
                />
              </div>
              <div className="flex items-center gap-5">
                <Button>Update</Button>
                <Button>Delete</Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">
                  <span className="text-sm font-medium opacity-90">Title</span>
                  <Input />
                </label>
                <label htmlFor="">
                  <span className="text-sm font-medium opacity-90">
                    Description
                  </span>
                  <Input />
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium opacity-90">Image</span>
                <Image
                  src={"/images/pw-selector-image.webp"}
                  alt=""
                  width={200}
                  height={200}
                  className="min-w-[300px]"
                />
              </div>
              <div className="flex items-center gap-5">
                <Button>Update</Button>
                <Button>Delete</Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">
                  <span className="text-sm font-medium opacity-90">Title</span>
                  <Input />
                </label>
                <label htmlFor="">
                  <span className="text-sm font-medium opacity-90">
                    Description
                  </span>
                  <Input />
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium opacity-90">Image</span>
                <Image
                  src={"/images/pw-selector-image.webp"}
                  alt=""
                  width={200}
                  height={200}
                  className="min-w-[300px]"
                />
              </div>
              <div className="flex items-center gap-5">
                <Button>Update</Button>
                <Button>Delete</Button>
              </div>
            </div>
          </div>
          {/* add product */}
          <div className="flex flex-col gap-5 pt-10 border-t mt-5">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Input />
              </label>
              <label htmlFor="">
                <span className="text-sm font-medium opacity-90">
                  Description
                </span>
                <Input />
              </label>
            </div>
            <div>
              <Button>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <DataTable />
    </div>
  );
};

export default page;
