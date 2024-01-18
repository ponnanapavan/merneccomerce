import React from 'react'
import './popular.css'

import Item from '../items/Item'
import { useState } from 'react'
import { useEffect } from 'react'
const Popular = () => {
 
  const [data_product,setData_Product]=useState([]);
  useEffect(()=>{
  fetch('http://localhost:4000/popularinwomen')
  .then((response)=>response.json())
  .then((data)=>{setData_Product(data)})
  },[])

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_prices} old_price={item.old_prices}/>
        })}
      </div>
    </div>
  )
}

export default Popular
