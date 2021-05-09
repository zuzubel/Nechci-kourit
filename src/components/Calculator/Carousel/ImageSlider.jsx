import React from 'react';
import './style.css';
import { SliderData } from './SliderData';

export const ImageSlider = () => {
  return (
    <>
      {SliderData.expensesCategory.upTo250.map((slide, index) => {
        return (
          <img className="img_carousel" src={slide.image} alt={slide.name} />
        );
      })}
    </>
  );
};
