const url = 'https://api.openweathermap.org/data/2.5/weather';

export const getCurrentData = async (param) => {
  const resp = await fetch(`${url}?q=${param}&units=metric&appid=${process.env.REACT_APP_API_ID}`);
  const data = await resp.json();

  return data;
}