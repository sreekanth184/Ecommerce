import React from "react";
import bannerImg from "../assets/Images/image.png";
import { Link } from "react-scroll";

function Banner() {
  return (
    <div className="grid grid-cols-2 gap-4 shadow-xl">
      <div className="flex flex-col justify-center items-start px-20 text-4xl font-bold">
        <h2 className="text-4xl font-bold mb-4 text-orange-400">
          Explore Our Best Deals!
        </h2>
        <p className="text-base font-semibold mb-6 text-gray-500">
          Discover the latest trends and timeless classics in electronics at unbeatable prices. From cutting-edge gadgets to essential devices, we have everything you need to elevate your lifestyle. Don’t miss out—shop now and experience the best in technology!
        </p>
        <Link
          to="products"
          smooth={true}
          duration={500}
          offset={-30}
          className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Shop Now
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
      <div>
        <img src={bannerImg} alt="Promotional banner showcasing electronics deals" onError={(e) => e.target.src = "fallback-image-path.png"} />
      </div>
    </div>
  );
}

export default Banner;
