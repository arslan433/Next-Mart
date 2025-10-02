"use client";
import { useEffect, useState } from "react";

export default function ExclusiveOffer() {
  const calculateTimeLeft = () => {
    // Offer end date set karo (example: 7 days from now)
    const offerEnd = new Date("2025-10-10T23:59:59"); 
    const now = new Date();
    const difference = offerEnd - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-12">
      <div className="bg-[#C2EFD4] mx-auto max-w-[1400px] relative flex flex-col lg:flex-row justify-around items-center p-6 rounded-lg">
        
        {/* Left Image */}
        <img src="https://iili.io/3Bvpo4R.png" alt="Offer" className="max-w-sm" />

        {/* Right Content */}
        <div className="w-full lg:w-[589px] mt-8 lg:mt-0">
          <h2 className="text-[#224f34] text-[36px] lg:text-[46px] font-bold font-['Roboto_Slab']">
            Exclusive offer
          </h2>
          <p className="text-[#224f34] text-lg lg:text-[22px] font-medium font-['Poppins'] leading-8 mt-4">
            Unlock the ultimate style upgrade with our exclusive offer. Enjoy savings of up to 40% off on our latest New Arrivals.
          </p>

          {/* Countdown */}
          <div className="flex gap-6 my-10 font-['Poppins'] flex-wrap">
            <div className="w-[90px] h-[90px] text-center flex flex-col justify-center bg-white rounded-[3px] shadow">
              <span className="text-[#224f34] text-[28px] font-semibold">
                {timeLeft.days || "00"}
              </span>
              <span className="text-[#224f34] text-sm font-medium">Days</span>
            </div>
            <div className="w-[90px] h-[90px] text-center flex flex-col justify-center bg-white rounded-[3px] shadow">
              <span className="text-[#224f34] text-[28px] font-semibold">
                {timeLeft.hours || "00"}
              </span>
              <span className="text-[#224f34] text-sm font-medium">Hours</span>
            </div>
            <div className="w-[90px] h-[90px] text-center flex flex-col justify-center bg-white rounded-[3px] shadow">
              <span className="text-[#224f34] text-[28px] font-semibold">
                {timeLeft.minutes || "00"}
              </span>
              <span className="text-[#224f34] text-sm font-medium">Min</span>
            </div>
            <div className="w-[90px] h-[90px] text-center flex flex-col justify-center bg-white rounded-[3px] shadow">
              <span className="text-[#224f34] text-[28px] font-semibold">
                {timeLeft.seconds || "00"}
              </span>
              <span className="text-[#224f34] text-sm font-medium">Sec</span>
            </div>
          </div>

          {/* Button */}
          <button className="px-12 py-4 bg-[#224f34] rounded-[3px] shadow text-white text-lg font-medium font-['Poppins'] uppercase">
            BUY NOW
          </button>
        </div>
      </div>
    </section>
  );
}
