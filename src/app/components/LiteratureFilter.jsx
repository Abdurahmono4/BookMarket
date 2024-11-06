import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5"; // Tozalash tugmasi uchun ikonka

const LiteratureFilter = ({ literature, filter }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv so'rovini saqlash
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounce qilingan qidiruv so'rovi
  const [timeoutId, setTimeoutId] = useState(null); // Timeout id

  // Filtrlangan adabiyotlar
  const filteredLiterature =
    filter === "all"
      ? literature.filter((item) =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      : literature
          .filter((item) => item.type === filter)
          .filter((item) =>
            item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
          );

  // Fayl sonini hisoblash
  const filteredCount = filteredLiterature.length;

  // Qidiruvni tozalash
  const clearSearch = () => {
    setSearchQuery(""); // Qidiruvni bo'shatish
    setDebouncedQuery(""); // Debounce-ni tozalash
  };

  // Qidiruvni faollashtirish (debounce)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Agar eski timeout mavjud bo'lsa, uni tozalash
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Yangi timeout yaratish
    const newTimeoutId = setTimeout(() => {
      setDebouncedQuery(value); // Yozilgan so'rovni debouncedQueryga yuborish
    }, 500); // 500ms kutish
    setTimeoutId(newTimeoutId);
  };

  // Qidiruv formasi yuborilganda
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Sahifa yangilanmasligi uchun
    // Bu yerda qo'shimcha qidiruv logikasi yoki serverga yuborish mumkin
  };

  return (
    <div className="container bg-white max-w-6xl cursor-pointer mr-auto ml-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div className="flex mx-4 my-2 items-center">
          <h2 className="text-gray-700 text-xl font-bold">
            {filter === "all" ? "Barcha Adabiyotlar" : filter}
          </h2>
          <span className="py-1 px-4 docs--type--counter">
            {filteredCount} ta Fayl
          </span>
        </div>
        <div>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <label
              htmlFor="search"
              className="border border-gray-400 rounded px-3 py-1 flex items-center justify-between"
            >
              <input
                type="text"
                id="search"
                className="text-gray-800 border-gray-300 rounded-md focus:outline-none"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={handleSearchChange} // Yozilgan qidiruv so'rovini handle qilish
              />
              <button type="submit" className="submit">
                {/* Qidiruv ikonkasi, searchQuery bo'sh bo'lsa ko'rinadi */}
                {!searchQuery && (
                  <IoSearch size={24} className="text-gray-800" />
                )}
              </button>

              {/* Tozalash tugmasi */}
              {searchQuery && (
                <button
                  type="button"
                  className="ml-2 text-gray-500"
                  onClick={clearSearch} // Qidiruvni tozalash
                >
                  <IoCloseCircleOutline size={20} />
                </button>
              )}
            </label>
          </form>
        </div>
      </div>
      <ul className="h-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredLiterature.length === 0 ? (
          <li className="text-gray-500">Hech qanday adabiyot topilmadi!</li>
        ) : (
          filteredLiterature.map((item) => (
            <li
              key={item.id}
              className="flex items-center space-x-2 py-2 border-b border-gray-300 bg-white hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
            >
              <Image
                src="/images/folder13.svg"
                alt="Folder Icon"
                width={32}
                height={32}
              />
              <span className="ml-2 text-gray-800">{item.title}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LiteratureFilter;
