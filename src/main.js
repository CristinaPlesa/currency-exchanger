import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Currency from "./js/currency.js";

function clearFields() {
  $(".showConvertedCurrency").text(" ");
  $(".showErrors").text(" ");
}

$(document).ready(function () {
  $("#dollarsButton").click(event => {
    event.preventDefault();
    let currencyAmount = $("#currencyInput").val();
    clearFields();
    let promise = Currency.getExchange(currencyAmount);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $(".showConvertedCurrency").text(`${body.conversion_rates}`);
    }, function(error) {
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
  });
});

// add functionality in UI and html elements to also take user's choice of desired currency and then display it back converted.


// function displayExample(photoArray) {
//   let photoHTML = ``;
//   if (photoArray.photos) {
//     // conditional example with looping through nested json object > then array
//     for (let i = 0; i <= 99; i += 10) {
//       photoHTML += `<img src=${photoArray.photos[i].img_src}>`;
//     }
//     $(".displayPhotos").html(photoHTML);
//   } else {
//     $(".showErrors").text(`There was an error: ${photoArray.message}`);
//   }
// }

// $(document).ready(function () {
//   let promise = Example.promiseExample();
//   promise.then(function (response) {
//     const body = JSON.parse(response);
//     $(".apod").html(`<img src=${body.url}>`);
//     $(".explanation").text(`${body.explanation}`);
//   });
//   AnotherExample.fetchExample().then(function (response) {
//     const url = response.collection.items[2].href.replaceAll(" ", "%20");
//     console.log(url);
//     $(".video").html(`<video controls> <source src=${url} type="video/mp4"></video>`);
//   });
// });