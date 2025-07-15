import React from "react";
import { FaInstagram, FaXTwitter, FaSnapchat  } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f39f6b] text-white py-6 bottom-0 w-full mt-10">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          Trackerz &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com/ali.alhajjali1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group p-2 rounded-full transition-all duration-200 hover:bg-green-800">
              <FaInstagram className="text-2xl text-green-800 group-hover:text-white transition-colors duration-200" />
            </div>
          </a>
          <a
            href="https://x.com/aliiihaj"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group p-2 rounded-full transition-all duration-200 hover:bg-green-800">
              <FaXTwitter className="text-2xl text-green-800 group-hover:text-white transition-colors duration-200" />
            </div>
          </a>
          <a
            href="https://www.snapchat.com/add/ali.alhajjali1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="group p-2 rounded-full transition-all duration-200 hover:bg-green-800">
              <FaSnapchat className="text-2xl text-green-800 group-hover:text-white transition-colors duration-200" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;