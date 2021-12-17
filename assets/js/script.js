var cityHistory = $("#city-history");
var cityHistoryBtnsArr = []


var populateCityHistory = function () {
    for(var i = 0; i < 5; i++) {
        var cityHistoryBtns = $('<button></button>')
            .text('Enter City Here')
            .attr("id", 'city-history-btn' + i)
            .addClass("city-history-btns col-12")
            cityHistory.append(cityHistoryBtns);
    }
  }

populateCityHistory();