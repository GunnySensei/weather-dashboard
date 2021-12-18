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

var createForecastCards = function (cityName, currentTemp, currentWind, currentHumidity, currentWeatherType) {
  for (var i = 0; i < 5; i++) {
    var forecastCard = $('<li>')
      .addClass("forecastCard col")
      .attr("id", "forecastCard" + i)
      .css("border", "1px solid black")
      .text("Forecast Here")
    forecastCardsSection.append(forecastCard);
  }
}

var getData = function (cityName) {
  console.log("got data");

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&exclude=minutely,hourly&units=imperial&appid=3a936e1ee5ee6b0594bbd2ef44b89c3c')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      const cityName = data.city.name;
      const currentTemp = data.list[0].main.temp;
      const currentWind = data.list[0].wind.speed;
      const currentHumidity = data.list[0].main.humidity;
      const currentWeatherType = data.list[0].weather[0].main;
      console.log(cityName, currentTemp, currentWind, currentHumidity, currentWeatherType)
      printCurrentWeather(cityName, currentTemp, currentWind, currentHumidity, currentWeatherType);
    })
}


populateCityHistory();
createForecastCards();

$("#search-btn").on("click", function() {
  getData(cityName);
});