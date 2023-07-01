import Image from "next/image";
import React from "react";

export default function Companies() {
  return (
    <div className="flex items-center justify-center text-gray-400 text-2xl font-bold min--[11vh]">
      Trusted by: &nbsp;
      <ul className="flex justify-center gap-10 ml-10">
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item} className="relative h-[4.5rem] w-[4.5rem]">
            <Image alt="Trusted brands" fill src={`/trusted${item}.png`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
