//Assign variables

const searchForm = $("#search-form");
const searchInput = $("#search-input");
const historySearch = $("#history");
const forecastToday = $("#today");
const forecastSearch = $("#forcast");

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

    $(".container-fluid.loader").hide()
    if (response.length ! == 0){
    
    const lat = response[0].lat;
    const lon = response[0].lon;

    renderToday(lat, lon)
    processForecast(lat, lon)
    } else {
      showPopup('${userInput} Please try again')
    }
  })
}
 function updateHistory(userInput) {

 //Add the history to local storage
  history.push(userInput);
  localStorage.setItem("history", JSON.stringify(history));

  loadHistory()

 } 

 function loadHistory() {

  historySearch.empty()
 if (JSON.parse(localStorage.getItem('history'))) {
  JSON.parse(localStorage.getItem('history')).forEach(function(Element) {
 const button = $("<button>").addClass("btn mt-2 button").text(element).attr("data-city"), element)
  historySearch.prepend(button)
 })
}
}

 
 

  //   const weatherQueryUrl =
  //     "http://api.openweathermap.org/data/2.5/forecast?lat=" +
  //     lat +
  //     "&lon=" +
  //     lon +
  //     "&appid=" +
  //     apiKey;
  //   }
  // });

  
  // $.ajax({ url: weatherQueryUrl })
  // .then(function (weatherResponse) {

  //   //Put the response on the HTML page
  //   const weatherList = weatherResponse.list;

  //   // Now forcast
  //   const today = weatherList[0];
  //   console.log(today);
  

// // TODO style the current HTML



//     //5 day forcast

//     for (let i = 1; i< weatherList.length; i += 8){
//       const weather = weatherList[i];
//       console.log(weather);

//       //TODO put 5 day forcats in container for the forcast
//     }

//   })
