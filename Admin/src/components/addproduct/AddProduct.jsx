import React, { useState } from 'react'
import  './AddProduct.css'
import uploadarea from '../../assets/upload_area.svg'
const AddProduct = () => {
    const [image,setImage]=useState(false);
    const [productdetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_prices:"",
        old_prices:""
    })
    const imagehandler=(e)=>{
    setImage(e.target.files[0]);
    }
    const productdetailshandler=(e)=>{
        setProductDetails({...productdetails,[e.target.name]:e.target.value })// here we updating the object 
    }
    async function App_product(){
    let responseData;
    let product=productdetails;
    let formData=new FormData();// creates a empty form data
    formData.append('product',image);
    await fetch('http://localhost:4000/upload',
    {
        method:'POST',
        headers:
        {
            Accept:'application/json'
        },
        body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})
    if(responseData.success){
        product.image=responseData.image_url;
        await fetch('https://eccomerceapi-75u7.onrender.com/addproduct',//here i am storing the product data in mongodb 
        {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'// it tells to the server sending data in the form of json format 
            },
            body:JSON.stringify(product),// it convert into json to json string format 
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Product added"):alert("failed")
        })
    }
    }
  return (
    <div className='add-product'>
     <div className="addproduct-itemfields">
        <p>Product</p>
        <input value={productdetails.name} onChange={productdetailshandler} type="text" name='name' placeholder='Type here' />
     </div>
     <div className="addproduct-price">
        <div className="addproduct-itemfields">
            <p>Price</p>
            <input value={productdetails.old_prices} onChange={productdetailshandler} type="text" name='old_prices' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfields">
            <p>Offer Price</p>
            <input value={productdetails.new_prices} onChange={productdetailshandler} type="text" name='new_prices' placeholder='Type here'/>
        </div>
     </div>
     <div className="addproduct-itemfields">
        <p>Product Category </p>
        <select value={productdetails.category} onChange={productdetailshandler} name="category" className='addproduct-selector'>
            <option value="women">women</option>
            <option value="men">men</option>
            <option value="kid">kids</option>
        </select>
     </div>
     <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):uploadarea} className='add-product-thumbnail' alt="" />
        </label>
        <input onChange={imagehandler} type="file" name='image' id='file-input' hidden />
     </div>
     <button onClick={()=>{App_product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
