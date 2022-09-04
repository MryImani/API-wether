window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('invisible');
    const city = getCityDetail(arrayCity, 'tehran');
    const cityLat = city.lat;
    const cityLong = city.long;
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + cityLat + "&longitude=" + cityLong + "&current_weather=true&timeformat=unixtime";
    getData(apiUrl, 'tehran');
 
} );

const themes = {
    Sunny: {
        bgColorButton: '#506350',
        buttonTextColor: '#fff',
        bgBody: 'linear-gradient(to left top,#ddebdc, #c2dec5)',
        bgPreloader: 'linear-gradient(to left top, #ddebdc, #c2dec5)',
        preloaderBorderRightColor:'#506350',
        bgColorStatus: '#f0f0f0',
        cityNameColor: '#536454',
        lastUpdateColor: '#bac7bd',
        bgColorInpCity: '#d1e4d0',
        inpCityTextColor: '#7a7f85',
        statusTextColor: '#869288',
        windTextColor: '#7a7f85'
    },
    Snowy: {
        bgColorButton: '#6c67a1',
        buttonTextColor: '#fff',
        bgBody: 'linear-gradient(#e5e5e5, #c3c2d2)',
        bgPreloader: 'linear-gradient(#e5e5e5, #c3c2d2)',
        preloaderBorderRightColor:'#6c67a1',
        bgColorStatus: '#f3f2f6',
        cityNameColor: '#706baf',
        lastUpdateColor: '#8a86c3',
        bgColorInpCity: '#d6d6eb',
        inpCityTextColor: '#7a7f85',
        statusTextColor: '#706baf',
        windTextColor: '#7a7f85'
    },
    Rainy: {
        bgColorButton: '#41608b',
        buttonTextColor: '#fff',
        bgBody: 'linear-gradient(to left top,#aecfff, #d0e5fe)',
        bgPreloader: 'linear-gradient(to left top,#aecfff, #d0e5fe)',
        preloaderBorderRightColor:'#41608b',
        bgColorStatus: '#f0f0f0',
        cityNameColor: '#3e5b84',
        lastUpdateColor: '#617fa9',
        bgColorInpCity: '#d9e0e9',
        inpCityTextColor: '#7a7f85',
        statusTextColor: '#3e5b84',
        windTextColor: '#7a7f85'
    },
    Cloudy: {
        bgColorButton:  '#4165a1',
        buttonTextColor: '#fff',
        bgBody: 'linear-gradient(to left top, #e2ebf0,#cfd9df)',
        bgPreloader: 'linear-gradient(to left top, #e2ebf0,#cfd9df)',
        preloaderBorderRightColor:'#4165a1',
        bgColorStatus: '#f3f2f6',
        cityNameColor: 'rgb(157 181 195)',
        lastUpdateColor: 'rgb(191 196 209)',
        bgColorInpCity: '#cfd9df',
        inpCityTextColor: '#7a7f85',
        statusTextColor: 'rgb(157 181 195)',
        windTextColor: '#7a7f85'
    },
    PartlyCloudy: {
        bgColorButton:  '#4165a1',
        buttonTextColor: '#fff',
        bgBody: 'linear-gradient(to left top, #c2e8fb, #a2c5fd)' ,
        bgPreloader: 'linear-gradient(to left top, #c2e8fb, #a2c5fd)' ,
        preloaderBorderRightColor:'#4165a1',
        bgColorStatus: '#f0f0f0',
        cityNameColor:'#436682',
        lastUpdateColor: '#a0adcd',
        bgColorInpCity: '#dce2ee',
        inpCityTextColor:'#7a7f85',
        statusTextColor: '#7890cc',
        windTextColor: '#7a7f85'
    }
};
const arrayCity = [
    {
        cityName: 'berlin',
        lat: '52.52',
        long: '13.41'
    },

    {
        cityName: 'london',
        lat: '51.5002',
        long: '-0.1262'
    },

    {
        cityName: 'moscow',
        lat: '55.7558',
        long: '37.6176',
    },

    {
        cityName: 'tehran',
        lat: '35.7061',
        long: '51.4358',
    },

    {
        cityName: 'luanda',
        lat: '-8.8159',
        long: '13.2306',
    }
];

//check LastUpdate
function getDateBasedOnTimestamp(unix_timestamp) {
    let hours = parseInt(unix_timestamp / 3600);
    let minutes = parseInt((unix_timestamp % 3600) / 60);
    let returnString = "";
    returnString += hours > 0 ? hours + " hours" : "";
    returnString += hours > 0 && minutes > 0 ? " And " + minutes + " minutes" : minutes + " minutes";
    returnString += " ago";
    return returnString;
}

//get user city
function getCityDetail(array, name) {
    let result = {};
    for (let i = 0; i < array.length; i++) {
        if (array[i].cityName === name)
            result = array[i];
    }
    return Object.keys(result).length > 0 ? result : false;
}

// hide the preLoader
function hidePreLoader() {
    document.querySelector('.preloader').classList.toggle('invisible');
}

// show the preLoader
function showPreLoader() {
    document.querySelector('.preloader').classList.toggle('invisible');
}

//get Weather Icon
function getInfo(weatherCode) {
    let weatherStatus = {};
    if (weatherCode === 0) {
        weatherStatus = {
            src: "./assets/icons/sunny.png",
            title: 'Sunny',
            theme: themes.Sunny
        }

    } else if (weatherCode === 1 || weatherCode === 2) {
        weatherStatus = {
            src: "./assets/icons/partly-cloudy.png",
            title: 'Partly Cloudy',
            theme: themes.PartlyCloudy
        }

    } else if (weatherCode === 3) {
        weatherStatus = {
            src: "./assets/icons/cloudy.png",
            title: 'Cloudy',
            theme: themes.Cloudy
        }


    } else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
        weatherStatus = {
            src: "./assets/icons/rainy.png",
            title: 'Rainy',
            theme: themes.Rainy
        }


    } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77) {
        weatherStatus = {
            src: "./assets/icons/snowy.png",
            title: 'Snowy',
            theme: themes.Snowy
        }


    } else {
        weatherStatus = {
            src: "./assets/icons/partly-cloudy.png",
            title: 'unsupported',
            theme: themes.PartlyCloudy
        }

    }
    return weatherStatus;
}

// show data
function show(data, city) {

    document.getElementById('cityNameInput').value = '';
    let currentTimestamp = new Date().getTime();
    currentTimestamp = parseInt(currentTimestamp / 1000);
    const cityName = city;
    const lastUpdate = getDateBasedOnTimestamp(currentTimestamp - data.current_weather.time);
    const weatherStatusTemperature = data.current_weather.temperature;
    const weatherStatusWind = data.current_weather.windspeed;
    const weatherCode = data.current_weather.weathercode;
    const weatherStatus = getInfo(weatherCode);
    const weatherStatusTitle = weatherStatus.title;
    const weatherStatusIconSrc = weatherStatus.src;
    const weatherStatusTheme = weatherStatus.theme;
    document.getElementById('weatherIcon').src = weatherStatusIconSrc;
    document.getElementById('weatherStatusTitle').innerHTML = weatherStatusTitle;
    document.getElementById('weatherStatusTemperature').innerHTML = weatherStatusTemperature;
    document.getElementById('weatherStatusWind').innerHTML = weatherStatusWind;
    document.getElementById('cityName').innerHTML = cityName;
    document.getElementById('lastUpdate').innerHTML = lastUpdate;
    document.body.style.backgroundImage = weatherStatus.theme.bgBody;
    document.getElementById('weatherStatusTitle').style.color = weatherStatus.theme.statusTextColor;
    document.getElementById('cityName').style.color = weatherStatus.theme.cityNameColor;
    document.getElementById('lastUpdate').style.color = weatherStatus.theme.lastUpdateColor;
    document.getElementById('cityNameInput').style.backgroundColor = weatherStatus.theme.bgColorInpCity;
    document.getElementById('findCityButton').style.backgroundColor = weatherStatus.theme.bgColorButton;
    document.getElementsByClassName('weather__detail')[0].style.backgroundColor = weatherStatus.theme.bgColorStatus;
    document.getElementsByClassName('weather__status')[0].style.backgroundColor = weatherStatus.theme.bgColorStatus;
    document.getElementsByClassName('preloader')[0].style.backgroundColor = weatherStatus.theme.bgPreloader;
    document.getElementsByClassName('preloader__body--circle')[0].style.BorderRightColor = weatherStatus.theme.preloaderBorderRightColor;
}

// get API data
async function getData(url, city) {
    showPreLoader();
    const response = await fetch(url);
    var data = await response.json();
    if (response.ok && response.status === 200) {
        setTimeout(function () {
            show(data, city);
            hidePreLoader();
        }, 200)
    }
}


//send data to server
const findCityButton = document.getElementById('findCityButton');
findCityButton.onclick = function () {
    const cityName = document.getElementById('cityNameInput').value.toLowerCase();
    if (cityName === '') {
        alert('Please Enter Your City To Fetch Weather Data');
        return false;
    }

    const city = getCityDetail(arrayCity, cityName);
    if (city === false) {
        alert('your City not found! Try again');
        return false;
    }

    const cityLat = city.lat;
    const cityLong = city.long;
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + cityLat + "&longitude=" + cityLong + "&current_weather=true&timeformat=unixtime";
    getData(apiUrl, cityName);
}