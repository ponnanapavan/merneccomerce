import React from 'react'
import './newcollection.css'

import Item from '../items/Item'
import { useState } from 'react'
import { useEffect } from 'react'
const NewCollections = () => {
  const [new_collection,setNew_Collection]=useState([]);
  useEffect(()=>{
   fetch('http://localhost:4000/newcollections')
   .then((response)=>response.json())
   .then((data)=>setNew_Collection(data))
  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_prices} old_price={item.old_prices}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections
