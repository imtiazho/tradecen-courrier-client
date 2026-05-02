import React from 'react';

// === README: PLACE YOUR PNG/SVG IMPORTS HERE ===
// import WaveHeaderImg from "../../assets/images/wave-header.svg"; // Recommend SVG for sharp lines
// import LogisticsIllustrationImg from "../../assets/images/one-line-logistics.png";
// ===============================================

const SatisfactionBanner = () => {
  return (
    // 1. The outermost section provides the light gray background and wide padding.
    <section className="bg-[#F2F4F7] py-16 md:py-20 px-4 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 2. The Main Banner Card */}
        {/* We use position: relative and overflow: hidden so images stay contained. */}
        <div 
          className="relative bg-[#02312A] rounded-[48px] p-10 md:p-16 lg:p-20 overflow-hidden shadow-xl"
        >
          
          {/* === IMAGE ONE: TOP WAVE HEADER === */}
          {/* Positioned absolute to the top-right corner. */}
          <div className="absolute top-0 right-0 w-full md:w-[70%] lg:w-[60%] h-auto opacity-70">
            {/* 
               Uncomment and replace with your imported wave image variable:
               <img src={WaveHeaderImg} alt="Abstract wave pattern" className="w-full h-auto object-contain object-top-right" /> 
            */}
            {/* FALLBACK FOR DEVELOPMENT */}
            <div className="w-full h-[200px] border border-dashed border-teal-700/50 flex items-center justify-center text-teal-700/80 text-xs text-center rounded-t-[48px]">
              Drop "WaveHeaderImg" variable here<br/>(Style: Image One, Top Wave)
            </div>
          </div>

          {/* === IMAGE TWO: RIGHT LOGISTICS ILLUSTRATION === */}
          {/* Positioned absolute to the middle-right. Uses transform to center vertically. */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[40%] md:w-[45%] lg:w-[40%] h-auto pr-6 md:pr-10 lg:pr-16 hidden md:block">
            {/* 
               Uncomment and replace with your imported illustration variable:
               <img src={LogisticsIllustrationImg} alt="Continuous line logistics illustration" className="w-full h-auto object-contain object-center-right" /> 
            */}
            {/* FALLBACK FOR DEVELOPMENT */}
            <div className="w-full h-[250px] border border-dashed border-teal-700/50 flex items-center justify-center text-teal-700/80 text-xs text-center rounded-r-[48px]">
              Drop "LogisticsIllustrationImg" variable here<br/>(Style: Image Two, Right Side)
            </div>
          </div>

          {/* 3. Text and Button Content */}
          {/* Positioned relative to layer on top of the absolutely positioned images. Use w-full and responsive text width for accuracy. */}
          <div className="relative z-10 w-full lg:w-[60%] space-y-6 flex flex-col items-start text-left">
            
            {/* Large, Bold White Title (Matches font weight and tracking) */}
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-tight max-w-[500px]">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>

            {/* Description Text (Light Teal/Gray for contrast) */}
            <p className="text-teal-100/90 text-base md:text-lg font-medium leading-[1.6] max-w-[550px]">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>

            {/* 4. Button Container */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-6">
              
              {/* PRIMARY BUTTON: DaisyUI Primary, Custom Rounded, Bold Text */}
              {/* Note: In your reference, this button uses the Lime Green color from a previous prompt. I've used that hex here (#CAEB66). */}
              <button 
                className="btn border-0 bg-[#CAEB66] text-[#02312A] hover:bg-[#A9CE4D] rounded-full px-8 md:px-10 text-base font-bold capitalize shadow-[0px_4px_12px_rgba(202,235,102,0.15)]"
              >
                Become a Merchant
              </button>

              {/* SECONDARY BUTTON: Outlined, Transparent Background, Match the teal border color */}
              <button 
                className="btn btn-outline border-teal-100/30 text-teal-100/90 hover:bg-white/5 rounded-full px-8 md:px-10 text-base font-bold capitalize"
              >
                Earn with ZapShift Courier
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SatisfactionBanner;