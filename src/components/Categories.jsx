import React from 'react';
import { Link } from 'react-router-dom';

function Categories({ catg }) {
  return (
    <div className="w-full" id="category_list">
      <Link 
        to={`/category/${catg}`}
        className="text-start w-full bg-white text-gray-700 rounded-lg px-2.5 py-1.5 hover:bg-blue-400 hover:text-black"
        aria-label={`Go to category: ${catg}`}
      >
        {catg}
      </Link>
    </div>
  );
}

export default Categories;
