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

    return (Number(packageCost) / 20) * Number(cigarettesPerDay);
  }, [packageCost, cigarettesPerDay]);

  const pricePerMonth = useMemo(() => pricePerDay * 30, [pricePerDay]);

  const pricePerYear = useMemo(() => pricePerMonth * 12, [pricePerMonth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `za den ${pricePerDay}, za měsíc ${pricePerMonth}, za rok ${pricePerYear}`,
    );
    setSubmitted(true);
  };

  return (
    <>
      <form className="calculatorFormContainer" onSubmit={handleSubmit}>
        <div className="inputsContainer">
          <label className="calculatorLabel">
            Kolik cigaret denně vykouříte?
            <input
              className="calculatorInput"
              type="number"
              value={cigarettesPerDay}
              onChange={(e) => setCigarettesPerDay(e.target.value)}
              required
            />
          </label>

          <br />

          <label className="calculatorLabel">
            Kolik Vás stojí krabička cigaret?
            <input
              className="calculatorInput"
              type="number"
              value={packageCost}
              onChange={(e) => setPackageCost(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <button className="formButton" type="submit">
          Vypočítat
        </button>

        <div className="resultContainer">
          {' '}
          {submitted ? `Kouření Vás průměrně stojí: ` : null}
          <div className="calculatorResults">
            <p className="calculatorResult">
              {submitted ? `${Math.round(pricePerMonth)} korun měsíčně.` : null}
            </p>
            <p className="calculatorResult">
              {submitted ? `${Math.round(pricePerYear)} korun ročně.` : null}
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
