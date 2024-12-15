import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      {/* sec 1 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Sec 1 content</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between gap-5">
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
            <div className="w-full">
              <span className="text-sm font-medium opacity-90">
                Background Video
              </span>
              <video className="object-cover rounded" autoPlay muted loop>
                <source src="/videos/video1.webm" type="video/webm" />
              </video>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 2 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 2 content</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between gap-5">
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
            <div className="w-full">
              <span className="text-sm font-medium opacity-90">
                Background Image
              </span>
              <Image
                src={"/images/solar-panels-sec-2.jpg"}
                alt=""
                width={800}
                height={500}
                className="object-cover rounded"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 3 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 3 content</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between gap-5">
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title1</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle1
                </span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title2</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle2
                </span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title3</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">
                  Subtitle3
                </span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 4 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Sec 4 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full space-y-3">
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
            <div className="flex justify-between gap-5">
              <div className="w-full space-y-3">
                <label htmlFor="" className="flex flex-col gap-y-1">
                  <span className="text-sm font-medium opacity-90">
                    Title 1
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 1
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">
                  Background Video 1
                </span>
                <video className="object-cover rounded" autoPlay muted loop>
                  <source src="/videos/video1.webm" type="video/webm" />
                </video>
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="w-full space-y-3">
                <label htmlFor="" className="flex flex-col gap-y-1">
                  <span className="text-sm font-medium opacity-90">
                    Title 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">
                  Background Video 2
                </span>
                <video className="object-cover rounded" autoPlay muted loop>
                  <source src="/videos/video1.webm" type="video/webm" />
                </video>
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="w-full space-y-3">
                <label htmlFor="" className="flex flex-col gap-y-1">
                  <span className="text-sm font-medium opacity-90">
                    Title 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">
                  Background Video 3
                </span>
                <video className="object-cover rounded" autoPlay muted loop>
                  <source src="/videos/video1.webm" type="video/webm" />
                </video>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 5 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 5 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full">
              <span className="text-sm font-medium opacity-90">
                Background Image
              </span>
              <Image
                src={"/images/solar-panels-sec-2.jpg"}
                alt=""
                width={800}
                height={500}
                className="object-cover rounded"
              />
            </div>
            <div className="flex justify-between gap-x-5 w-full">
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 6 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 6 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full flex justify-between gap-5">
              {/* background image 1 */}
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">Image 1</span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded w-full"
                />
              </div>
              {/* background image 2 */}
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">Image 2</span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded w-full"
                />
              </div>
              {/* background image 3 */}
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">Image 3</span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded w-full"
                />
              </div>
              {/* background image 4 */}
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">Image 4</span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded w-full"
                />
              </div>
            </div>
            <div className="w-full flex justify-between gap-5">
              {/* title & des 1 */}
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 1
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              {/* title & des 2 */}
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              {/* title & des 3 */}
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              {/* title & des 4 */}
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 4
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 4
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 7 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 7 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full">
              <span className="text-sm font-medium opacity-90">
                Background Image
              </span>
              <Image
                src={"/images/solar-panels-sec-2.jpg"}
                alt=""
                width={800}
                height={500}
                className="object-cover rounded"
              />
            </div>
            <div className="flex justify-between gap-x-5 w-full">
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 8 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 8 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
              <div className="w-full flex flex-col gap-y-5">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">Title</span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">
                  Background Image
                </span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded"
                />
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="w-full flex flex-col gap-y-5">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 1
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 1
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              <div className="w-full flex flex-col gap-y-5">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              <div className="w-full flex flex-col gap-y-5">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 9 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 9 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full">
              <span className="text-sm font-medium opacity-90">
                Background Image
              </span>
              <Image
                src={"/images/solar-panels-sec-2.jpg"}
                alt=""
                width={800}
                height={500}
                className="object-cover rounded"
              />
            </div>
            <div className="flex justify-between gap-x-5 w-full">
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Title</span>
                <Textarea name="" id=""></Textarea>
              </label>
              <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                <span className="text-sm font-medium opacity-90">Subtitle</span>
                <Textarea name="" id=""></Textarea>
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
      {/* sec 10 */}
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Section 10 content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="w-full flex justify-between gap-5">
              {/* background image 1 */}
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">Image 1</span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded w-full"
                />
              </div>
              {/* background image 2 */}
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">Image 2</span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded w-full"
                />
              </div>
              {/* background image 3 */}
              <div className="w-full">
                <span className="text-sm font-medium opacity-90">Image 3</span>
                <Image
                  src={"/images/solar-panels-sec-2.jpg"}
                  alt=""
                  width={800}
                  height={500}
                  className="object-cover rounded w-full"
                />
              </div>
            </div>
            <div className="w-full flex justify-between gap-5">
              {/* title & des 1 */}
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 1
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              {/* title & des 2 */}
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 2
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
              {/* title & des 3 */}
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Title 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
                <label htmlFor="" className="flex flex-col gap-y-1 w-full">
                  <span className="text-sm font-medium opacity-90">
                    Subtitle 3
                  </span>
                  <Textarea name="" id=""></Textarea>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default page;
