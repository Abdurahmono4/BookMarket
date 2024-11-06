"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";
import LiteratureFilter from "./components/LiteratureFilter";
import Footer from "./components/Footer";
import Latest from "./components/Lastest";

const Page = () => {
  const { user, signOut } = useAuth();
  const [filter, setFilter] = useState("all"); // Boshlanganida barchasi tanlangan bo'ladi

  const literature = [
    { id: 1, title: "Adabiyot 1", type: "lesson" },
    { id: 2, title: "Adabiyot 2", type: "course" },
    { id: 3, title: "Adabiyot 3", type: "report" },
    { id: 4, title: "Adabiyot 4", type: "slides" },
    { id: 5, title: "Adabiyot 5", type: "lesson" },
    { id: 6, title: "Adabiyot 6", type: "certificate" },
    // boshqa ma'lumotlar
  ];
  const recentFiles = [
    { id: 1, title: "Fayl 1", uploadedDate: "2024-11-01" },
    { id: 2, title: "Fayl 2", uploadedDate: "2024-11-03" },
    { id: 3, title: "Fayl 3", uploadedDate: "2024-11-05" },
    // boshqa ma'lumotlar
  ];

  // Linkni bosganida filtrni o'zgartirish
  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div className="bg-slate-200">
      {/* Navbar */}
      <Navbar user={user} signOut={signOut} />

      {/* Filter links */}
      <div className="container max-w-6xl cursor-pointer mr-auto ml-auto px-0 py-2">
        <ul className="flex justify-between w-full">
          <li
            onClick={() => handleFilterClick("all")}
            className={`bg-white py-3 px-5 border-2 cursor-pointer w-1/6 text-center   transition-all duration-300  ease-in-out filter-item ${
              filter === "all"
                ? "active text-blue-600 btn"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Barchasi
          </li>
          <li
            onClick={() => handleFilterClick("certificate")}
            className={`cursor-pointer bg-white w-1/6 py-3 px-5 border-2 text-center transition-all duration-300 ease-in-out filter-item ${
              filter === "certificate"
                ? "active text-blue-600 "
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            IELTS AND CERF
          </li>
          <li
            onClick={() => handleFilterClick("lesson")}
            className={`cursor-pointer bg-white py-3 w-1/6 px-5 border-2 text-center transition-all duration-300 ease-in-out filter-item ${
              filter === "lesson"
                ? "active text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Dars ishlanmalari
          </li>
          <li
            onClick={() => handleFilterClick("course")}
            className={`cursor-pointer bg-white py-3 px-5 w-1/6 border-2 text-center transition-all duration-300 ease-in-out filter-item ${
              filter === "course"
                ? "active text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Kurslar
          </li>
          <li
            onClick={() => handleFilterClick("report")}
            className={`cursor-pointer bg-white py-3 px-5 w-1/6 border-2  text-center transition-all duration-300 ease-in-out filter-item ${
              filter === "report"
                ? "active text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Referatlar
          </li>
          <li
            onClick={() => handleFilterClick("slides")}
            className={`cursor-pointer bg-white py-3 px-5 w-1/6 text-center border-2 transition-all duration-300 ease-in-out filter-item ${
              filter === "slides"
                ? "active text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Slaydlar
          </li>
        </ul>
      </div>

      <LiteratureFilter literature={literature} filter={filter} />

      <Latest files={recentFiles} />

      <Footer />
    </div>
  );
};

export default Page;
