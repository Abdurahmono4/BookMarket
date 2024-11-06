// pages/file/[id].js

import React from "react";
import { useRouter } from "next/router";

const FileDetails = () => {
  const router = useRouter();
  const { id } = router.query; // URL dan fayl id'sini olish

  return (
    <div className="container max-w-6xl cursor-pointer mr-auto ml-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        {/* Apostrofni HTML entitysi bilan almashtirish */}
        Fayl {id} Batafsil
      </h1>
      <p className="text-gray-600">
        Bu yerda faylning batafsil malumotlari korsatiladi.
      </p>
    </div>
  );
};

export default FileDetails;
