import React from 'react'
import './relatedproducts.css'
import Item from '../items/Item'
import { useState } from 'react'
import { useEffect } from 'react'
const RelatedProducts = () => {
  const [data_product,setData_Product]=useState([]);
  useEffect(()=>{
  fetch('https://eccomerceapi-75u7.onrender.com/popularinwomen')
  .then((response)=>response.json())
  .then((data)=>{setData_Product(data)})
  },[])
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/>
      <div className="relatedproducts-item">
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_prices} old_price={item.old_prices} category={item.category}/>
        })}

      </div>
    </div>
  )
}

export default RelatedProducts
