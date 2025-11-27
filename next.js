let card = document.querySelector('.bottom');
let search = document.querySelector("#search");

const apiKey = 'b3e3faf1236213bb9a519ee5d16081d0';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// TIME FUNCTION 
function getLocalTime(timezone) {
    let utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    let local = new Date(utc + timezone * 1000);

    let hours = local.getHours();
    let minutes = local.getMinutes();

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}

// FETCH WEATHER
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (data.cod == "404") {
            card.innerHTML = `
                <div class="error-box">
                    <h2>❌ City Not Found</h2>
                    <p>Please enter a valid city name.</p>
                </div>
            `;
            return;
        }

        showWeather(data);

    } catch (error) {
        console.log("Error:", error);
    }
}


// SHOW WEATHER 
function showWeather(d) {

    let weatherType = d.weather[0].main;
    let icon;

    if (weatherType === "Clear" || weatherType === "Clouds" || weatherType === "Haze") {
        icon = "/images/2.png";
    }
    else if (weatherType === "sunny") {
        icon = "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg";
    }
    else if (weatherType === "Rain") {
        icon = "/images/7.png";
    }
    else if (weatherType === "Snow") {
        icon = "/images/10.png";
    }
    else if (weatherType === "Thunderstorm") {
        icon = "/images/8.png";
    }
    else {
        icon = "/images/11.png";
    }


    let date = new Date();
    let localTime = getLocalTime(d.timezone);
    var weather_round = Math.floor(d.main.temp);
    card.innerHTML = `
        <div class="b-top">
            <h4>${d.name}</h4>
            <h5>${d.weather[0].main}</h5>
            <img id="weatherIcon" src="${icon}" alt="Weather">
            <h2 id="cityName">${weather_round}°C</h2>

            <!-- LOCAL TIME + DATE -->
            <p id="description">
                ${days[date.getUTCDay()]}, 
                ${date.getUTCDate()} 
                ${months[date.getUTCMonth()]} 
                ${date.getUTCFullYear()} |
                ${localTime}
            </p>
        </div>

        <div class="b-bottom">
            <div class="boxes">
                <img src="/images/4.png" alt="">
                <h5>${d.main.humidity}%<br>Humidity</h5>
            </div>
            <div class="boxes">
                <img src="/images/5.png" alt="">
                <h5>${d.main.feels_like}<br>Feels like</h5>
            </div>
            <div class="boxes">
                <img src="/images/6.png" alt="">
                <h5>${d.wind.speed} km/h<br>Wind Speed</h5>
            </div>
        </div>
    `;
}

// SEARCH 
function submit(e) {
  if(e.target.value.trim() !== "") {
      if (e.key === "Enter") {
        let city = e.target.value;
        fetchWeatherData(city);
    }
    }
}

search.addEventListener("keyup", submit);


fetchWeatherData("karachi");
