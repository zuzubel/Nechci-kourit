import React, { useState } from 'react';

export const GoToPrevSlide = () => {
  const [ index, setIndex ] = useState(0)
  const length = () => {
    if (index < 1) {
      index = length - 1;
    } else {
      index = index -1;
    }
  }
  return setIndex(index)
}