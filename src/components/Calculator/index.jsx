import React, { useState } from 'react';
import './style.css';

export const Calculator = () => {
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [pricePerYear, setPricePerYear] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const count = () => {
    setPricePerDay((packageCost / 20) * cigarettesPerDay);
    setPricePerMonth(pricePerDay * 30);
    setPricePerYear(pricePerMonth * 12);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    count();
    console.log(
      `za den ${pricePerDay}, za měsíc ${pricePerMonth}, za rok ${pricePerYear}`,
    );
    setSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Kolik cigaret denně vykouříte?
          <input
            type="text"
            value={cigarettesPerDay}
            onChange={(e) => setCigarettesPerDay(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Kolik Vás stojí krabička cigaret?
          <input
            type="text"
            value={packageCost}
            onChange={(e) => setPackageCost(e.target.value)}
            required
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={cigarettesPerDay === '' || packageCost === ''}
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
      </form>
    </>
  );
};
