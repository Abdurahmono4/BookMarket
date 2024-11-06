"use client";
import Link from "next/link";
import { auth } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false); // Flag to check if on client-side
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility
  const [userName, setUserName] = useState(""); // User's name
  const [userPhoto, setUserPhoto] = useState(""); // User's photo URL

  // Set isClient to true after the component mounts
  useEffect(() => {
    setIsClient(true); // Window can be accessed after this
  }, []);

  // Fetch user data when client-side
  useEffect(() => {
    if (isClient) {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          setUserName(currentUser.displayName || "Foydalanuvchi");
          setUserPhoto(currentUser.photoURL || "/images/default-avatar.png");
        }
      });

      return () => unsubscribe();
    }
  }, [isClient]); // Run only after client-side rendering

  // Toggle modal visibility
  const toggleModal = () => setModalOpen(!modalOpen);

  // Handle user logout
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    setUserName("");
    setUserPhoto("");
    setModalOpen(false); // Close the modal on logout
  };

  if (!isClient) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  return (
    <div className="container max-w-6xl ml-auto mr-auto relative">
      <nav className="bg-gray-800 text-white">
        <div className="mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold uppercase">
            <Link href="/">Logo</Link>
          </div>
          <div className="space-x-6 flex items-center">
            {/* Conditional rendering based on authentication state */}
            {user ? (
              <>
                <div className="flex items-center space-x-4 relative">
                  {/* Avatar */}
                  <div className="relative">
                    <Image
                      src={userPhoto}
                      alt={userName}
                      className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={toggleModal}
                    />
                  </div>

                  {/* Notifications */}
                  <div className="relative">
                    <FaBell className="text-white w-6 h-6" />
                    <div className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-3 h-3 flex items-center justify-center">
                      3
                    </div>
                  </div>
                </div>

                {/* Modal for user profile options */}
                {modalOpen && (
                  <div className="absolute top-16 right-4 w-72 bg-white shadow-lg rounded-lg z-50 p-4 transform transition-all ease-in-out duration-300 scale-100 opacity-100">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={userPhoto}
                          alt={userName}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-semibold text-xl">
                          {userName}
                        </span>
                      </div>
                      <button className="text-red-500" onClick={toggleModal}>
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
                  Ro&apos;yxatdan o'tish
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Advertising Banner */}
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
