import "./styles.css"

const location = document.querySelector('input');
const searchButton = document.querySelector('button');


const refresh = (container)=>{
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
};

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
const icons = importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/));

const container = document.querySelector(".info-container");
container.style.display = "none";

  async function getWeatherData(location) {
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+"?key=NTHJDAQ3YVDVMM7BU9FUJBGS6", {mode: 'cors'});
    const weatherData = await response.json();
    const conditions = weatherData.currentConditions.conditions;
    const feelsLike = weatherData.currentConditions.feelslike;
    const temp = weatherData.currentConditions.temp;
    const high = weatherData.days[0].tempmax;
    const low=weatherData.days[0].tempmin;
    const address = weatherData.resolvedAddress;
    const icon = weatherData.currentConditions.icon;
    return {conditions,feelsLike,temp,high,low,address,icon};
  }



searchButton.addEventListener("click",async()=>{
    refresh(container);
    
    
    const currentWeather = document.createElement("div");
    currentWeather.classList.add("current-weather");

    const locationName = document.createElement("div");
    locationName.classList.add("location-name");
    const general = document.createElement("div");
    general.classList.add("general");

    const description = document.createElement("div");
    description.classList.add("description");
    const icon = document.createElement("div");
    icon.classList.add("icon");
    const img = document.createElement("img");
    const temp = document.createElement("div");
    temp.classList.add("temp");
    const feelsLike = document.createElement("div");
    feelsLike.classList.add("feels-like");
    icon.appendChild(img);
    general.appendChild(temp);
    general.appendChild(description);
    general.appendChild(icon);
    general.appendChild(feelsLike);

    const highLow = document.createElement("div");
    highLow.classList.add("high-low");

    const high = document.createElement("div");
    high.classList.add("high");
    const low = document.createElement("div");
    low.classList.add("low");

    highLow.appendChild(high);
    highLow.appendChild(low);

    currentWeather.appendChild(locationName);
    currentWeather.appendChild(general);

    container.appendChild(currentWeather);
    container.appendChild(highLow);
    const weatherData = getWeatherData(location.value);
    locationName.innerText = (await weatherData).address;
    description.innerText = (await weatherData).conditions;
    temp.innerHTML = `${(await weatherData).temp}&deg;F`;
    feelsLike.innerHTML = "Feels like "+`${(await weatherData).feelsLike}&deg;F`;
    high.innerHTML = "High: "+ (await weatherData).high+"&deg;F";
    low.innerHTML="Low: "+(await weatherData).low+"&deg;F";
    const iconName = (await weatherData).icon;
    img.src = icons[iconName+".svg"];
    location.value = '';
    container.style.display = "block";
    console.log(icons);
});