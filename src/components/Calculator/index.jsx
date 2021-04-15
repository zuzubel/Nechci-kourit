import React, { useState } from 'react';
import './style.css';

export const Calculator = () => {
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    setSubmitted(true);
    setPricePerDay((packageCost / 20) * cigarettesPerDay);
    setPricePerMonth(pricePerDay * 30);
    setPricePerYear(pricePerMonth * 12);
  };

  return (
    <>
      <label>
        Kolik cigaret denně vykouříte?
        <input
          type="text"
          value={cigarettesPerDay}
          onChange={(e) => setCigarettesPerDay(e.target.value)}
        />
      </label>
      <label>
        Kolik Vás stojí krabička cigaret?
        <input
          type="text"
          value={packageCost}
          onChange={(e) => setPackageCost(e.target.value)}
        />
      </label>
      <button
        type="submit"
        onClick={handleClick}
        disabled={cigarettesPerDay === '' && packageCost === ''}
      >
        Vypočítat
      </button>

      <div className="result">
        {' '}
        {submitted
          ? `Kouření Vás průměrně stojí: `
          : 'Pro výpočet vyplňte požadovaná pole.'}
        <div>{submitted ? `${pricePerMonth} korun měsíčně.` : null}</div>
        <div>{submitted ? `${pricePerYear} korun ročně.` : null}</div>
      </div>
    </>
  );
};
