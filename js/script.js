const inputArea = document.querySelector(".input-area");
const outputArea = document.querySelector(".output-area");
const changeArea = document.querySelector(".change-area");
const inputTextarea = document.querySelector(".input-area__textarea");
const outputTextarea = document.querySelector(".output-area__textarea");
const body = document.querySelector("body");
const themeCheck = document.querySelector(".theme__checkbox");
const btnEncrypt = document.getElementById("encrypt");
const btnDecrypt = document.getElementById("decrypt");
const btnClear = document.getElementById("clear");
const btnCopy = document.getElementById("copy");
const btnCopied = document.querySelector(".copy");
const btnPasteOutput = document.getElementById("change");

//ENCRYPTION PARAMETERS
const parameters = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

//EVENTS
btnEncrypt.addEventListener("click", generateResult);
btnDecrypt.addEventListener("click", generateResult);
btnClear.addEventListener("click", clear);
btnCopy.addEventListener("click", copy);
btnPasteOutput.addEventListener("click", paste);
themeCheck.addEventListener("change", switchTheme);
inputArea.addEventListener("keydown", clearInvalid);

//ENCRYPT | DECRYPT
function generateResult(e) {
  if (!checkInvalid()) return;

  const method = e.target.closest("button").id;
  const text = inputTextarea.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let result;

  if (method === "encrypt");
  result = text.replace(
    getRegExp(Object.keys(parameters)),
    (char) => parameters[char]
  );

  if (method === "decrypt")
    result = text.replace(getRegExp(Object.values(parameters)), (char) =>
      Object.keys(parameters).find((key) => parameters[key] == char)
    );

  displayResult(result);
}

function getRegExp(arr) {
  return new RegExp(arr.map((char) => "(" + char + ")").join("|"), "g");
}

//VIEWS
function displayResult(result) {
  outputTextarea.textContent = result;
  if (btnCopied.style.display === "flex") changeCopy("copy");
  if (outputArea.classList.contains("no-result")) toggleResult();
}

function toggleResult() {
  inputArea.classList.toggle("no-result");
  outputArea.classList.toggle("no-result");
  changeArea.classList.toggle("no-result");
}

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  switchTheme();
  themeCheck.checked = true;
}

function switchTheme() {
  body.classList.toggle("dark-theme");
}

// INVALID
function checkInvalid() {
  if (isEmpty(inputTextarea.value) === "") {
    inputArea.classList.add("invalid");
    inputTextarea.value = "";
    inputTextarea.placeholder = "*Digite seu texto";
    inputTextarea.focus();
    return false;
  } else {
    clearInvalid();
    return true;
  }
}

function clearInvalid() {
  if (!inputArea.classList.contains("invalid")) return;

  inputArea.classList.remove("invalid");
  inputTextarea.placeholder = "Digite seu texto";
}

function isEmpty(text) {
  return text.replace(/\s/g, "");
}

// CLEAR
function clear() {
  clearInvalid();
  inputTextarea.value = "";
  if (!outputArea.classList.contains("no-result")) toggleResult();
  changeCopy("copy");
}

//COPY | PASTE
function copy() {
  const text = outputTextarea;
  text.select();
  text.setSelectionRange(0, 99999);
  document.execCommand("copy");

  window.getSelection().empty();
  outputTextarea.blur();
  changeCopy("copied");
}

function changeCopy(condition) {
  if (condition == "copied") copyBtnUpdate(btnCopied, btnCopy);
  if (condition == "copy") copyBtnUpdate(btnCopy, btnCopied);
}

function copyBtnUpdate(show, hide) {
  show.style.display = "flex";
  hide.style.display = "none";
}

function paste() {
  inputTextarea.value = outputTextarea.value;
}
