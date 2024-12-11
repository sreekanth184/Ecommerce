import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home_page = lazy(() => import('./pages/Home_page'));
const Product_page = lazy(() => import('./pages/Product_page'));
const Search_page = lazy(() => import('./pages/Search_page'));
const Category_page = lazy(() => import('./pages/Category_page'));
const Cart_page = lazy(() => import('./pages/Cart_page'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home_page />}>
          <Route path="search/:searchItem" element={<Search_page />} />
          <Route path="category/:categoryitem" element={<Category_page />} />
        </Route>
        <Route path="product/:productId" element={<Product_page />} />
        <Route path="carts" element={<Cart_page />} />
      </Routes>
    </Suspense>
  );
}

export default App;
