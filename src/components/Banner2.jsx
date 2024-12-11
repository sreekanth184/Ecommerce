import React from 'react';

function Banner2() {
  return (
    <div className='bg-gray-400 flex flex-col items-center gap-4 py-8' id='coupon'>
      <h1 className='font-bold text-5xl'>Last Chance for Big Discounts!</h1>
      <p className='text-lg font-sans text-gray-600'>
        Don’t let these deals slip away! Save big on top-selling products.
      </p>
      <div className='text-white text-lg'>
        Extra 15% off your order with code: 
        <span className='text-2xl font-bold text-orange-400'> LASTCHANCE</span>
      </div>
    </div>
  )
}

export default Banner2;
