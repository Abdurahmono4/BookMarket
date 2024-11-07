import React from "react";
import {
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaPhoneAlt,
  FaEnvelope,
  FaRegFileAlt,
} from "react-icons/fa"; // Icons for payment systems, phone, email, etc.
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 container max-w-6xl ml-auto mr-auto  pb-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src="/images/Logotip"
              alt="Logo"
              className=""
              width={32}
              height={32}
            />
            <p className="text-sm text-gray-400">
              Providing quality service and innovative solutions for our
              customers. We focus on delivering exceptional value.
            </p>
          </div>

          {/* Payment Systems */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Payment Methods</h4>
            <div className="flex space-x-4">
              <FaPaypal className="text-3xl" />
              <FaCcVisa className="text-3xl" />
              <FaCcMastercard className="text-3xl" />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-xl" />
              <span className="text-gray-400">+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-xl" />
              <span className="text-gray-400">info@company.com</span>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <div className="flex items-center space-x-2">
              <FaRegFileAlt className="text-xl" />
              <a href="/terms" className="text-gray-400 hover:text-white">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        <p>&copy; 2024 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
