var cityHistory = $("#city-history");
var forecastCardsSection = $("#forecast-cards")
var cityHistoryBtnsArr = []
var cityName = "fayetteville";

function getData(e) {


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
      createForecastCards(cityName, currentTemp, currentWind, currentHumidity, currentWeatherType);
    })

    
}

var populateCityHistory = function () {
    for(var i = 0; i < 5; i++) {
        var cityHistoryBtns = $('<button></button>')
            .text('Enter City Here')
            .attr("id", 'city-history-btn' + i)
            .addClass("city-history-btns btn btn-secondary col-9 p-2")
            cityHistory.append(cityHistoryBtns);
    }
}

var printCurrentWeather = function(cityName, currentTemp, currentWind, currentHumidity, currentWeatherType) {
  
}

var createForecastCards = function (cityName, currentTemp, currentWind, currentHumidity, currentWeatherType) {
  for(var i = 0; i < 5; i++) {
    var forecastCard = $('<li>')
      .addClass("forecastCard col")
      .attr("id", "forecastCard" + i)
      .css("border", "1px solid black")
      .text("Forecast Here")
      forecastCardsSection.append(forecastCard);
  }  
}

getData();
populateCityHistory();
