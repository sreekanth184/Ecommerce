import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ecom_instance from '../server/api';
import Products_list from '../components/Products_list';

function Category_page() {
let{categoryitem}=useParams()


let [cproducts, setCproducts]=useState([]);

  async function categoryProducts(){
    try{
         let res1 = await ecom_instance.get(`/products/category/${categoryitem}`)
         setCproducts(res1.data);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    categoryProducts();
  },[categoryitem])
  
  return (
    <div>
    <div className='grid grid-cols-4 gap-12 p-4'>
      {cproducts.products && cproducts.products.map((product) => <Products_list key={product.id} product={product} />)}
    </div>
    </div>
  )
}

export default Category_page
