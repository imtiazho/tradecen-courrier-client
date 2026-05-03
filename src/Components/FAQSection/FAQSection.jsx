import React, { useState } from "react";
import { LuChevronDown, LuChevronUp, LuMoveUpRight } from "react-icons/lu";

const faqData = [
  {
    id: 1,
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    id: 2,
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, our products are designed with adjustable straps to accommodate various body shapes and sizes, ensuring a comfortable fit for everyone.",
  },
  {
    id: 3,
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Absolutely. By aligning your spine and shoulders, it reduces the strain on your muscles, which is a primary cause of chronic back pain.",
  },
  {
    id: 4,
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Our Pro version includes integrated sensors that gently vibrate when you slouch, training your muscle memory more effectively.",
  },
  {
    id: 5,
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can sign up for our newsletter or click the 'Notify Me' button on the product page to receive an instant email alert.",
  },
];

const FAQSection = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="bg-[#F2F4F7] py-20 px-4 md:px-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-[#02312A] text-3xl md:text-4xl font-extrabold mb-4">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="text-[#5F7180] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={`collapse collapse-arrow bg-white rounded-2xl transition-all duration-300 border-2 ${
                activeId === item.id
                  ? "border-[#02312A]/40 bg-[#E8F0F0]"
                  : "border-transparent shadow-sm"
              }`}
            >
              <input
                type="radio"
                name="my-accordion-2"
                checked={activeId === item.id}
                onChange={() => setActiveId(item.id)}
              />

              {/* Question Title */}
              <div className="collapse-title text-base md:text-lg font-bold text-[#02312A] flex justify-between items-center pr-6">
                {item.question}
                {/* Custom Icon override if needed, otherwise DaisyUI handle it via collapse-arrow */}
              </div>

              {/* Answer Content */}
              <div className="collapse-content">
                {/* Visual line to separate title from content when open */}
                <div className="h-px w-full bg-[#02312A]/10 mb-4" />
                <p className="text-[#5F7180] leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: "See More FAQ's" */}
        <div className="flex justify-center mt-12">
          <button className="group flex items-center bg-[#CAEB66] hover:bg-[#b8d65a] text-[#02312A] font-bold pl-8 pr-2 py-2 rounded-full text-base transition-all duration-300 cursor-pointer">
            {/* Button Text */}
            <span className="mr-4">See More FAQ's</span>

            {/* Integrated Icon Circle */}
            <div className="bg-[#1A1A1A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:rotate-45">
              <LuMoveUpRight className="text-[#CAEB66] text-xl" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
