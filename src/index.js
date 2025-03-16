import "./styles.css"

const location = document.querySelector('input');
const searchButton = document.querySelector('button');
const description = document.querySelector('.description');
const temp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const high = document.querySelector('.high');
const low = document.querySelector('.low');
const locationName = document.querySelector(".location-name");

  async function getWeatherData(location) {
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+"?key=NTHJDAQ3YVDVMM7BU9FUJBGS6", {mode: 'cors'});
    const weatherData = await response.json();
    const conditions = weatherData.currentConditions.conditions;
    const feelsLike = weatherData.currentConditions.feelslike;
    const temp = weatherData.currentConditions.temp;
    const high = weatherData.days[0].tempmax;
    const low=weatherData.days[0].tempmin;
    const address = weatherData.resolvedAddress;
    return {conditions,feelsLike,temp,high,low,address};
  }

searchButton.addEventListener("click",async()=>{
    const weatherData = getWeatherData(location.value);
    locationName.innerText = (await weatherData).address;
    description.innerText = (await weatherData).conditions;
    temp.innerHTML = `${(await weatherData).temp}&deg;F`;
    feelsLike.innerHTML = "Feels like "+`${(await weatherData).feelsLike}&deg;F`;
    high.innerHTML = "High: "+ (await weatherData).high+"&deg;F";
    low.innerHTML="Low: "+(await weatherData).low+"&deg;F";
    location.value = '';
});