"use client";
import { useEffect, useState } from "react";
import VideoSlide from "../components/VideoSlide";
import Image from "next/image";
import ImageSlide from "../components/ImageSlide";
import SideImageSlide from "../components/SideImageSlide";
import Link from "next/link";
import getAllPageData from "../lib/getAllPageData";
import { PropagateLoader } from "react-spinners";
import Header from "../components/Header";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState(null);

  // Fetch the data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPageData(2); // Replace with your API endpoint
        setAllData(response); // Set the fetched data in state
        setLoading(false); // Data loaded, set loading to false
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false); // In case of error, stop loading
      }
    };

    fetchData();
  }, []);

  // Show loading spinner or message if data is still being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader />
      </div>
    );
  }

  // Return early if the data is not available (error fallback)
  if (!allData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  // Destructure data for ease of use in sections
  const firstSection = allData?.firstSection || {};
  const secondSection = allData?.secondSection || {};
  const thirdSection = allData?.thirdSection[0] || {};
  const fourthSection = allData?.fourthSection || {};
  const fifthSection = allData?.fifthSection || {};
  const sixthSection = allData?.sixthSection || {};
  const seventhSection = allData?.seventhSection || {};
  const eighthSection = allData?.eighthSection || {};
  const ninethSection = allData?.ninethSection || {};
  const tenthSection = allData?.tenthSection || {};
  console.log(allData);

  return (
    <>
      {/* sec 1 */}
      <Header />
      <div className="w-full h-screen relative">
        <video className="w-full h-full object-cover" autoPlay muted loop>
          <source src={firstSection?.video} type="video/webm" />
        </video>
        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-between sm:my-16 my-10">
          <div className="text-center space-y-2 mt-24">
            <h1 className="xl:text-4xl text-2xl font-bold text-white">
              {firstSection.title}
            </h1>
            <h1 className="text-[13px] font-semibold text-white">
              {firstSection.subtitle}
            </h1>
          </div>
          <div className="flex max-sm:flex-col items-center justify-between gap-5 max-w-[544px] w-full sm:h-[40px] h-[100px] max-sm:px-5">
            <Link
              href={`/solarpanels/order`}
              className="w-full h-full bg-white rounded text-[#393C41] font-semibold text-sm"
            >
              <button className="w-full h-full">Order Now</button>
            </Link>
            <button className="w-full h-full hover:bg-white rounded border-[3px] text-white hover:text-[#393C41] border-white text-sm font-semibold transition-all duration-300">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* sec 2 */}
      <div className="text-center bg-white text-black sm:pt-[120px] pt-10 sm:px-[48px] px-5 pb-[40px] space-y-2">
        <h1 className="sm:text-2xl text-[22px] text-[#171A20] font-bold opacity-90">
          {secondSection.title}
        </h1>
        <p className="max-w-2xl mx-auto text-sm text-gray-700 font-medium opacity-90">
          {secondSection.subtitle}
        </p>
      </div>

      {/* sec 3 */}
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url('${secondSection.photo}')` }}
      >
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      {/* sec 4 */}
      <div className="flex sm:justify-center bg-black">
        <div className="flex max-sm:flex-col justify-center max-w-6xl mx-auto my-20 sm:gap-x-32 gap-10 max-sm:px-5">
          <div className="w-full space-y-2">
            <h1 className="sm:text-2xl text-lg font-bold text-white">
              {thirdSection?.titleone}
            </h1>
            <p className="text-sm font-medium opacity-90 text-white">
              {thirdSection?.subtitletwo}
            </p>
          </div>
          <div className="w-full space-y-2">
            <h1 className="sm:text-2xl text-lg font-bold text-white">
              {thirdSection?.titletwo}
            </h1>
            <p className="text-sm font-medium opacity-90 text-white">
              {thirdSection?.subtitletwo}
            </p>
          </div>
          <div className="w-full space-y-2">
            <h1 className="sm:text-2xl text-lg font-bold text-white">
              {thirdSection?.titlthree}
            </h1>
            <p className="text-sm font-medium opacity-90 text-white">
              {thirdSection?.subtitlthree}
            </p>
          </div>
        </div>
      </div>

      {/* sec 5 */}
      <VideoSlide data={fourthSection} />

      {/* sec 6 */}
      <div className="sm:h-screen flex flex-col items-center justify-center gap-y-8 bg-black">
        <Image
          src={fifthSection?.photo}
          alt=""
          width={1130}
          height={580}
          className="rounded max-w-[1100px] w-full"
        />

        <div className="max-w-[1130px] mx-auto flex max-sm:flex-col justify-between max-sm:gap-y-5 max-sm:px-5 max-sm:mb-16">
          <h1 className="sm:text-2xl text-xl font-bold text-white w-[70%]">
            {fifthSection?.title}
          </h1>
          <p className="w-full text-[13px] font-medium text-white">
            {fifthSection?.subtitle}
          </p>
        </div>
      </div>

      {/* sec 7 */}
      <ImageSlide data={sixthSection} />

      {/* sec 8 */}
      <div className=" bg-black relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10"></div>
        <div className="w-full sm:h-screen flex max-sm:flex-col max-sm:gap-y-5 sm:items-end relative">
          <div className="sm:absolute sm:top-0 sm:left-0 w-full sm:h-full">
            <Image
              src={seventhSection?.photo}
              alt="lights-stay-on-desktop"
              width={1900}
              height={1200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-[1100px] mx-auto flex max-sm:flex-col sm:gap-x-10 gap-y-5 z-10 max-sm:px-5 mb-20">
            <h1 className="text-2xl sm:font-bold font-semibold sm:w-[60%] text-white">
              {seventhSection?.title}
            </h1>
            <p className="text-[13px] text-white opacity-90">
              {seventhSection?.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black text-white">
        <div className="w-full sm:h-auto flex flex-col justify-between max-w-[1100px] mx-auto sm:gap-20 gap-10 px-5">
          <div className="w-full flex max-sm:flex-col-reverse items-center justify-between sm:gap-10 h-full">
            <div className="space-y-5">
              <h1 className="text-2xl font-bold sm:max-w-[250px]">
                {eighthSection?.title}
              </h1>
              <p className="text-sm font-medium opacity-90 max-w-[400px]">
                {eighthSection?.subtitle}
              </p>
            </div>
            <Image
              src={eighthSection?.photo}
              alt="mobile-app"
              width={400}
              height={700}
              className="max-w-full w-full max-h-full h-full"
            />
          </div>
          <div className="w-full flex max-sm:flex-col justify-between sm:gap-32 gap-10 mb-32">
            <div className="space-y-3">
              <span className="text-xl font-bold">
                {eighthSection?.titleone}
              </span>
              <p className="text-sm font-medium opacity-90">
                {eighthSection?.subtitleone}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-xl font-bold">
                {eighthSection?.titletwo}
              </span>
              <p className="text-sm font-medium opacity-90">
                {eighthSection?.subtitletwo}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-xl font-bold">
                {eighthSection?.titlethree}
              </span>
              <p className="text-sm font-medium opacity-90">
                {eighthSection?.subtitlethree}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:h-screen max-sm:flex max-sm:flex-col gap-5 relative bg-black">
        <Image
          src={ninethSection?.photo}
          alt=""
          width={1000}
          height={1000}
          className="sm:absolute sm:top-0 sm:left-0 max-w-full w-full sm:max-h-full h-full min-h-[400px] object-cover"
        />
        <div className="max-w-[1100px] mx-auto flex max-sm:flex-col sm:gap-10 gap-5 h-full sm:items-end text-white sm:pb-16 px-5">
          <span className="text-2xl font-bold">{ninethSection?.title}</span>
          <p className="text-sm font-medium opacity-90">
            {ninethSection?.subtitle}
          </p>
        </div>
      </div>

      {/* sec 9 */}
      <SideImageSlide data={tenthSection} />
    </>
  );
};

export default Page;
