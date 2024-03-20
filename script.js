import { finalWeatherData } from "./weatherAppAPI.js";
import { icons } from "./icons.js";

if (
  typeof finalWeatherData === "object" &&
  finalWeatherData !== null &&
  finalWeatherData !== undefined
) {
  const parseData = function (data) {
    const dataValues = {
      current: treatedCurrent(data),
      hourly: treatedHourly(data),
      daily: treatedDaily(data),
    };
    return dataValues;
  };
  const dataToShow = parseData(finalWeatherData);

  if (dataToShow) {
    const frontLoader = document
      .querySelector(".loader")
      .classList.add("loader--hidden");

    const renderTempNow = function ({ current }) {
      const template = `
      <div class="tempNow">
      <img src="images/weather-symbol-${icons.get(
        current.iconCode
      )}.svg" alt="" />
      <p>31°</p>
    </div>
    <div class="tempDetails">
      <div class="tempDetails__container">
        <p>
          HIGH <br />
          ${current.highTemp}
        </p>
        <p>
          LOW <br />
          ${current.minTemp}
        </p>
        <p>
          FL HIGH <br />
          ${current.highFeelsLike}
        </p>
        <p>
          FL LOW <br />
          ${current.lowFeelsLike}
        </p>
        <p>
          WIND <br />
          ${current.windspeed}MPH
        </p>
        <p>
          PRECIP <br />
          ${current.precip}
        </p>
      </div>
    </div>`;
      const parent = document.querySelector(".todaySection");
      parent.innerHTML = template;
    };

    const renderWeeklyCards = function ({ daily }) {
      daily.forEach((element) => {
        const day = timestampToDay(element.timestamp);
        const template = `<div class="card">
        <img src="images/weather-symbol-${icons.get(
          element.iconCode
        )}.svg" alt="" />
        <p>${day}</p>
        <span>${element.maxTemp}°</span>
      </div>`;
        const parent = document.querySelector(".weekTempReport");
        parent.innerHTML += template;
      });
    };

    const renderHourlyCards = function ({ hourly }) {
      hourly.forEach((element) => {
        const day = timestampToDay(element.timestamp);
        const hour = timestampToDay(element.timestamp, true);
        const template = `<div class="fullyDescriptionCard">
        <div>
          <p>
            ${day} <br />
            ${hour} ${hour > 12 ? "PM" : "AM"}
          </p>
        </div>
        <img src="images/weather-symbol-${icons.get(
          element.iconCode
        )}.svg" alt="" />
        <div>
          <p>
            TEMP <br />
            ${element.temp}°
          </p>
        </div>
        <div>
          <p>
            FL TEMP <br />
            ${element.feelsLike}°
          </p>
        </div>
        <div>
          <p>
            WIND <br />
            ${element.windSpeed}mph
          </p>
        </div>
        <div>
          <p>
            PRECIP <br />
            ${element.precipitation}in
          </p>
        </div>
      </div>`;
        const parent = document.querySelector(".detailedTemp");
        parent.innerHTML += template;
      });
    };

    renderHourlyCards(dataToShow);
    renderWeeklyCards(dataToShow);
    renderTempNow(dataToShow);
  }
}

function treatedCurrent({ current, daily }) {
  const {
    temperature_2m: temperature,
    wind_speed_10m: windspeed,
    apparent_temperature: tempFeelsLike,
    precipitation,
    weather_code: iconCode,
  } = current;

  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
  } = daily;

  return {
    temperature: Math.round(temperature),
    highTemp: Math.round(maxTemp),
    minTemp: Math.round(minTemp),
    highFeelsLike: Math.round(maxFeelsLike),
    lowFeelsLike: Math.round(minFeelsLike),
    windspeed: Math.round(windspeed),
    precip: Math.round(precip * 100) / 100,
    iconCode,
  };
}

function treatedHourly({ hourly, current }) {
  return hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weather_code[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.wind_speed_10m[index]),
        precipitation: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(
      ({ timestamp }) =>
        (timestamp) =>
          current.time * 1000
    );
}

function treatedDaily({ daily }) {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weather_code[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    };
  });
}

function timestampToDay(timestmp, getHour = false) {
  const date = new Date(timestmp);
  const diaDaSemana = date.getDay();
  const hora = date.getHours();
  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  if (getHour) {
    return hora;
  }
  return diasDaSemana[diaDaSemana];
}
