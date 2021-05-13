import React, { useState, useMemo } from 'react';
import './style.css';
import { ImageSlider } from './Carousel/ImageSlider';
import { SliderData } from '../Calculator/Carousel/SliderData';

//výpočty z kalkulačky
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

//mapování výsledků do správné cesty ke skupině výdajů za měsíc
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

//mapování výsledků do správné cesty ke skupině výdajů za měsíc
const mapPricePerYearToExpensesCategory = (pricePerYear) => {
  if (pricePerYear < 3001) {
    return SliderData.year.expensesCategory.upTo3000;
  }
  if (pricePerYear < 6001) {
    return SliderData.year.expensesCategory.upTo6000;
  }
  if (pricePerYear < 12001) {
    return SliderData.year.expensesCategory.upTo12000;
  }
  if (pricePerYear < 24001) {
    return SliderData.year.expensesCategory.upTo24000;
  }
  if (pricePerYear < 48001) {
    return SliderData.year.expensesCategory.upTo48000;
  }
  if (pricePerYear < 72001) {
    return SliderData.year.expensesCategory.upTo72000;
  }
  return SliderData.year.expensesCategory.over72000;
};

export const Calculator = () => {
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [years, setYears] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState(0);
  const [pricePerYear, setPricePerYear] = useState(0);
  const [priceAlreadyPaid, setPriceAlreadyPaid] = useState(0);

  //uložení výsledku mapovací funkce do správné proměnné
  const expensesPerMonth = useMemo(() => {
    return mapPricePerMonthToExpensesCategory(pricePerMonth);
  }, [pricePerMonth]);

  const expensesPerYear = useMemo(() => {
    return mapPricePerYearToExpensesCategory(pricePerYear);
  }, [pricePerYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPricePerMonth(
      getPricePerMonth(getPricePerDay(packageCost, cigarettesPerDay)),
    );
    setPricePerYear(getPricePerYear(pricePerMonth));
    setPriceAlreadyPaid(
      packageCost,
      getCigarettesAlreadySmoked(years, cigarettesPerDay),
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
      <div className="expensesCategory">
        {pricePerMonth > 0 && (
          <h4 className="expensesHeader">
            A co si místo cigaret dopřát každý měsíc tohle?
          </h4>
        )}
        {pricePerMonth > 0 && <ImageSlider expenses={expensesPerMonth} />}
      </div>
      <div className="expensesCategory">
        {pricePerMonth > 0 && (
          <h4 className="expensesHeader">A každý rok, třeba tohle: </h4>
        )}
        {pricePerMonth > 0 && <ImageSlider expenses={expensesPerYear} />}
      </div>
      {/* {pricePerMonth > 0 && <ImageSlider expenses={expensesAlreadyPaid} />} */}
    </>
  );
};
