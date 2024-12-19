import React from 'react';

function Banner2() {
  return (
    <div className='bg-gray-400 flex flex-col items-center gap-4 py-8 px-4 sm:px-8 md:px-16' id='coupon'>
      <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl text-center'>
        Last Chance for Big Discounts!
      </h1>
      <p className='text-base sm:text-lg font-sans text-gray-600 text-center'>
        Don’t let these deals slip away! Save big on top-selling products.
      </p>
      <div className='text-white text-lg sm:text-xl md:text-2xl'>
        Extra 15% off your order with code: 
        <span className='text-xl sm:text-2xl md:text-3xl font-bold text-orange-400'> LASTCHANCE</span>
      </div>
    </div>
  );
}

export default Banner2;
