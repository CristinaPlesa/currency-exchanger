import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Currency from "./js/currency.js";

function clearFields() {
  $(".showUSCurrency").text(" ");
  $(".showConvertedCurrency").text(" ");
  $(".showErrors").text(" ");
  $(".showCountryTypoError").text(" ");
  $(".showUSCurrency").show();
  $(".showConvertedCurrency").show();
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
    $(".showCountryTypoError").text(`Error: This is not a supported Country for currency conversion. Please enter an available Country`);
    $(".showUSCurrency").hide();
    $(".showConvertedCurrency").hide();
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
      if (body.result !== "error") {
        let countryId = getCountry(country);
        let countryConversionValue = body.conversion_rates[countryId];
        let finalConversion = getConversion(currencyAmount, countryConversionValue);
        $(".showUSCurrency").text(`US dollar currency: ${currencyAmount}`);
        $(".showConvertedCurrency").text(`${country} currency: ${finalConversion}`);
        $(".showErrors").text(" ");
      } else {
        $(".showErrors").text(`Error: ${body["error-type"]}!`);
      }
    }, function(error) {
      $(".showUSCurrency").text(" ");
      $(".showConvertedCurrency").text(" ");
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
  });
});
