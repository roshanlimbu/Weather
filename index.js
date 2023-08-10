const mainContainer = document.querySelector(".main-container");
const searchBtn = document.querySelector(".search-city button");
const currentWeather = document.querySelector('.current-weather');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


searchBtn.addEventListener('click', ()=>{
    const apikey = '9c1d66328b9945adb10e6a9e20abac52';
    const cityName = document.querySelector('.search-city input').value;
    
    // console.log(cityName)
    if(cityName ==''){
        return;
    } 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`)
        .then(response => response.json())
        .then(json => {
            // if there is an error
            if (json.cod === '404') {
                mainContainer.style.height = '400px';
                currentWeather.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }  else {
                // when there is some valid  data
                error404.style.display= "none";
                error404.classList.remove('fadeIn');

                const currentWeatherImage = document.querySelector('.current-weather img');
                const temperature = document.querySelector('.current-weather .temperature');
                const description = document.querySelector('.current-weather .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                switch(json.weather[0].main){
                    case "Clear":
                    currentWeatherImage.src="./assets/clear.png";
                    break;

                    case "Clouds":
                    currentWeatherImage.src="./assets/cloud.png";
                    break;

                    case "Rain":
                    currentWeatherImage.src="./assets/rain.png";
                    break;

                    case "Snow":
                    currentWeatherImage.src="./assets/snow.png";
                    break;

                    case "Haze":
                    currentWeatherImage.src="./assets/mist.png";
                    break;

                    default:
                    currentWeatherImage.src = '';
                }


                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                currentWeather.style.display = '';
                weatherDetails.style.display = '';
                currentWeather.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                mainContainer.style.height = '600px';



            }
        })

})



