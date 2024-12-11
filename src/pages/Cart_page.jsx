import React, { useContext } from 'react';
import Global_Context from '../Context/global_context';

function Cart_page() {
  const { cart, cartcount, cartAmount, cartdispatch } = useContext(Global_Context);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Cart ({cartcount})
      </h2>
      {cart.length > 0 ? (
        cart.map((ele) => (
          <div key={ele.id} className="border rounded-lg shadow-md p-4 mb-4 bg-white flex flex-col md:flex-row items-center justify-between">
            <div className="flex-shrink-0">
              <img src={ele.images[0]} alt={ele.title} className="w-32 h-32 object-cover rounded-md" />
            </div>
            <div className="flex-grow md:ml-4">
              <h3 className="text-lg font-semibold">{ele.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-medium text-gray-700">Price: ${ele.price * ele.quantity}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => cartdispatch({ type: 'Decrease', payload: { id: ele.id, price: ele.price } })}
                    className="px-3 py-1 bg-gray-200 rounded-md text-black mr-2 hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <p className="text-lg">Qty: {ele.quantity}</p>
                  <button
                    onClick={() => cartdispatch({ type: 'Increase', payload: { id: ele.id, price: ele.price } })}
                    className="px-3 py-1 bg-gray-200 rounded-md text-black ml-2 hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      )}
      <div className="mt-4 text-center">
        <strong className="text-xl">Total Price: ${cartAmount}</strong>
      </div>
    </div>
  );
}

export default Cart_page;
