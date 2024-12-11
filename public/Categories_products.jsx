import React from 'react'
import { Link } from 'react-router-dom';

function Categories_products({product}) {
  const { id,images, brand,title, price, discountPercentage, rating } = product;
    return (
      <Link to={`/product/${id}`} className='w-full'>
        <div className='border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-between '>
        <div className="w-auto h-48">
          <img src={images[0]} alt={title} className="w-full h-full object-fit" />
        </div>
        <div className="text-center">
        <div className="font-bold">{brand}</div>
        <div>{title}</div>
          <div>Price: ${price}</div>
          <div>Discount: {discountPercentage}%</div>
          <div>Rating: {rating} / 5</div>
        </div>
      </div>
      </Link>
    );
}

export default Categories_products
