"use client";
import { toast } from "sonner"; // Importing Sonner for toast notifications
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react"; // Import the Lucide icon for the spinner

const Order = () => {
  // State for first section (home details)
  const [homeAddress, setHomeAddress] = useState("");
  const [electricBill, setElectricBill] = useState("");
  const [productId, setProductId] = useState(1); // Default product ID

  // State for second section (user info)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roofSize, setRoofSize] = useState(""); // New state for roof size

  // State to store product data
  const [products, setProducts] = useState([]);
  console.log(products);

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/product"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        setProducts(data); // Store the fetched products data
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false after the fetch is done
      }
    };

    fetchProductData();
  }, []);

  // State to manage form step
  const [step, setStep] = useState(1);

  // State to manage loading state of the button
  const [loading, setLoading] = useState(false);

  // Validation for the first step
  const isFirstStepValid = homeAddress && electricBill && productId;

  // Validation for the second step
  const isSecondStepValid = firstName && lastName && email && phone && roofSize;

  // Handle the Next button click to move to the next step
  const handleNextClick = () => {
    if (step === 1) {
      setStep(2); // Move to the second step
    } else {
      handleOrder(); // Submit the order
    }
  };

  // Handle order submission to the API
  const handleOrder = async () => {
    const orderData = {
      productId,
      address: homeAddress,
      electricBill: parseInt(electricBill, 10), // Ensure it's an integer
      roofSize: parseInt(roofSize, 10), // Ensure it's an integer
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPhone: phone,
    };

    setLoading(true); // Start loading spinner

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Order submission failed");
      }

      const result = await response.json();
      toast.success("Order submitted successfully!"); // Success toast
      console.log(result); // Handle the response if necessary

      // Reset the form fields and go back to the first step after successful order
      setHomeAddress("");
      setElectricBill("");
      setProductId(1); // Reset product selection to default
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setRoofSize("");
      setStep(1); // Go back to the first step
    } catch (error) {
      toast.error(`Error submitting the order: ${error.message}`); // Error toast
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <form>
      <div className="w-full text-black flex flex-col mb-14">
        <h1 className="text-3xl font-semibold">Power Everything</h1>
        <span className="text-sm font-medium opacity-80">
          Enter Home Details
        </span>

        {/* Step 1: Home Address and Electric Bill */}
        {step === 1 && (
          <>
            <label htmlFor="" className="mt-5 space-y-1">
              <span className="text-sm font-medium opacity-95">
                Home Address
              </span>
              <input
                type="text"
                className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)} // Update state
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
                value={electricBill}
                onChange={(e) => setElectricBill(e.target.value)} // Update state
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
                  Solar and Powerwall orders qualify for a federal tax credit.
                  See Details
                </p>
              </div>
              {/* Option 1 */}

              {products.data?.map((product, i) => {
                return (
                  <div
                    key={product.id}
                    className={`flex flex-col rounded transition-all gap-3 duration-300 ease-in-out border ${
                      productId === product.id &&
                      "border-blue-600"
                    }`}
                    onClick={() => setProductId(product.id)} // Set product ID to 1
                  >
                    <div className="w-full">
                      <Image
                        src={product.photo}
                        alt=""
                        width={400}
                        height={130}
                        className="max-w-full w-full max-h-[130px] h-full object-cover"
                      />
                    </div>
                    <div className="px-4 pb-4">
                      <h1 className="text-[13px] font-semibold opacity-90">
                        {product?.title}
                      </h1>
                      <span className="text-[13px] font-medium opacity-80">
                        {product?.subTitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] font-medium opacity-70 mt-10">
              Prices include potential incentives, discounts, and Powerwall.
              Excludes future energy savings.
            </p>
          </>
        )}

        {/* Step 2: User Info */}
        {step === 2 && (
          <>
            <h1 className="text-xl font-semibold opacity-95 mt-20">
              Enter Your Information
            </h1>
            <label htmlFor="firstName" className="mt-5 space-y-1">
              <span className="text-sm font-medium opacity-95">First Name</span>
              <input
                type="text"
                id="firstName"
                className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label htmlFor="lastName" className="mt-5 space-y-1">
              <span className="text-sm font-medium opacity-95">Last Name</span>
              <input
                type="text"
                id="lastName"
                className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label htmlFor="email" className="mt-5 space-y-1">
              <span className="text-sm font-medium opacity-95">Email</span>
              <input
                type="email"
                id="email"
                className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label htmlFor="phone" className="mt-5 space-y-1">
              <span className="text-sm font-medium opacity-95">
                Phone Number
              </span>
              <input
                type="text"
                id="phone"
                className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <label htmlFor="roofSize" className="mt-5 space-y-1">
              <span className="text-sm font-medium opacity-95">
                Roof Size (in sq ft)
              </span>
              <input
                type="text"
                id="roofSize"
                className="w-full h-10 bg-[#F4F4F4] pl-3 text-sm font-semibold opacity-60 focus-within:outline rounded outline-slate-300"
                value={roofSize}
                onChange={(e) => setRoofSize(e.target.value)}
              />
            </label>
          </>
        )}

        {/* Next/Order Button */}
        <button
          type="button"
          disabled={
            step === 1 ? !isFirstStepValid : !isSecondStepValid || loading
          }
          onClick={handleNextClick}
          className="w-full h-10 rounded bg-blue-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed text-white mt-5"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin mr-2 w-5 h-5" /> Ordering...
            </div>
          ) : step === 1 ? (
            "Next"
          ) : (
            "Order"
          )}
        </button>
      </div>
    </form>
  );
};

export default Order;
