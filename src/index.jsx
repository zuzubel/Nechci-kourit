import React from 'react';
import { render } from 'react-dom';
import './index.html';
import './style.css';
import { Navigation } from './components/Navigation';
import { HomeWelcoming } from './components/HomeScreen';
import { Calculator } from './components/Calculator';
import { ImageSlider } from './components/Calculator/Carousel/ImageSlider';

const App = () => {
  return (
    <>
      <Navigation />
      <Calculator />
      <ImageSlider />
    </>
  );
};

render(<App />, document.querySelector('#app'));
