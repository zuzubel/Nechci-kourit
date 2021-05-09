import React, { useState } from 'react';

export const GoToNextSlide = () => {
  const [index, setIndex] = useState(0);
  const length = () => {
    if (index === length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
  };
  return setIndex(index);
};
