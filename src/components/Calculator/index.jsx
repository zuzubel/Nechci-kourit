import React, { useState, useMemo } from 'react';
import './style.css';
import { ImageSlider } from './Carousel/ImageSlider';

const getPricePerDay = (packageCost, cigarettesPerDay) => {
  if (packageCost === '' || cigarettesPerDay === '') {
    return 0;
  }

  return (Number(packageCost) / 20) * Number(cigarettesPerDay);
};

const getPricePerMonth = (pricePerDay) => pricePerDay * 30;

const getPricePerYear = (pricePerMonth) => pricePerMonth * 12;

const getCigarettesAlreadySmoked = (years, cigarettesPerDay) =>
  years * 365 * cigarettesPerDay;

const getPriceAlreadyPaid = (cigarettesAlreadySmoked, packageCost) =>
  cigarettesAlreadySmoked * (packageCost / 20);

export const Calculator = () => {
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [years, setYears] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPricePerMonth(
      getPricePerMonth(getPricePerDay(packageCost, cigarettesPerDay)),
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

          <br />

          <label className="calculatorLabel">
            Kolikátý rok kouříte?
            <input
              type="number"
              className="calculatorInput"
              value={years}
              onChange={(e) => setYears(e.target.value)}
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
              {submitted
                ? `${Math.round(getPricePerYear(pricePerMonth))} korun ročně.`
                : null}
            </p>
            <p className="calculatorResult">
              {submitted
                ? `Vykouřeno cigaret celkem: ${getCigarettesAlreadySmoked(
                    years,
                    cigarettesPerDay,
                  )}`
                : null}
            </p>

            {
              <p className="calculatorResult">
                {submitted
                  ? `Celkově vynaložené finance na kouření: ${Math.round(
                      getPriceAlreadyPaid(
                        getCigarettesAlreadySmoked(years, cigarettesPerDay),
                        packageCost,
                      ),
                    )}`
                  : null}
              </p>
            }
          </div>
        </div>
      </form>
      {pricePerMonth > 0 && <ImageSlider pricePerMonth={pricePerMonth} />}
    </>
  );
};
