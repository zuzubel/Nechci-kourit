import React, { useState } from 'react';
import './style.css';

export const Navigation = () => {
  const [burgerOpened, setBurgerOpened] = useState(false);
  const handleClick = () => setBurgerOpened(false);

  return (
    <>
      <header className={burgerOpened ? 'addBackground' : 'header'}>
        <div className="branding">
          <h1 className="site-name">To byla poslední</h1>
          <button className="burgerMenu-icon"></button>
          <a href="">
            <div className="site-logo"></div>
          </a>
        </div>
        <div className="burger-menu">
          <button
            className={
              burgerOpened ? 'menu-btn cross-icon' : 'menu-btn burger-icon'
            }
            onClick={() => setBurgerOpened(!burgerOpened)}
          ></button>
        </div>
        <nav className="main-navigation">
          <div
            className={
              burgerOpened
                ? 'menu-container menu--column addBackground'
                : 'menu-container menu--row'
            }
          >
            <ul className="menu nav-menu">
              <li className="menu-item">
                <a href="" className="nav-link" onClick={handleClick}>
                  Domů
                </a>
              </li>
              <li className="menu-item">
                <a href="" className="nav-link" onClick={handleClick}>
                  Jak přestat
                </a>
              </li>
              <li className="menu-item">
                <a href="" className="nav-link" onClick={handleClick}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className={burgerOpened ? 'addPhoto' : null}></div>
    </>
  );
};
