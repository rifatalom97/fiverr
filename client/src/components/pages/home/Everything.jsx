import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

export default function Everything() {
  const everythingData = [
    {
      title: "Stick to your budget",
      subtitle:
        "Find the right service for every price point. No hourly rates, just project-based pricing",
    },
    {
      title: "Get qualitiy work done quickly",
      subtitle:
        "Hand your project over to a talented freelancer in minutes, get long lasting results",
    },
    {
      title: "Pay when you are happy",
      subtitle:
        "Upfront quotes mean no surprises. Payments only get releassed when you approve",
    },
    {
      title: "Count on 47/7 support",
      subtitle:
        "Our round-the-clock support team is available to help anytime, anywhere.",
    },
  ];

  return (
    <div className="flex bg-[#f1fdf7] py-20 px-24 justify-between">
      <div>
        <h2 className="text-4xl mb-5 text-[#404145] font-bold">
          The best part? Everything.
        </h2>
        <ul className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => {
            return (
              <li key={title}>
                <div className="flex gap-2 items-center text-xl">
                  <BsCheckCircle className="text-[#62646a]" />
                  <h4>{title}</h4>
                </div>
                <p className="text-[#62646a]">{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative h-96 w-2/4">
        <Image src="/everything.webp" fill alt="everything" />
      </div>
    </div>
  );
}
