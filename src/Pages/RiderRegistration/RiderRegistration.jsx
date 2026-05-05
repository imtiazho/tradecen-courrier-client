import React from "react";
import riderImage from "../../assets/agent-pending.png";

const RiderRegistration = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-8 pb-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form Section */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#002B36] mb-4">
              Be a Rider
            </h1>
            <p className="text-gray-600 mb-10 text-[15px] max-w-xl">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>

            <form className="space-y-6">
              <h2 className="text-xl font-semibold text-[#002B36] border-b border-[#ddd] pb-4">
                Tell us about yourself
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Your Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Your Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
                  />
                </div>

                {/* Region */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Your Region
                    </span>
                  </label>
                  <select className="select select-bordered w-full rounded-md border-gray-300 focus:outline-[#CAEB66] focus:outline-2 focus:outline-offset-1 transition-all">
                    <option disabled selected>
                      Select your Region
                    </option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                  </select>
                </div>

                {/* District */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Your District
                    </span>
                  </label>
                  <select className="select select-bordered w-full rounded-md border-gray-300 focus:outline-[#CAEB66] focus:outline-2 focus:outline-offset-1 transition-all">
                    <option disabled selected>
                      Select your District
                    </option>
                    <option>Dhaka North</option>
                    <option>Dhaka South</option>
                  </select>
                </div>

                {/* NID */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      NID No
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="NID"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
                  />
                </div>

                {/* Vehicles Type */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px]">
                      Vehicles Type
                    </span>
                  </label>
                  <select className="select select-bordered w-full rounded-md border-gray-300 focus:outline-[#CAEB66] focus:outline-2 focus:outline-offset-1 transition-all">
                    <option disabled selected>
                      Select your Vehicle
                    </option>
                    <option>Bike</option>
                    <option>Cycle</option>
                  </select>
                </div>

                {/* Driving License */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Driving License Number
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Driving License Number"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
                  />
                </div>

                {/* Bike Model */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Bike Brand Model and Year
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bike Brand Model and Year"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
                  />
                </div>

                {/* Bike Registration */}
                <div className="form-control">
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-[#002B36] text-[15px] mb-1]">
                      Bike Registration Number
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bike Registration Number"
                    className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button className="btn btn-block bg-[#D1E066] hover:bg-[#C1D056] text-[#002B36] font-bold border-none rounded-md">
                Submit
              </button>
            </form>
          </div>

          {/* Right Side - Image Section */}
          <div className="flex justify-center md:justify-end md:sticky md:top-10">
            <img
              src={riderImage}
              alt="TradeCen Rider Illustration"
              className="w-full max-w-lg md:max-w-xl h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderRegistration;
