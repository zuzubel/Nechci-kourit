import React, { useState, useMemo } from 'react';
import './style.css';
import { SliderData } from './SliderData';

const mapPricePerMonthToExpensesCategory = (pricePerMonth) => {
  if (pricePerMonth < 251) {
    return SliderData.month.expensesCategory.upTo250;
  }
  if (pricePerMonth < 501) {
    return SliderData.month.expensesCategory.upTo500;
  }
  if (pricePerMonth < 1001) {
    return SliderData.month.expensesCategory.upTo1000;
  }
  if (pricePerMonth < 2001) {
    return SliderData.month.expensesCategory.upTo2000;
  }
  if (pricePerMonth < 4001) {
    return SliderData.month.expensesCategory.upTo4000;
  }
  if (pricePerMonth < 6001) {
    return SliderData.month.expensesCategory.upTo6000;
  }
  return SliderData.month.expensesCategory.over6000;
};

export const ImageSlider = (props) => {
  const expenses = useMemo(() => {
    return mapPricePerMonthToExpensesCategory(props.pricePerMonth);
  }, [props.pricePerMonth]);

  const length = useMemo(() => {
    return expenses.length;
  }, [expenses]);

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
      {expenses.map((slide, index) => {
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
