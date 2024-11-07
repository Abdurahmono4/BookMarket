import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../firebaseConfig";
import { FaUserCircle, FaBell } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false); // Client-side ni tekshirish

  // `useEffect` faqat client-side ishlaydi
  useEffect(() => {
    setIsClient(true); // `window` dan foydalanish mumkin bo'ladi
  }, []);

  // Barcha useState va useEffect hooks-larni doimiy ravishda chaqirish
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modalni boshqarish
  const [userName, setUserName] = useState(""); // Ismni saqlash
  const [userPhoto, setUserPhoto] = useState(""); // Foydalanuvchi fotosurati

  // Tizimga kirgan foydalanuvchi ma'lumotlarini olish
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserName(currentUser.displayName || "Foydalanuvchi");
        setUserPhoto(currentUser.photoURL || "/images/");
      }
    });

    return () => unsubscribe(); // Unsubscribe qilish
  }, []);

  // Modalni ochish va yopish
  const toggleModal = () => setModalOpen(!modalOpen);

  // Chiqish funksiyasi
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    setUserName("");
    setUserPhoto(""); // Foto va ismi tozalash
    setModalOpen(false); // Modalni yopish
  };

  // Agar isClient hali false bo'lsa, hech narsa render qilishni istamaymiz
  if (!isClient) {
    return null; // yoki loading komponentini ko'rsating
  }

  return (
    <div className="container max-w-6xl ml-auto mr-auto relative">
      <nav className="bg-gray-800 text-white">
        <div className="mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold uppercase">
            <Link href="/">Logo</Link>
          </div>
          <div className="space-x-6 flex items-center">
            {/* Agar foydalanuvchi tizimga kirgan bo'lsa */}
            {user ? (
              <>
                <div className="flex items-center space-x-4 relative">
                  {/* Avatar */}
                  <div className="relative">
                    <Image
                      src={userPhoto}
                      alt={userName}
                      className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={toggleModal} // Modalni ochish
                      width={34}
                      height={32}
                    />
                  </div>

                  {/* Qong'iroqcha (Notifications) */}
                  <div className="relative">
                    <FaBell className="text-white w-6 h-6" />
                    <div className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-3 h-3 flex items-center justify-center">
                      3
                    </div>
                  </div>
                </div>

                {/* Modal */}
                {modalOpen && (
                  <div className="absolute top-16 right-4 w-72 bg-white shadow-lg rounded-lg z-50 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={userPhoto}
                          alt={userName}
                          className="w-8 h-8 rounded-full"
                          width={32}
                          height={32}
                        />
                        <span className="font-semibold text-xl">
                          {userName}
                        </span>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={toggleModal} // Modalni yopish
                      >
                        &times;
                      </button>
                    </div>
                    <div className="mt-4 space-y-2">
                      <ul>
                        <li>
                          <Link
                            href="/profile"
                            className="text-gray-700 hover:text-gray-900"
                          >
                            Profil
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/settings"
                            className="text-gray-700 hover:text-gray-900"
                          >
                            Sozlamalar
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/subscriptions"
                            className="text-gray-700 hover:text-gray-900"
                          >
                            Obunalar
                          </Link>
                        </li>
                        <li>
                          <button
                            className="text-red-500 w-full text-left"
                            onClick={handleLogout}
                          >
                            Chiqish
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link href="/signin" className="hover:cursor-pointer">
                  Kirish
                </Link>
                <Link href="/signup" className="hover:cursor-pointer">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Reklama */}
      <div className="activebar flex justify-center items-center">
        <Link href="/">
          <Image
            src="/images/reklama.jpeg"
            alt="Reklama"
            width={1152}
            height={216}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
