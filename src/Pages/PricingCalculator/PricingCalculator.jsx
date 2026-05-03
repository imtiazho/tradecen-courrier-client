import React, { useState } from "react";

const PricingCalculator = () => {
  const [parcelType, setParcelType] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = (e) => {
    e.preventDefault();
    let cost = 0;
    const w = parseFloat(weight) || 0;

    if (parcelType === "Document") {
      cost = destination === "Within City" ? 60 : 80;
    } else if (parcelType === "Non-Document") {
      if (w <= 3) {
        cost = destination === "Within City" ? 110 : 150;
      } else {
        // Logic: >3kg = Base price + 40 per extra kg
        // Within City: 110 base + (w-3)*40
        // Outside: 150 base + (w-3)*40 + 40 extra
        const extraWeight = Math.ceil(w - 3);
        const basePrice = destination === "Within City" ? 110 : 150;
        const extraCharge = destination === "Within City" ? 0 : 40;
        cost = basePrice + extraWeight * 40 + extraCharge;
      }
    }
    setTotalCost(cost);
  };

  const handleReset = () => {
    setParcelType("");
    setDestination("");
    setWeight("");
    setTotalCost(0);
  };

  return (
    <section className="bg-[#F2F4F7] py-16 md:py-20 px-4 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-[48px] p-8 md:p-16 lg:p-20 shadow-sm border border-[#E9ECEF]">
        {/* 1. Header Section */}
        <div className="mb-10">
          <h2 className="text-[#02312A] text-4xl md:text-5xl font-extrabold mb-6">
            Pricing Calculator
          </h2>
          <p className="text-[#5F7180] text-sm md:text-base max-w-2xl leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* 2. Custom Dashed Divider */}
        <div className="w-full h-[1.2px] bg-[linear-gradient(to_right,#B0BCC8_50%,transparent_0%)] bg-[length:15px_1.2px] bg-repeat-x mb-16 opacity-30" />

        <h3 className="text-[#02312A] text-center text-2xl font-bold mb-12">
          Calculate Your Cost
        </h3>

        {/* 3. Calculator Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Form Side */}
          <form onSubmit={calculateCost} className="space-y-6">
            {/* Parcel Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#02312A] ml-1">
                Parcel type
              </label>
              <select
                value={parcelType}
                onChange={(e) => setParcelType(e.target.value)}
                className="select select-bordered w-full rounded-xl bg-white border-[#E1E5EA] focus:outline-none focus:border-[#CAEB66]"
                required
              >
                <option value="" disabled>
                  Select Parcel type
                </option>
                <option value="Document">Document</option>
                <option value="Non-Document">Non-Document</option>
              </select>
            </div>

            {/* Delivery Destination */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#02312A] ml-1">
                Delivery Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="select select-bordered w-full rounded-xl bg-white border-[#E1E5EA] focus:outline-none focus:border-[#CAEB66]"
                required
              >
                <option value="" disabled>
                  Select Delivery Destination
                </option>
                <option value="Within City">Within City</option>
                <option value="Outside City">Outside City/District</option>
              </select>
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#02312A] ml-1">
                Weight (KG)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
                className="input input-bordered w-full rounded-xl bg-white border-[#E1E5EA] focus:outline-none focus:border-[#CAEB66]"
                required={parcelType === "Non-Document"}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="btn flex-1 bg-transparent border-[#CAEB66] text-[#02312A] font-bold rounded-xl hover:bg-[#CAEB66]/10"
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn flex-[2] bg-[#CAEB66] border-none text-[#02312A] font-bold rounded-xl hover:bg-[#b8d65a]"
              >
                Calculate
              </button>
            </div>
          </form>

          {/* Result Side */}
          <div className="flex flex-col items-center justify-center py-10 lg:py-0">
            <div className="text-center">
              <span className="text-7xl md:text-9xl font-black text-[#02312A] transition-all duration-500">
                {totalCost}
              </span>
              <span className="text-4xl md:text-5xl font-black text-[#02312A] ml-4">
                Tk
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
