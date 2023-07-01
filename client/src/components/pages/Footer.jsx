import React from "react";
import Link from "next/link";

import {
  FiGithub,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import FiverrLogo from "./home/FiverrLogo";
import { categories } from "@/utils/categories";

export default function Footer() {
  const socialLinks = [
    {
      name: "Github",
      icon: <FiGithub />,
      link: "https:www.github.com",
    },
    {
      name: "Youtube",
      icon: <FiYoutube />,
      link: "https:www.youtube.com",
    },
    {
      name: "Linkedin",
      icon: <FiLinkedin />,
      link: "https:www.linkedin.com",
    },
    {
      name: "Instagram",
      icon: <FiInstagram />,
      link: "https:www.instagram.com",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      link: "https:www.twitter.com",
    },
  ];

  const data = [
    {
      headerName: "Categories",
      links: [
        ...categories.map(({ name }) => ({
          name,
          link: `/search?category=${name}`,
        })),
      ],
    },
    {
      headerName: "About",
      links: [
        { name: "Careers", link: "#" },
        { name: "Press & News", link: "#" },
        { name: "Partnership", link: "#" },
        { name: "Privacy Policy", link: "#" },
        { name: "Terms of Service", link: "#" },
        { name: "Intellectual Property Claims", link: "#" },
        { name: "Investor Relations", link: "#" },
      ],
    },
    {
      headerName: "Support",
      links: [
        { name: "Help & Support", link: "#" },
        { name: "Trust & Safety", link: "#" },
        { name: "Selling on Fiverr", link: "#" },
        { name: "Buying on Fiverr", link: "#" },
      ],
    },
    {
      headerName: "Community",
      links: [
        { name: "Community Success Stories", link: "#" },
        { name: "Community Hub", link: "#" },
        { name: "Forum", link: "#" },
        { name: "Events", link: "#" },
        { name: "Blog", link: "#" },
        { name: "Influencers", link: "#" },
        { name: "Affiliates", link: "#" },
        { name: "Podcast", link: "#" },
        { name: "Invite a Friend", link: "#" },
        { name: "Become a Seller", link: "#" },
        { name: "Community Standards", link: "#" },
      ],
    },
    {
      headerName: "Move From Fiverr",
      links: [
        { name: "Fiverr Business", link: "#" },
        { name: "Fiverr Pro", link: "#" },
        { name: "Fiverr Logo Maker", link: "#" },
        { name: "Fiverr Guides", link: "#" },
        { name: "Get Inspired", link: "#" },
        { name: "Fiverr Select", link: "#" },
        { name: "Clear Voice", link: "#" },
        { name: "Fiverr Workspace", link: "#" },
        { name: "Learn", link: "#" },
        { name: "Working Not Working", link: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full mx-auto px-32 py-16 h-max border-t border-gray-200 bg-gray-100">
      <ul className="flex justify-between">
        {data.map(({ headerName, links }) => {
          return (
            <li key={headerName} className="flex flex-col gap-2">
              <span className="font-bold">{headerName}</span>
              <ul className="flex flex-col gap-2">
                {links.map(({ name, link }) => {
                  return (
                    <Link key={name} href={link}>
                      {name}
                    </Link>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex items-center justify-between">
        <FiverrLogo fillColor={"#404145"} />
        <ul className="flex gap-5">
          {socialLinks.map(({ icon, link, name }) => {
            return (
              <li
                key={name}
                className="text-xl text-[#404145] hover:text-[#108F73] transition-all"
              >
                <Link href={link}>{icon}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}