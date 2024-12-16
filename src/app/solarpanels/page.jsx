'use client'
import VideoSlide from "../components/VideoSlide";
import Image from "next/image";
import ImageSlide from "../components/ImageSlide";
import SideImageSlide from "../components/SideImageSlide";
import Link from "next/link";
import getAllPageData from "../lib/getAllPageData";
import { useEffect } from "react";




const page = async () => {

  const allData = await getAllPageData(2); 
  console.log(allData);

  const secondSection = allData?.secondSection || [];
  console.log(secondSection);
  
  


  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const allData = await getAllPageData(2); 
  //         console.log("All Data:", allData);
  
  //         const tenthSection = allData?.tenthSection || [];
  //         console.log("Tenth Section Data:", tenthSection);
  
  //         setTenthSectionData(tenthSection); 
  //       } catch (err) {
  //         console.error("Error fetching data:", err.message);
  //         setError(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchData();
  //   }, []);


  return (
    <>
      {/* sec 1 */}
      <div className="w-full h-screen relative">
        <video className="w-full h-full object-cover" autoPlay muted loop>
          <source src="/videos/video1.webm" type="video/webm" />
        </video>
        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-between sm:my-16 my-10">
          <div className="text-center space-y-2 mt-24">
            <h1 className="xl:text-4xl text-2xl font-bold text-white">
              Harness Solar Energy
            </h1>
            <h1 className="text-[13px] font-semibold text-white">
              Save Money, Power Your Home and Apartment Efficiently
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
      <div className="w-full h-screen bg-solarPanels2 bg-cover bg-center relative">
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white to-transparent"></div>
      </div>
      {/* sec 4 */}
      <div className="flex sm:justify-center bg-black">
        <div className="flex max-sm:flex-col justify-center max-w-6xl mx-auto my-20 sm:gap-x-32 gap-10 max-sm:px-5">
          <div className="w-full space-y-2">
            <h1 className="sm:text-2xl text-lg font-bold text-white">
              Clean Energy for Your Home and Apartment
            </h1>
            <p className="text-sm font-medium opacity-90 text-white">
              Embrace renewable, emissions-free energy straight from the sun to
              power your home sustainably.
            </p>
          </div>
          <div className="w-full space-y-2">
            <h1 className="sm:text-2xl text-lg font-bold text-white">
              Simple, Affordable Setup
            </h1>
            <p className="text-sm font-medium opacity-90 text-white">
              Our solar panels are designed for easy installation, often
              eliminating the need for professional help, making the process
              faster and more cost-effective than traditional rooftop systems.
            </p>
          </div>
          <div className="w-full space-y-2">
            <h1 className="sm:text-2xl text-lg font-bold text-white">
              Lower Your Monthly Expenses
            </h1>
            <p className="text-sm font-medium opacity-90 text-white">
              Solar energy is free to generate, offering a reliable way to power
              your home and apartment while shielding you from increasing energy
              prices.
            </p>
          </div>
        </div>
      </div>
      {/* sec 5 */}
      <VideoSlide />
      {/* sec 6 */}
      <div className="sm:h-screen flex flex-col items-center justify-center gap-y-8 bg-black">
        <picture>
          <source
            srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/sleek-durable-mobile"
            media="(max-width: 640px)"
          />
          <Image
            src={"/images/solar-panels-sec-4.jpg"}
            alt=""
            width={1130}
            height={580}
            className="rounded"
          />
        </picture>
        <div className="max-w-[1130px] mx-auto flex max-sm:flex-col justify-between max-sm:gap-y-5 max-sm:px-5 max-sm:mb-16">
          <h1 className="sm:text-2xl text-xl font-bold text-white w-[70%]">
            Sleek and Built to Last
          </h1>
          <p className="w-full text-[13px] font-medium text-white">
            Our panels feature a low-profile, discreet design that provides a
            modern alternative to traditional solar panels. With no need for
            proprietary mounting hardware, they can be installed flush with your
            roofline, eliminating the need for rails and blending seamlessly
            with your home&apos;s aesthetics. Designed for durability and
            weather resistance, these panels are built to power your home or
            apartment reliably for decades
          </p>
        </div>
      </div>
      {/* sec 7 */}
      <ImageSlide />
      {/* sec 8 */}
      <div className=" bg-black relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10"></div>
        <div className="w-full sm:h-screen flex max-sm:flex-col max-sm:gap-y-5 sm:items-end relative">
          <div className="sm:absolute sm:top-0 sm:left-0 w-full sm:h-full">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/lights-stay-on-mobile"
              />
              <Image
                src={"/images/solar-panels-sec-6.jpg"}
                alt="lights-stay-on-desktop"
                width={1900}
                height={1200}
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
          <div className="max-w-[1100px] mx-auto flex max-sm:flex-col sm:gap-x-10 gap-y-5 z-10 max-sm:px-5 ">
            <h1 className="text-2xl sm:font-bold font-semibold sm:w-[40%] text-white">
              Stay Powered, Even During Outages
            </h1>
            <p className="w-full text-[13px] font-medium sm:pr-20 text-white mb-20">
              Solar panels generate energy to power your home or apartment, and
              when combined with a battery backup system, you can store excess
              energy for later use. With severe weather and grid disruptions
              becoming more frequent, Powerwall ensures your lights stay on and
              your home remains powered during outages.
            </p>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full h-40 max-sm:hidden bg-gradient-to-t from-black to-transparent"></div>
      </div>
      {/* sec 9 */}
      <div className="sm:h-screen bg-black">
        <div className="flex flex-col justify-between max-w-[1100px] mx-auto h-full max-sm:px-5">
          <div className="flex max-sm:flex-col-reverse items-center sm:justify-between h-full">
            <div className="flex flex-col gap-y-5">
              <h1 className="text-2xl font-semibold text-white">
                Round-the-Clock <br /> Monitoring and Full Control
              </h1>
              <p className="text-sm font-medium pr-10 text-white">
                Installing solar with Powerwall gives you complete oversight and
                control of your entire solar ecosystem through an app.
              </p>
            </div>
            <Image
              src={"/images/24-7-monitoring-app-desktop.webp"}
              alt="24-7-monitoring-app-desktop"
              width={728}
              height={728}
            />
          </div>
          <div className="flex max-sm:flex-col sm:justify-between sm:mb-20 max-sm:my-16 sm:gap-x-40 max-sm:gap-y-10">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl font-semibold text-white">
                Track Your Energy Usage
              </h1>
              <p className="text-[13px] font-medium text-white">
                Monitor your system&apos;s energy production, consumption, and
                savings in real-time to stay informed and in control
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <h1 className="text-xl font-semibold text-white">
                Maximize Efficiency
              </h1>
              <p className="text-[13px] font-medium text-white">
                Identify overproduction and rely on intelligent autopilot to
                optimize your energy usage, ensuring every bit of energy is
                utilized without waste.
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <h1 className="text-xl font-semibold text-white">
                Stay Informed with Alerts
              </h1>
              <p className="text-[13px] font-medium text-white">
                Get instant notifications about system performance, grid
                outages, or severe weather to keep your home or apartment
                prepared and powered.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* sec 10 */}
      <div className="bg-black pb-20">
        <div className="sm:h-screen flex max-sm:flex-col sm:items-end relative">
          <div className="sm:absolute sm:top-0 sm:left-0 w-full sm:h-full">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/powering-on-mobile"
              />
              <Image
                src={"/images/powering-on-desktop.webp"}
                alt="powering-on-desktop"
                width={1900}
                height={1000}
              />
            </picture>
          </div>
          <div className="max-w-[1100px] mx-auto flex max-sm:flex-col sm:items-center sm:gap-x-24 max-sm:gap-y-5 sm:mb-10 max-sm:px-5 max-sm:my-10 z-10">
            <h1 className="text-2xl font-semibold text-white text-nowrap">
              Getting to Power On
            </h1>
            <p className="text-[13px] font-medium text-white">
              With half a million solar installations to date, Tesla takes care
              of all the details for you, from order to power on.{" "}
              <span className="underline underline-offset-4">
                Schedule a virtual consultation
              </span>{" "}
              with a Tesla Advisor to learn more.
            </p>
          </div>
        </div>
      </div>
      {/* sec 11 */}
      <SideImageSlide />
      {/* sec 12 */}
      {/* specs */}
      <div className="bg-black py-[108px] text-white">
        <div className="max-w-[1100px] mx-auto max-sm:px-5">
          <h1 className="sm:text-2xl text-xl font-bold">
            Solar Panel System <span className="font-semibold">Specs</span>
          </h1>
          {/* line 1 */}
          <div className="sm:pt-16 pt-14 space-y-5">
            <span className="text-lg font-semibold">Design</span>
            <div className="sm:flex sm:gap-x-24 pb-[32px] max-sm:grid max-sm:grid-cols-2 max-sm:gap-y-10">
              <div>
                <small className="opacity-50">Dimensions</small>
                <p className="text-sm font-medium">
                  74.4” x 41.2” x 1.57”
                  <br />
                  (including frame)
                </p>
              </div>
              <div>
                <small className="opacity-50">Inverter Dimensions</small>
                <p className="text-sm font-medium">26” x 16” x 6”</p>
              </div>
              <div>
                <small className="opacity-50">Materials</small>
                <p className="text-sm font-medium">
                  Black anodized aluminum <br /> alloy frame, black backsheet,
                  <br /> glass and solar cells
                </p>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-white opacity-15"></div>
          </div>
          {/* line 2 */}
          <div className="pt-10 space-y-5">
            <span className="text-lg font-semibold">Features</span>
            <div className="sm:flex sm:gap-x-24 pb-[32px] max-sm:grid max-sm:grid-cols-2 max-sm:gap-y-10">
              <div>
                <small className="opacity-50">Wattage</small>
                <p className="text-sm font-medium">405 W</p>
              </div>
              <div>
                <small className="opacity-50">Operating Temperature</small>
                <p className="text-sm font-medium">-40°F up to +185°F</p>
              </div>
              <div className="flex sm:gap-x-10 max-sm:justify-between max-sm:col-span-2">
                <div className="max-sm:w-full">
                  <small className="opacity-50">Inverter Power</small>
                  <p className="text-sm font-medium max-sm:pr-5">
                    7.6 kW / 5.7 kW / 5 kW / 3.8{" "}
                    <br className="max-sm:hidden" /> kW{" "}
                    <br className="max-sm:hidden" /> 98% efficiency
                  </p>
                </div>
                <div className="max-sm:w-full">
                  <small className="opacity-50">Certification</small>
                  <p className="text-sm font-medium">
                    IEC / UL 61730, CEC Listed,
                    <br /> IEC 61215
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-white opacity-15 mb-[40px]"></div>
          </div>
          {/* line 3 */}
          <div className="pt-10 space-y-5">
            <span className="text-lg font-semibold">Warranty</span>
            <div className="sm:flex sm:gap-x-24 pb-[32px] max-sm:grid max-sm:grid-cols-2 max-sm:gap-y-10">
              <div>
                <small className="opacity-50">Warranty</small>
                <p className="text-sm font-medium">
                  25-year performance <br /> guarantee
                </p>
              </div>
              <div>
                <small className="opacity-50">Inverter Warranty</small>
                <p className="text-sm font-medium">12.5 years</p>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-white opacity-15 mb-[40px]"></div>
          </div>
          {/* line 4 */}
          <div className="pt-10 flex flex-col gap-y-5">
            <span className="text-lg font-semibold">Other</span>
            <small className="underline underline-offset-4 underline-thickness cursor-pointer">
              Owner&apos;s Manual
            </small>
          </div>
        </div>
      </div>
      {/* sec 13 */}
      <div className="sm:h-screen bg-black text-white">
        <div className="max-w-[1100px] mx-auto h-full flex max-sm:flex-col items-center justify-between sm:gap-x-20 max-sm:px-5 max-sm:py-20">
          <div className="flex flex-col max-sm:items-center gap-y-4">
            <h1 className="text-2xl font-bold">Install Solar Panels</h1>
            <p className="text-[13px] font-medium text-white opacity-90 max-sm:text-center">
              Design your solar system or schedule a virtual consultation with a
              Tesla Advisor to learn more.
            </p>
            <div className="flex max-sm:w-full max-sm:flex-col sm:justify-between gap-x-7 gap-y-5 sm:pr-3">
              <button className="w-full hover:bg-white border-white hover:text-black border-[3px] py-2 rounded text-[13px] font-semibold transition-colors duration-300 ease-in-out">
                Order Now
              </button>
              <button className="w-full py-2 rounded text-white text-[13px] font-semibold bg-[#202123] hover:bg-[#393C41] transition-colors duration-300 ease-in-out">
                Schedule a Consultation
              </button>
            </div>
          </div>
          <div className="relative">
            <Image
              src={"/images/install-solar-desktop.webp"}
              alt=""
              width={742}
              height={421}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
