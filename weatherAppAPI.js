import getAsyncData from "./getCurrentLocal.js";

async function getYourLocalizacion() {
  try {
    const result = await getAsyncData();
    if (typeof result === "object" && result !== null && result !== undefined) {
      const { latitude, longitude } = result;
      const finalData = await getWeatherData(latitude, longitude);
      return finalData;
    }
  } catch (error) {
    console.error("Erro ao obter os dados assíncronos:", error);
  }
}

const getWeatherData = async function (lat, long) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Erro durante a obtenção dos dados", error);
  }
};

export const finalWeatherData = await getYourLocalizacion();
