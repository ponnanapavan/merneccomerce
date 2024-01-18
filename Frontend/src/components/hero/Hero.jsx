import React from 'react'
import './Hero.css'
import hand_icon from '../assests/hand_icon.png'
import arrow_icon from '../assests/arrow.png'
import hero_image from '../assests/hero_image.png'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>New ARRIVALS ONLY</h2>
        <div>
            <div className="hero-icon">
                <p>new</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div className='text'>Latest Colection</div>
            <img className='arrow' src={arrow_icon} alt="" />

        </div>
      </div>
      <div className="hero-right">
        <div>
         <img src={hero_image} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
