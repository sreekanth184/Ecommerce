import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Search from "../components/Search";
import ecom_instance from "../server/api";
import Categories from "../components/Categories";
import { Outlet, useOutlet } from "react-router-dom";
import Products_list from "../components/Products_list";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Bottom_Banner from "../components/Bottom_Banner";
import Banner2 from "../components/Banner2";

function Home_page() {
  const isOutlet = useOutlet();
  const [category, setCategory] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getCategories() {
    setIsLoading(true);
    try {
      let res1 = await ecom_instance.get(`/products/category-list`);
      setCategory(res1.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getProducts() {
    setIsLoading(true);
    try {
      let res2 = await ecom_instance.get(`/products`);
      setAllproducts(res2.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!isOutlet) {
      getProducts();
    }
  }, [isOutlet]);

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-gray-400 rounded-lg bg-black">
        <Search getProducts={getProducts} category={category} />
      </div>

      <div>
        <Banner />
      </div>

      {/* Shop by Category with Slider */}
      <div className="w-10/12 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-blue-500">
            Shop by Category
          </h2>
          
          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button className="category-prev-btn bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button className="category-next-btn bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Categories Swiper */}
        <div className="border-2 border-gray-200 rounded-lg p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading categories...</p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '.category-prev-btn',
                nextEl: '.category-next-btn',
              }}
              slidesPerView={5}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="category-swiper"
            >
              {category.map((catg, index) => (
                <SwiperSlide key={index}>
                  <Categories catg={catg} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="flex flex-row gap-4 w-10/12 mx-auto">
        {isOutlet ? (
          <Outlet />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 p-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              allproducts?.products?.map((product) => (
                <Products_list key={product.id} product={product} />
              ))
            )}
          </div>
        )}
      </div>

      <Banner2 />
      <Bottom_Banner />
      <Footer />
    </div>
  );
}

export default Home_page;