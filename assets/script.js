//Array of cities
var cities = ["Berlin", "Paris", "Edinburgh", "Madrid", "Birmingham", "London"]

function weatherForcast(weatherSearch){

var city = $(this).attr("weatherForcast");   
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=11459088e0af686821247c07e336f8b3";




$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $('city').text(JSON.stringify(response))
  })
};

function searchButton(){
for (var i=0; i< cities.length; i++){

}
}
searchButton()