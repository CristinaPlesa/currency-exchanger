import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Currency from "./js/currency.js";

function clearFields() {
  $(".showConvertedCurrency").text(" ");
  $(".showErrors").text(" ");
}

function getCountry(userCountry) {
  if (userCountry === "Romania") {
    return "RON"
  } else if (userCountry === "Mexico") {
    return "MXN"
  } else if (userCountry === "Sweden") {
    return "SEK"
  } else if (userCountry === "Moldova") {
    return "MDL"
  } else if (userCountry === "Brazil") {
    return "BRL"
  } else {
    // throw an error!!
    // "Error: This is not a supported Country for currency conversion. Please enter an available Country"
  }
}

function getConversion(currencyAmount, value) {
  let conversion = parseInt(currencyAmount) * value;
  return conversion;
}

$(document).ready(function () {
  $("#dollarsButton").click(event => {
    event.preventDefault();
    let currencyAmount = $("#usDollars").val();
    let country = $("#countryInput").val();
    clearFields();
    let promise = Currency.getExchange();
    promise.then(function(response) {
      const body = JSON.parse(response);
      let countryId = getCountry(country);
      let countryValue = body.conversion_rates[countryId];
      let finalConversion = getConversion(currencyAmount, countryValue);
      $(".showConvertedCurrency").text(`${country} currency: ${finalConversion}`);
    }, function(error) {
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
  });
});

// add functionality in UI and html elements to also take user's choice of desired currency and then display it back converted.
// 1. add currencies to query q=
// 2. write function that multiples queury number and inputUSCurrency to get back convertedCurrencies
// 3. connect results to UI display or other function: example user will input romanian, #2 function will multiple RON property from json block then, that value needs to be input back in the Romanian currency display. SO, maybe const Romania = ${body.current-currencies.RON}, and then take romania variable and display that to user as Romania not RON
