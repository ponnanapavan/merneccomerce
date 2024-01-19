import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ShopContext=createContext(null)
const getDefaultCart=()=>{
  let cart={}
  for(let index=0; index<300+1; index++){
    cart[index]=0;
  }
         return cart;
}
const ShopContextProvider=(props)=>
{
  const [all_products,setAll_Product]=useState([]);
  const [cartItems, setCartItems]=useState(getDefaultCart());//intially get an empty cart 
  useEffect(()=>{
      fetch('https://eccomerceapi-75u7.onrender.com/allproducts')
      .then((response)=>response.json()).then((data)=>setAll_Product(data))
      if(localStorage.getItem('auth-token')){
        fetch('https://eccomerceapi-75u7.onrender.com/getcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json'
          },
          body:"",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data))
      }
     
  },[])

    
      const addToCart=(ItemId)=>
      {
        setCartItems((prev)=>({...prev,[ItemId]:(prev[ItemId]+1)}));
        if(localStorage.getItem('auth-token'))
        {
          fetch('https://eccomerceapi-75u7.onrender.com/addtocart',{
            method:'POST',
            headers:
            {
              Accept:'application/form-data',
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type':'application/json'
            },
            body:JSON.stringify({"ItemId":ItemId})
          })
          .then((response)=>response.json())
          .then((data)=>console.log(data));
        }
       
      }
      const removeFromCart=(ItemId)=>
      {
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-1}));
        if(localStorage.getItem('auth-token'))
        {
          fetch('https://eccomerceapi-75u7.onrender.com/removefromcart',{
            method:'POST',
            headers:
            {
              Accept:'application/form-data',
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type':'application/json'
            },
            body:JSON.stringify({"ItemId":ItemId})
          })
          .then((response)=>response.json())
          .then((data)=>console.log(data));
        }
      }
      const TotalAmount=()=>
      {
        let totalamount=0;
       for(const data in cartItems)
       {
        if(cartItems[data]>0)
        {
         
          let iteminfo=all_products.find((product)=>product.id===(Number(data)))
          totalamount+=iteminfo.new_prices*cartItems[data];
         
        }
       }
            return totalamount;
        
      }
      const gettotalcarts=()=>{
        let totalitem=0;
        for(const item in cartItems)
        {
          if(cartItems[item]>0)
          {
            totalitem+=cartItems[item];
          }
        }
         
            return totalitem;
      }
      const contextValue={gettotalcarts,TotalAmount,all_products,cartItems,addToCart,removeFromCart};
      return (
        <ShopContext.Provider value={contextValue}>
        
            {props.children}
        </ShopContext.Provider>
      )
}
export default ShopContextProvider