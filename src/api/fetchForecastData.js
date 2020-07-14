const url = 'https://api.openweathermap.org/data/2.5/onecall';

export const getForecastData = async (lat,long) => {
  const resp = await fetch(`${url}?lat=${lat}&lon=${long}&units=metric&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_API_ID}`);
  const data = await resp.json();

  return data;
}