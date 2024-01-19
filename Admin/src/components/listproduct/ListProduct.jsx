import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  const [allproducts,setAllProducts]=useState([]);
  const fetchInfo=async()=>{
    await fetch('https://eccomerceapi-75u7.onrender.com/allproducts')
    .then((response)=>response.json())
    .then((data)=>{setAllProducts(data)})
  }
  useEffect(()=>{
  fetchInfo();
  },[])
  const removeproduct=async(id)=>{//remove particular item in the database
    await fetch('https://eccomerceapi-75u7.onrender.com/removeproduct',
    {
      method:'POST',
      headers:
      {
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
      await fetchInfo();//it will update the data on the webbroswer
  }
  return (
    <div className='list-product'>
      <h1>All products list</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-products-allproducts">
   <hr />
      {allproducts.map((product,index)=>{
      return <>
       <div key={index} className="listproduct-format-main listproduct-format">
     <img src={product.image} alt="" className='listproduct-product-icon'/>

     <p>{product.name}</p>
     <p>${product.old_prices}</p>
     <p>${product.new_prices}</p>
     <p>{product.category}</p>
     <img onClick={()=>{removeproduct(product.id)}} src={cross_icon} alt="" className='listproduct-remove-icon' />
      </div>
      <hr />
      
      </>
      })}
      </div>
    </div>
  )
}

export default ListProduct
