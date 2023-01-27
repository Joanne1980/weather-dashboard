// TODO populate history list from local storage when page loads

const history = JSON.parse(localStorage.getItem('history')) || [];
const apiKey = '11459088e0af686821247c07e336f8b3';

// TODO style the current HTML

// Add event listener for when search button is clicked
$('#search-form').on('submit', function(event){
 event.preventDefault();

 const userInput = $('#search-input').val();
 const queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput +
  '&limit=5&appid=' + apiKey;

  //Todo prepend the value to the list container

  // Add the history to local storage

  history.push(userInput);
  localStorage.setItem('history',JSON.stringify(history));

  //Call Geocode API when search form is submitted
  $.ajax({url: queryURL})
  .then(function(response) {
    const lat = response[0].lat;
    const lon = response[0].lon;

    const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey; 
  });
  });


  $.ajax({ url: weatherQueryUrl }) 

  .then(function(weatherResponse) { 
    //Put the response on the HTML page
    const weatherList = weatherResponse.list;
    // Now forcast
    const today = weatherList[0];
    console.log(today);

    //5 day forcast

    for (let i = 1; i< weatherList.length; i += 8){
      const weather = weatherList[i];
      console.log(weather);

      //TODO put 5 day forcats in container for the forcast
    }

   
  })


