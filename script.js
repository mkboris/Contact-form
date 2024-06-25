"use strict";

const errorMessage = document.querySelectorAll(".form__error");

for (const error of errorMessage) {
  error.classList.remove("form__error");
  // error.textContent = "This field is required";
}

// This field is required
// Please enter a valid email address
// Please select a query type
// To submit this form, please consent to being contacted
