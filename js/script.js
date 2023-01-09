const inputArea = document.querySelector(".input-area");
const inputTextarea = document.querySelector(".input-area__textarea");
const outputTextarea = document.querySelector(".output-area__textarea");
const outputArea = document.querySelector(".output-area");
const changeArea = document.querySelector(".change-area");
const btnEncrypt = document.getElementById("encrypt");
const btnDecrypt = document.getElementById("decrypt");
const btnClear = document.getElementById("clear");
const btnCopy = document.getElementById("copy");
const btnCopied = document.querySelector(".copy");
const btnPasteOutput = document.getElementById("change");

btnEncrypt.addEventListener("click", encrypt);
btnDecrypt.addEventListener("click", decrypt);
btnClear.addEventListener("click", clear);
btnCopy.addEventListener("click", copy);
btnPasteOutput.addEventListener("click", paste);

function encrypt() {
  let result = changeText("encrypt");
  if (result != undefined) displayResult(result);
}

function decrypt() {
  let result = changeText("decrypt");
  if (result != undefined) displayResult(result);
}

function clear() {
  clearInvalid();
  inputTextarea.value = "";
  toggleResult();
  changeCopy("copy");
}

function copy() {
  const text = outputTextarea;
  text.select();
  text.setSelectionRange(0, 99999);
  document.execCommand("copy");

  window.getSelection().empty();
  outputTextarea.blur();
  changeCopy("copied");
}

function paste() {
  inputTextarea.value = outputTextarea.value;
}

function changeText(method) {
  if (!checkInvalid()) return;
  const text = inputTextarea.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let result;
  let originalChars = ["a", "e", "i", "o", "u"];
  let changedChars = ["ai", "enter", "imes", "ober", "ufat"];

  if (method == "encrypt")
    result = text.replace(/(a)|(e)|(i)|(o)|(u)/g, (char) =>
      switchChar(char, originalChars, changedChars)
    );
  if (method == "decrypt")
    result = text.replace(/(ai)|(enter)|(imes)|(ober)|(ufat)/g, (char) =>
      switchChar(char, changedChars, originalChars)
    );
  return result;
}

function displayResult(result) {
  outputTextarea.textContent = result;
  if (btnCopied.style.display == "flex") changeCopy("copy");
  if (outputArea.classList.contains("no-result")) toggleResult();
}

function changeCopy(condition) {
  if (condition == "copied") copyBtnUpdate(btnCopied, btnCopy);
  if (condition == "copy") copyBtnUpdate(btnCopy, btnCopied);
}

function toggleResult() {
  inputArea.classList.toggle("no-result");
  outputArea.classList.toggle("no-result");
  changeArea.classList.toggle("no-result");
}

function checkInvalid() {
  const text = isEmpty(inputTextarea.value);

  if (text == "") {
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
  inputArea.classList.remove("invalid");
  inputTextarea.placeholder = "Digite seu texto";
}

function isEmpty(text) {
  return text.replace(/\s/g, "");
}

function switchChar(char, defaultText, newText) {
  switch (char) {
    case defaultText[0]:
      return newText[0];
    case defaultText[1]:
      return newText[1];
    case defaultText[2]:
      return newText[2];
    case defaultText[3]:
      return newText[3];
    case defaultText[4]:
      return newText[4];
  }
}

function copyBtnUpdate(show, hide) {
  show.style.display = "flex";
  hide.style.display = "none";
}
