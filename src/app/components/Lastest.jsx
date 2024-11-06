import React, { useState, useCallback } from "react";
import { FaFileAlt } from "react-icons/fa";
import Link from "next/link";

const Latest = () => {
  // Sinov uchun 11 ta fayl qo'shildi
  const files = [
    { id: 1, title: "Fayl 1", uploadedDate: "2024-11-01" },
    { id: 2, title: "Fayl 2", uploadedDate: "2024-11-02" },
    { id: 3, title: "Fayl 3", uploadedDate: "2024-11-03" },
    { id: 4, title: "Fayl 4", uploadedDate: "2024-11-04" },
    { id: 5, title: "Fayl 5", uploadedDate: "2024-11-05" },
    { id: 6, title: "Fayl 6", uploadedDate: "2024-11-06" },
    { id: 7, title: "Fayl 7", uploadedDate: "2024-11-07" },
    { id: 8, title: "Fayl 8", uploadedDate: "2024-11-08" },
    { id: 9, title: "Fayl 9", uploadedDate: "2024-11-09" },
    { id: 10, title: "Fayl 10", uploadedDate: "2024-11-10" },
    { id: 11, title: "Fayl 11", uploadedDate: "2024-11-11" },
    { id: 12, title: "Fayl 12", uploadedDate: "2024-11-12" },
  ];

  // Sahifa boshida 5 ta faylni ko'rsatamiz
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Har bir sahifada ko'rsatiladigan fayllar soni

  // Fayllarni sahifalar bo'yicha bo'lish
  const indexOfLastFile = currentPage * itemsPerPage;
  const indexOfFirstFile = indexOfLastFile - itemsPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  // Sahifa navigatsiyasini boshqarish
  const totalPages = Math.ceil(files.length / itemsPerPage);

  // Sahifa raqamini o'zgartirish funksiyasi
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Prev va Next tugmalari uchun funksiyalar
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container bg-white max-w-6xl cursor-pointer mr-auto ml-auto px-4 py-4 mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        So&apos;ngi qo&apos;shilgan fayllar
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentFiles.map((file) => (
          <li
            key={file.id}
            className="flex items-center py-3 px-5 border border-gray-300 bg-white hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out"
          >
            {/* Faylga bosilganda yangi sahifaga o'tish */}
            <Link
              href={`/file/${file.id}`}
              className="flex items-center w-full"
            >
              {/* Fayl ikonasi */}
              <FaFileAlt className="text-gray-600 w-6 h-6 mr-4" />

              {/* Fayl nomi va sanasi */}
              <div className="flex-1">
                <div className="text-gray-800 font-medium">{file.title}</div>
                <div className="text-sm text-gray-500">{file.uploadedDate}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination / Sahifalash */}
      <div className="flex justify-between items-center mt-6">
        {/* Prev tugmasi */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>

        {/* Sahifa raqamlari */}
        <div className="flex space-x-2">
          {currentPage > 3 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 border rounded bg-white text-gray-800"
            >
              1
            </button>
          )}
          {currentPage > 4 && (
            <span className="flex items-center text-gray-800 py-2">...</span>
          )}

          {Array.from({ length: 3 }, (_, index) => {
            const pageNumber = currentPage - 1 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 border rounded ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
          {currentPage < totalPages - 2 && (
            <span className="flex items-center text-gray-800 py-2">...</span>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 border rounded bg-white text-gray-800"
            >
              {totalPages}
            </button>
          )}
        </div>

        {/* Next tugmasi */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Latest;
