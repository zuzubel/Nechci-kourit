import React, { useState } from 'react';
import './style.css';
import { SliderData } from './SliderData';

export const ImageSlider = () => {
  const length = SliderData.expensesCategory.upTo250.length;

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    console.log(current);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    console.log(current);
  };

  return (
    <section className="slider">
      <div className="leftArrow" onClick={prevSlide} />
      <div className="rightArrow" onClick={nextSlide} />
      {SliderData.expensesCategory.upTo250.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img
                className="img_carousel"
                src={slide.image}
                alt={slide.name}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};
