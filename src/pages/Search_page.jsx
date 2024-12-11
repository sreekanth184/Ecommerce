import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import Products_list from '../components/Products_list'
import ecom_instance from '../server/api'

function Search_page() {
let{searchItem}=useParams()
let[sproducts, setSproducts]=useState([])

async function searchProducts(){
    try{
        let res1 = await ecom_instance.get(`/products/search?q=${searchItem}`)
        setSproducts(res1.data)
    }
    catch(error){
        console.log(error)
    }
}

useEffect(()=>{
    searchProducts();
},[searchItem])


  return (
    <div>
<div className='grid grid-cols-4 gap-12 p-4'>
      {sproducts.products && sproducts.products.map((product) => <Products_list key={product.id} product={product} />)}
    </div>
    </div>
  )
}

export default Search_page
