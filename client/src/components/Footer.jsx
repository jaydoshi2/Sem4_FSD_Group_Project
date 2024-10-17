import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-indigo-100 py-16 shadow-[0_8px_15px_rgba(0,0,0,0.5)]"> {/* Added custom shadow */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 px-4">
            <h4 className="text-lg font-medium text-indigo-700 mb-8 relative">
              company
              <span className="absolute bottom-0 left-0 bg-indigo-700 h-[2px] w-12"></span>
            </h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">what we offer</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">careers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">professional certificates</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">for enterprise</a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 px-4">
            <h4 className="text-lg font-medium text-indigo-700 mb-8 relative">
              community
              <span className="absolute bottom-0 left-0 bg-indigo-700 h-[2px] w-12"></span>
            </h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">learners</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">partners</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">beta testers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">blog</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">teaching center</a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 px-4">
            <h4 className="text-lg font-medium text-indigo-700 mb-8 relative">
              more
              <span className="absolute bottom-0 left-0 bg-indigo-700 h-[2px] w-12"></span>
            </h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">about us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">our services</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">privacy policy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-black transition-all">affiliate program</a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 px-4">
            <h4 className="text-lg font-medium text-indigo-700 mb-8 relative">
              follow us
              <span className="absolute bottom-0 left-0 bg-indigo-700 h-[2px] w-12"></span>
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-700 h-10 w-10 flex items-center justify-center rounded-full border border-indigo-700 hover:bg-indigo-700 hover:text-indigo-100 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-indigo-700 h-10 w-10 flex items-center justify-center rounded-full border border-indigo-700 hover:bg-indigo-700 hover:text-indigo-100 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-indigo-700 h-10 w-10 flex items-center justify-center rounded-full border border-indigo-700 hover:bg-indigo-700 hover:text-indigo-100 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-indigo-700 h-10 w-10 flex items-center justify-center rounded-full border border-indigo-700 hover:bg-indigo-700 hover:text-indigo-100 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
