"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PopularServices() {
  const router = useRouter();

  const popularServices = [
    {
      name: "Ai Artists",
      label: "Add talent to Ai",
      image: "/service1.png",
    },
    {
      name: "Logo Design",
      label: "Build your brand",
      image: "/service2.jpeg",
    },
    {
      name: "Wordpress",
      label: "Customize your site",
      image: "/service3.jpeg",
    },
    {
      name: "Voice Over",
      label: "Share your message",
      image: "/service4.jpeg",
    },
    {
      name: "Social Media",
      label: "Reach more customers",
      image: "/service5.jpeg",
    },
    {
      name: "SEO",
      label: "Unlock growth online",
      image: "/service6.jpeg",
    },
    {
      name: "Illustration",
      label: "Color your dreams",
      image: "/service7.jpeg",
    },
    {
      name: "Translation",
      label: "Go global",
      image: "/service8.jpeg",
    },
  ];

  return (
    <div className="mx-20 my-16">
      <h2 className="text-4xl mb-5 font-bold text-[#404145] text-center">
        Popular Services
      </h2>
      <ul className="flex flex-wrap gap-3 items-center">
        {popularServices.map(({ name, label, image }) => (
          <li
            key={name}
            className="relative cursor-pointer"
            onClick={() => router.push(`/search?q-${name.toLowerCase()}`)}
          >
            <div className="absolute z-10 text-white left-5 top-4">
              <span>{label}</span>
              <h6 className="font-extrabold text-2xl">{name}</h6>
            </div>
            <div className="h-80 w-72 relative">
              <Image src={image} fill alt="service" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}