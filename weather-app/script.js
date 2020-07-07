// Select Elements
const loactionElement = document.querySelector('.location');
const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperatur');
const minTemperatureElement = document.querySelector('.min-temperatur');
const maxTemperatureElement = document.querySelector('.max-temperatur');
const descriptionElement = document.querySelector('.description');
const notificationElement = document.querySelector('.notification');

// APP Data
const api_key = "{Your openweathermap API Key}";
const api_call_Current = ``;

// Function for get current location weather
function getCurrentWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setPosition, setError);
    }else{
        notificationElement.style.display = 'block';
        notificationElement.innerHTML = "Browser doesn't support geolocation.";
    }
}

// Function for get weather for search city
function getSearchWeather(){
    var city = $("#search").val();
    if(city === ""){
        notificationElement.style.display = 'block';
        notificationElement.innerHTML = "Please Enter city";
        $("#search").focus();
    }else{
        notificationElement.style.display = 'none';
        api_call = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        getWeather();
    }
    
}

// Set User's Position
function setPosition(position){
    notificationElement.style.display = 'none';
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    api_call = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    getWeather();
}

//Show Error if geolocation fails
function setError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `${error.message}`;
}

//Get weather from API providers
function getWeather(){
    fetch(api_call)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            if(data.cod === "404"){
                notificationElement.style.display = 'block';
                notificationElement.innerHTML = `${data.message}`;
            }else{
                loactionElement.innerHTML = `${data.name}, ${data.sys.country}`;
                temperatureElement.innerHTML = Math.floor(data.main.temp - 273);
                minTemperatureElement.innerHTML = `Min - ${Math.floor(data.main.temp_min - 273)}`;
                maxTemperatureElement.innerHTML = `Max - ${Math.floor(data.main.temp_max - 273)}`;
                descriptionElement.innerHTML = data.weather[0].description;

                let icon = setWeatherIcon(data.weather[0].icon);
                iconElement.innerHTML = `<i class="fa ${icon} fa-6x"></i>`;
            }
        });
}

// Set Weatger Icon
function setWeatherIcon(iconId){
    let icon = "";
    if(iconId === "01d"){ icon = "fa-sun"}
    else if(iconId === "01n"){ icon = "fa-moon"; }
    else if(iconId === "02d"){ icon = "fa-cloud-sun"; }
    else if(iconId === "02n"){ icon = "fa-cloud-moon"; }
    else if(iconId === "03d"){ icon = "fa-cloud"; }
    else if(iconId === "03n"){ icon = "fa-cloud"; }
    else if(iconId === "04d"){ icon = "fa-cloud-meatball"; }
    else if(iconId === "04n"){ icon = "fa-cloud-meatball"; }
    else if(iconId === "09d"){ icon = "fa-cloud-showers-heavy"; }
    else if(iconId === "09n"){ icon = "fa-cloud-showers-heavy"; }
    else if(iconId === "10d"){ icon = "fa-cloud-sun-rain"; }
    else if(iconId === "10n"){ icon = "fa-cloud-moon-rain"; }
    else if(iconId === "11d"){ icon = "fa-bolt"; }
    else if(iconId === "11n"){ icon = "fa-bolt"; }
    else if(iconId === "13d"){ icon = "fa-snowflake"; }
    else if(iconId === "13n"){ icon = "fa-snowflake"; }
    else if(iconId === "50d"){ icon = "fa-smog"; }
    else if(iconId === "50n"){ icon = "fa-smog"; }
    else{ icon = "fa-question"; }
    return icon;
}
