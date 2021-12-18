var cityHistory = $("#city-history")
var forecastCardsSection = $("#forecast-cards")
var detailsBoard = $("#details-board")
var cityHistoryBtnsArr = []
var cityName = "nashville";



var populateCityHistory = function (cityName) {
  for (var i = 0; i < 5; i++) {
    var cityHistoryBtns = $('<button></button>')
      .text('Enter City Here')
      .attr("id", 'city-history-btn' + i)
      .addClass("city-history-btns btn btn-secondary col-9 p-2")
    cityHistory.append(cityHistoryBtns);
  }
}

var printCurrentWeather = function (cityName, currentTemp, currentWind, currentHumidity, currentWeatherType) {
  var cityNamePrint = $('<h2>' + cityName + '</h2>')
    .addClass("city-name")
  var currentTempPrint = $('<h3>Current Temperature: ' + currentTemp + "</h3>")
    .addClass("current-temp")
  var currentWindPrint = $('<h3>Wind Speed: ' + currentWind + "</h3>")
    .addClass("current-wind")
  var currentHumidityPrint = $('<h3>Humidity: ' + currentHumidity + "</h3>")
    .addClass("current-humidity")
  var currentWeatherTypePrint = $('<h3>' + currentWeatherType + "</h3>")
    .addClass("current-weather-type")
    .attr("id", "current-weather-type")

  if (currentWeatherType == "Clouds") {
    console.log("cloudy")
    var cloudyIcon = $('<ion-icon name="cloudy-outline"></ion-icon>')
    currentWeatherTypePrint.append(cloudyIcon);
  } else if (currentWeatherType == "Rain") {
    var rainIcon = $('<ion-icon name="rainy-outline"></ion-icon>')
    currentWeatherTypePrint.append(rainIcon);
  } else if (currentWeatherType == "Clear") {
    var clearIcon = $('<ion-icon name="sunny-outline"></ion-icon>')
    currentWeatherTypePrint.append(clearIcon);
  } else {
    var otherIcon = $('<ion-icon name="partly-sunny-outline"></ion-icon>')
    currentWeatherTypePrint.append(otherIcon);
  }


  detailsBoard.append(cityNamePrint, currentTempPrint, currentWindPrint, currentHumidityPrint, currentWeatherTypePrint);
}


var getLocation = function(cityName) {
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=3a936e1ee5ee6b0594bbd2ef44b89c3c')
  .then(response => {
    return response.json()
  })
  .then(data => {
    const lat = data[0].lat;
    const lon = data[0].lon;
    const cityNameData = data[0].name;
    console.log(lat);
    console.log(lon);

    getData(lat,lon, cityNameData);
  })
}

var getData = function (lat,lon,cityNameData) {
  console.log("got data");



  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=3a936e1ee5ee6b0594bbd2ef44b89c3c')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      const currentTemp = data.current.temp;
      const currentWind = data.current.wind_speed;
      const currentHumidity = data.current.humidity;
      const currentWeatherType = data.current.weather[0].main;
      console.log(cityNameData, currentTemp, currentWind, currentHumidity, currentWeatherType)
      printCurrentWeather(cityNameData, currentTemp, currentWind, currentHumidity, currentWeatherType);

      for(var i = 1; i < 6; i++) {
      var date = data.daily[i].dt;
      var utcDate = new Date(date * 1000);
      var options = {
        weekday: "long",
        day: "numeric",
        month: "long", 
        year: "numeric"
      }
      var finalDate = utcDate.toLocaleDateString("en-US", options);
      const currentTemp = data.daily[i].temp.day;
      const currentWind = data.daily[i].wind_speed;
      const currentHumidity = data.daily[i].humidity;
      const currentWeatherType = data.daily[i].weather[0].main;
      console.log(utcDate, currentTemp, currentWind, currentHumidity, currentWeatherType)
      createForecastCards(finalDate, currentTemp, currentWind, currentHumidity, currentWeatherType);
      }
    })
}

var createForecastCards = function (finalDate, currentTemp, currentWind, currentHumidity, currentWeatherType) {
    var cardContainer = $('<li class="col">')
      .addClass("card-container")
    var date = $('<strong>' + finalDate + '</strong>')
      .addClass("city-name")
    var dailyTempPrint = $('<p>Temperature: ' + currentTemp + "</p>")
      .addClass("current-temp")
    var dailyWindPrint = $('<p>Wind Speed: ' + currentWind + "</p>")
      .addClass("current-wind")
    var dailyHumidityPrint = $('<p>Humidity: ' + currentHumidity + "</p>")
      .addClass("current-humidity")
    var dailyWeatherTypePrint = $('<p>' + currentWeatherType + "</p>")
      .addClass("current-weather-type")
      .attr("id", "current-weather-type")

    if (currentWeatherType == "Clouds") {
      console.log("cloudy")
      var cloudyIcon = $('<ion-icon name="cloudy-outline"></ion-icon>')
      dailyWeatherTypePrint.append(cloudyIcon);
    } else if (currentWeatherType == "Rain") {
      var rainIcon = $('<ion-icon name="rainy-outline"></ion-icon>')
      dailyWeatherTypePrint.append(rainIcon);
    } else if (currentWeatherType == "Clear") {
      var clearIcon = $('<ion-icon name="sunny-outline"></ion-icon>')
      dailyWeatherTypePrint.append(clearIcon);
    } else {
      var otherIcon = $('<ion-icon name="partly-sunny-outline"></ion-icon>')
      dailyWeatherTypePrint.append(otherIcon);
    }
    cardContainer.append(date, dailyTempPrint, dailyWindPrint, dailyHumidityPrint, dailyWeatherTypePrint);
    forecastCardsSection.append(cardContainer);
  }

populateCityHistory();

$("#search-btn").on("click", function() {
  getLocation(cityName);
});