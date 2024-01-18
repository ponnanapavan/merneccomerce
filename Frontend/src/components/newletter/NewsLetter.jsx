import React from 'react'
import  './newsletter.css'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email </h1>
      <p>Subscribe to your newsletter</p>
      <div>
        <input type="email" placeholder='enter your email' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
