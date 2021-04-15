import React, { useState, useMemo } from 'react';
import './style.css';

export const Calculator = () => {
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const pricePerDay = useMemo(() => {
    if (packageCost === '' || cigarettesPerDay === '') {
      return 0;
    }
    
    return (Number(packageCost) / 20) * Number(cigarettesPerDay)
  }, [packageCost, cigarettesPerDay])

  const pricePerMonth = useMemo(() =>  pricePerDay * 30, [pricePerDay])
  
  const pricePerYear = useMemo(() => pricePerMonth * 12, [pricePerMonth])

  const handleSubmit = (e) => {
    e.preventDefault();
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
            type="number"
            value={cigarettesPerDay}
            onChange={(e) => setCigarettesPerDay(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Kolik Vás stojí krabička cigaret?
          <input
            type="number"
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
