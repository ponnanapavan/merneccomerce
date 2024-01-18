import React, { useContext } from 'react';
import './productdisplay.css';
import star_icon from '../assests/star_icon.png';
import star_dul_icon from '../assests/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;

  const { addToCart } = useContext(ShopContext);

  return (
    <div className='productdisplay'>
      <div className="product-left">
        <div className="productdisplay-img-list">
          {product?.image && (
            <>
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
            </>
          )}
        </div>
        <div className="productdisplay-img">
          {product?.image && (
            <img className='productdisplay-main-img' src={product.image} alt="" />
          )}
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dul_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product?.old_prices}</div>
          <div className="productdisplay-right-price-new">${product?.new_prices}</div>
        </div>
        <div className="productdisplay-right-description">
          {product?.description}
        </div>
        <div className="productdisplay-right">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => { addToCart(product?.id) }}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span>{product?.category}</p>
        <p className='productdisplay-right-category'><span>Tags :</span>{product?.tags}</p>
      </div>
    </div>
  );
}

export default ProductDisplay;
