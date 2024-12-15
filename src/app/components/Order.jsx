"use client";
import Image from "next/image";
import React, { useState } from "react";

const Order = () => {
  const [isSelected, setIsSelected] = useState("option1");

  return (
    <div className="w-full text-black flex flex-col mb-14">
      <h1 className="text-3xl font-semibold">Power Everything</h1>
      <span className="text-sm font-medium opacity-80">Enter Home Details</span>
      <label htmlFor="" className="mt-5 space-y-1">
        <span className="text-sm font-medium opacity-95">Home Address</span>
        <input
          type="text"
          className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
        />
      </label>
      <label htmlFor="" className="mt-5 space-y-1">
        <div className="flex flex-col">
          <span className="text-sm font-medium opacity-95">
            Average Electric Bill
          </span>
          <span className="text-[13px] font-medium opacity-80">
            One electric bill required
          </span>
        </div>
        <input
          type="text"
          className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
        />
      </label>

      <span className="text-[13px] font-medium opacity-80 mt-5">
        Know your average monthly consumption?
      </span>
      <span className="text-[13px] font-medium opacity-80 underline underline-offset-4">
        Enter your kWh
      </span>
      <h1 className="text-xl font-semibold opacity-95 mt-20">
        Choose a Product
      </h1>
      <span className="text-[13px] font-medium opacity-80 underline mt-2">
        Help Me Choose Solar
      </span>
      <div className="w-full flex flex-col gap-y-6 mt-8">
        <div className="px-5 py-6 w-full bg-gradient-to-r from-[#1D2743] via-[#4C68B3] to-[#1D2743] rounded text-white">
          <h1 className="font-semibold">30% Federal Tax Credit</h1>
          <p className="text-[13px] font-medium mt-2 opacity-90">
            Solar and Powerwall orders qualify for a federal tax credit. See
            Details
          </p>
        </div>
        {/* option 1 */}
        <div
          className={`flex flex-col rounded transition-all duration-300 ease-in-out border ${
            isSelected === "option1" && "border-blue-600 border-[3.9px]"
          }`}
          onClick={() => setIsSelected("option1")}
        >
          <div className="w-full">
            <Image
              src={"/images/pw-selector-image.webp"}
              alt="pv-selector-image-desktop"
              width={400}
              height={130}
            />
          </div>
          <div className="px-4 pb-4">
            <h1 className="text-[13px] font-semibold opacity-90">
              Powerwall 3 Only
            </h1>
            <span className="text-[13px] font-medium opacity-80">
              Energy backup for your home
            </span>
          </div>
        </div>
        {/* option 2 */}
        <div
          className={`flex flex-col rounded transition-all duration-300 ease-in-out border ${
            isSelected === "option2" && "border-blue-600 border-[3.9px]"
          }`}
          onClick={() => setIsSelected("option2")}
        >
          <div className="w-full">
            <Image
              src={"/images/pv-selector-image-desktop.webp"}
              alt="pv-selector-image-desktop"
              width={400}
              height={150}
            />
          </div>
          <div className="px-4 pb-4 pt-1">
            <h1 className="text-[13px] font-semibold opacity-90 pt-3">
              Solar Panels + Powerwall 3
            </h1>
            <span className="text-[13px] font-medium opacity-80">
              Panels for your existing roof with <br /> backup protection
            </span>
          </div>
        </div>
        {/* option 3 */}
        <div
          className={`flex flex-col rounded transition-all duration-300 ease-in-out border ${
            isSelected === "option3" && "border-blue-600 border-[3.9px]"
          }`}
          onClick={() => setIsSelected("option3")}
        >
          <div className="w-full">
            <Image
              src={"/images/pv-selector-image-desktop.webp"}
              alt="pv-selector-image-desktop"
              width={400}
              height={150}
            />
          </div>
          <div className="px-4 pb-4 pt-1">
            <h1 className="text-[13px] font-semibold opacity-90 pt-3">
              Solar Roof + Powerwall 3
            </h1>
            <span className="text-[13px] font-medium opacity-80">
              New luxury integrated solar roof with <br /> backup protection
            </span>
          </div>
        </div>
      </div>
      <p className="text-[11px] font-medium opacity-70 mt-10">
        Prices include potential incentives, discounts, and Powerwall. Excludes
        future energy savings.
      </p>
      <button
        disabled
        className="w-full h-10 rounded bg-blue-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed text-white mt-5"
      >
        Next
      </button>
    </div>
  );
};

export default Order;
