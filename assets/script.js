//Assign variables

const searchForm = $("#search-form");
const searchInput = $("#search-input");
const historySearch = $("#history");
const forecastToday = $("#today");
const forecastSearch = $("#forcast");

const popup = $('#messageModal')
const popupTitle = $('#messageModalLabel')
const popupContent = $('.modal-body')

//Assign variable for API key
const apiKey = "11459088e0af686821247c07e336f8b3";

// Assign variable for history list
const history = JSON.parse(localStorage.getItem("history")) || [];

loadHistory();

//JQuery event on submission form
$("#search-form").on("submit", function (event) {
  event.preventDefault();

  //Button clicked and search done and stored
  const button = $(this);
  if (button.attr("data-city")) {
    showWeather(button.attr("data-city"));
  } else {
    const userInput = $("#search-input").val();
    if (userInput == "") {
      showPopup("Please enter city name");
    } else {
      updateHistory(userInput);
      showWeather(userInput);
    }
  }
});

// function to show weather results
function showWeather(userInput) {
  clear();
  //prepend the value to the list container
  $(".container-fluid.loader").show();

  //API key
  const queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    userInput +
    "&limit=5&appid=" +
    apiKey;

  //Call Geocode API when search form is submitted
  $.ajax({ url: queryURL }).then(function (response) {
    $(".container-fluid.loader").hide();
    if (response.length == 0) {
      const lat = response[0].lat;
      const lon = response[0].lon;

      renderToday(lat, lon);
      processForecast(lat, lon);
    } else {
      showPopup("${userInput} Please try again");
    }
  });
}
function updateHistory(userInput) {
  //Add the history to local storage
  history.push(userInput);
  localStorage.setItem("history", JSON.stringify(history));

  loadHistory();
}

// load history
function loadHistory() {
  // empty historySearch
  historySearch.empty();

  if (JSON.parse(localStorage.getItem("history"))) {
    JSON.parse(localStorage.getItem("history")).forEach(function (Element) {
      const button = $("<button>")
        .addClass("btn mt-2 button")
        .text(Element)
        .attr("data-city", Element);
      historySearch.prepend(button);
    });
  }
}
function showPopup(message) {
  popupTitle.text("error");
  popupContent.text(message);
  popup.modal("show");
}
function clear() {
  forecastToday.empty();
  $("#forecast .container").remove();
}
 // todays forecast
function renderToday(lat, lon) {
  const todayWeatherQueryUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  $.ajax({ url: todayWeatherQueryUrl }).then(function (weatherResponse) {
    const date = moment.unix(weatherResponse.dt).format("DD/MM/YYYY");

    const div = $("<div>").addClass("p-3");

    const iconUrl = `<img src="https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}.png" alt="${weatherResponse.weather[0].description}">`;

    const title = $("<h2>").text("${weatherResponse.name} (${date}");
    title.append(iconUrl);

    // weather response
    const text = $("<p>").html(`
  Temp: ${weatherResponse.main.temp} °C<br>
  Wind: ${weatherResponse.wind.speed} KPH<br>
  Humidity: ${weatherResponse.main.humidity}%
  `);
    div.append(title).append(text);

    forecastToday.append(div);
  });
}

// 5 day forecast
function processForcast(lat, lon) {
  const weatherQueryUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  $.ajax({ url: weatherQueryUrl }).then(function (weatherResponse) {

    const weatherArray ={}

    const weatherList = weatherResponse.list;

    const todaysDate =moment()
    for (let i = 1; i< weatherList.length; i += 8){
       const weather = weatherList[i];
       console.log(weather);

       const date = moment.unix(forecast.dt).format("DD/MM/YYYY")
       if (!todaysDate.isSame(moment.unix(forecast.dt), "day")){
        weatherArray[date] = forecast

       }

    }
    renderForecast(sortDateArray(object.entries(weatherArray)))
  });
}

function renderForecast(forecast) {

  const container =$("<div>").addClass("container")
  const row = $("<div>").addClass("row rows-col-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5")
   
  forecast.forEach(function(Element) {

    const col = $("<div>").addClass("col mb-2")
    const div = $("<div>").addClass("p-2")
    const date = element[0]
    const icon = `<img src="https://openweathermap.org/img/wn/${element[1].weather[0].icon}.png" alt="${element[1].weather[0].description}">`
    const title = $("<h3>").text('${date}')

    const todayWeather = $("<p>").html(`
    Temp: ${element[1].main.temp} °C<br>
    Wind: ${element[1].wind.speed} KPH<br>
    Humidity: ${element[1].main.humidity}%`)

    div.append(title).append(icon).append(todayWeather)

    col.append(div)

    row.append(col)

  })
    container.append(row)

    container.prepend("<h2>5 Day Forecast:</h2>")
    forecast5Days.append(container)
}

function sortDateArray(weatherArray) {
  const newArray = weatherArray.sort(function (value1, value2) {
    return value1[1].dt - value2[1].dt
  })
  return newArray
}

