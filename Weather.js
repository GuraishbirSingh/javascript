//storing references of elements in variables
let temperature = document.getElementById("Temp");
let description = document.getElementById("Desc");
let location1 = document.getElementById("loc");
let button1 = document.getElementById("CurrentWeather");
let notification = document.getElementById("notif");
let CurrentWeather = {};
CurrentWeather.temperature = {
    unit: "celsius"
}
//adding CurrentWeather as onclick function on button element
button1.onclick = Weather;

function Weather() {
    if (!navigator.geolocation) {
        notification.textContent = "Geolocation is not supported by your browser";
    } else {
        navigator.geolocation.getCurrentPosition(Position, Error);
    }

    // setting user location
    function Position(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        Weather1(latitude, longitude);
    }

    // showing error if geolocation service is not working
    function Error(error) {
        notification.textContent = `${error.message}`;
    }

    // fetching CurrentWeather details from api
    function Weather1(latitude, longitude) {

        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=09ca21f95fe2e882270a487a604359d5`;

        fetch(api)
            .then(function (response) {
                let Values = response.json();
                return Values;
            })
            .then(function (Values) {
                CurrentWeather.temperature.value = Math.floor(Values.main.temp - 273);
                CurrentWeather.description = Values.weather[0].description;
                CurrentWeather.city = Values.name;
                CurrentWeather.country = Values.sys.country;
            })
            .then(function () {
                displayWeather();
            });
    }

    // display CurrentWeather details
    function displayWeather() {
        temperature.innerHTML = `Current temperature is ${CurrentWeather.temperature.value}°C`;
        description.innerHTML = `Conditions: ${CurrentWeather.description}`;
        location1.innerHTML = `Current Location: ${CurrentWeather.city}, ${CurrentWeather.country}`;
    }
}