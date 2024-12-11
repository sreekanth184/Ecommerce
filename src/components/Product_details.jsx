import React, { useState, useEffect, useContext } from 'react';
import Global_Context from '../Context/global_context';
import { Star, ShoppingCart, Trash2 } from 'lucide-react';

const ProductDetails = ({ item }) => {
  const { cartdispatch, cart } = useContext(Global_Context);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setIsItemInCart(cart.find((items) => items.id === item.id));
  }, [cart, item.id]);

  const addToCart = () => {
    cartdispatch({
      type: 'Add',
      payload: item
    });
  };

  const removeFromCart = () => {
    cartdispatch({
      type: 'Remove',
      payload: item.id
    });
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountedAmount = (price * discount) / 100;
    return (price - discountedAmount).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-10">
        {/* Product Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-square rounded-lg border border-gray-200 overflow-hidden bg-white">
              <img
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded border ${
                    selectedImage === index
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  } overflow-hidden bg-white`}
                >
                  <img
                    src={image}
                    alt={`${item.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0 flex flex-col gap-6 lg:px-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{item.rating}/5</span>
              </div>
              <span>|</span>
              <span>Brand: {item.brand}</span>
              <span>|</span>
              <span>Category: {item.category}</span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${calculateDiscountedPrice(item.price, item.discountPercentage)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${item.price}
              </span>
              <span className="text-sm font-semibold text-green-600">
                {item.discountPercentage}% OFF
              </span>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={addToCart}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                  isItemInCart
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isItemInCart ? 'In Cart' : 'Add to Cart'}
              </button>
              {isItemInCart && (
                <button
                  onClick={removeFromCart}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {item.reviews ? (
              item.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    Review by {review.reviewerName}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No reviews available</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
