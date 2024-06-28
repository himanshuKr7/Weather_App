async function fetchWeatherData(city) {
    try {
        const apiKey = 'de456e17df487aad3ba7da4919f4b474';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
        showNotFound();
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const notfound = document.querySelector(".notfound");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");
const citydateinfo = document.querySelector(".city-date-section");
const tempinfo = document.querySelector(".temperature-info");
const addinfo = document.querySelector(".additional-info");
// fetchWeatherData();

function updateWeatherUI(data) {
    if (data.cod === "404") {
        showNotFound();
    } else {
        notfound.style.display = "none";
        citydateinfo.style.display = "flex";
        tempinfo.style.display = "flex";
        addinfo.style.display = "flex";
        cityElement.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        windSpeed.textContent = `${data.wind['speed']} km/h`;
        humidity.textContent = `${data.main.humidity}%`;
        visibility.textContent = `${data.visibility / 1000} km`;
        descriptionText.textContent = data.weather[0].description;

        const currentDate = new Date();
        date.textContent = currentDate.toDateString();
        const weatherIconName = getWeatherIconName(data.weather[0].main);
        descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
    }
}

function showNotFound() {
    notfound.style.display = "flex";
    citydateinfo.style.display = "none";
    tempinfo.style.display = "none";
    addinfo.style.display = "none";
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}
