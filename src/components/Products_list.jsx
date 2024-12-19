import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';
import Global_Context from '../Context/global_context';

function Products_list({ product }) {
  const { id, images, title, price } = product;
  const { cartdispatch, cart } = useContext(Global_Context);
  const [isWishlist, setIsInWishlist] = useState(() => {
    const savedState = localStorage.getItem(`isWishlist_${id}`);
    return savedState ? JSON.parse(savedState) : false;
  });

  // const [lazyLoad, setLazyLoad] = useState(false);
  // const productRef = useRef(null);

  // useEffect(() => {
  //   // Set up the Intersection Observer
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setLazyLoad(true);
  //           observer.disconnect(); // Stop observing once element is visible
  //         }
  //       });
  //     },
  //     { threshold: 1.0 } // Trigger when 10% of the product is visible
  //   );

  //   if (productRef.current) {
  //     observer.observe(productRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);

  const addToCart = () => {
    cartdispatch({
      type: 'Add',
      payload: product
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsInWishlist((prev) => {
      const newValue = !prev;
      localStorage.setItem(`isWishlist_${id}`, JSON.stringify(newValue));
      return newValue;
    });
  };

  if (!product || !images || images.length === 0) return null;

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-wrap" id="products">
          <Link to={`/product/${id}`}>
            <div className="relative w-full h-48 mb-4 flex items-center justify-center">
              <img
                src={images[0]}
                alt={title}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-600 text-sm font-medium">
              {title}
            </h3>
            <div className="text-gray-900 font-semibold">
              ${price}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button 
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                onClick={addToCart}
              >
                Add To Cart
              </button>

              <Link
                to={`/product/${id}`}
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                aria-label="View product"
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </Link>

              <button
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                aria-label="Add to wishlist"
                onClick={handleWishlist}
              >
                <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
    </div>
  );
}

export default Products_list;
