"use strict";

const form = document.querySelector(".form");
const emailField = document.getElementById("email");
const textareaField = document.querySelector(".form__textarea");
const radioBtns = document.querySelectorAll(".form__radio");
const checkbox = document.querySelector(".form__checkbox");
const formGroups = document.querySelectorAll(
  ".form__group, .form__group-radio, .form__group-checkbox"
);

const handleSubmit = (e) => {
  e.preventDefault();
  let isValid = true;

  formGroups.forEach((group) => {
    const input = group.querySelector("input");
    const textarea = group.querySelector("textarea");
    const errorMessage = group.querySelector(".form__error");

    if (input && input.type === "radio") {
      if (![...radioBtns].some((radio) => radio.checked)) {
        showError(errorMessage, "Please select a query type", input);
        isValid = false;
      }
    } else if (input && input.type === "checkbox") {
      if (!checkbox.checked) {
        showError(
          errorMessage,
          "To submit this form, please consent to being contacted",
          input
        );
        isValid = false;
      }
    } else if (input && input.name === "email") {
      if (!input.value) {
        showError(errorMessage, "This field is required", input);
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showError(errorMessage, "Please enter a valid email address", input);
        isValid = false;
      }
    } else if (input && !input.value) {
      showError(errorMessage, "This field is required", input);
      isValid = false;
    } else if (textarea && !textarea.value) {
      showError(errorMessage, "This field is required", textarea);
      isValid = false;
    }
  });

  if (isValid) {
    showSuccess();
  }
};

form.addEventListener("submit", handleSubmit);

const showError = (errorMessage, message, field) => {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  errorMessage.style.marginTop = "0.5rem";
  field.style.borderColor = "hsl(0, 66%, 56%)";
};

const clearError = (e) => {
  const group = e.target.closest(
    ".form__group, .form__group-radio, .form__group-checkbox"
  );
  if (!group) return;

  const errorMessage = group.querySelector(".form__error");
  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
    errorMessage.style.marginTop = "0";
  }

  e.target.style.borderColor = "";
};

formGroups.forEach((group) => {
  const inputs = group.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("focus", clearError);

    if (input.type === "radio" || input.type === "checkbox") {
      input.addEventListener("change", clearError);
    }
  });
});

const showSuccess = () => {
  const successMessage = document.querySelector(".success");
  successMessage.style.display = "block";
  successMessage.setAttribute("aria-hidden", "false");
  successMessage.scrollIntoView({ behavior: "smooth" });
  successMessage.focus();
};

const radioGroups = document.querySelectorAll(".form__radio-group-wrap");

radioGroups.forEach((group) => {
  const radio = group.querySelector(".form__radio");

  radio.addEventListener("change", () => {
    radioGroups.forEach((g) => (g.style.backgroundColor = ""));
    if (radio.checked) {
      group.style.backgroundColor = "var(--LightGreen)";
    }
  });
});
