import React from 'react';
import './breadcrum.css';
import arrow_icon from '../assests/breadcrum_arrow.png';

const Breadcrum = (props) => {
  console.log(props);

  // Destructure product from props and provide default values if product is undefined
  const { product = {} } = props;

  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />
      
      {product.category && (
        <>
          <img src={arrow_icon} alt="" /> {product.category}
        </>
      )}

      {product.name && (
        <>
          <img src={arrow_icon} alt="" /> {product.name}
        </>
      )}
    </div>
  );
};

export default Breadcrum;

