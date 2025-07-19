const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed is a measure of your skill.",
  "Practice makes perfect when learning to type.",
  "JavaScript makes websites interactive.",
  "Never stop learning and growing."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const accuracyEl = document.getElementById("accuracy");
const wpmEl = document.getElementById("wpm");
const restartBtn = document.getElementById("restart");

let quote = "";
let startTime = null;
let timer = null;


function loadQuote() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = quote;
  inputEl.value = "";
  timeEl.textContent = 0;
  accuracyEl.textContent = 0;
  wpmEl.textContent = 0;
  startTime = null;
  clearInterval(timer);
}

inputEl.addEventListener("input", () => {
  const typedText = inputEl.value;

  if (!startTime) {
    startTime = new Date();
    timer = setInterval(updateTime, 1000);
  }

  const correctChars = getCorrectCharacters(typedText, quote);
  const accuracy = ((correctChars / quote.length) * 100).toFixed(0);
  const timeSpent = Math.floor((new Date() - startTime) / 1000);
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timeSpent) * 60 || 0);

  accuracyEl.textContent = accuracy;
  wpmEl.textContent = wpm;

  if (typedText === quote) {
    clearInterval(timer);
    inputEl.disabled = true;
  }
});

function getCorrectCharacters(typed, original) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) {
      correct++;
    }
  }
  return correct;
}

function updateTime() {
  const currentTime = Math.floor((new Date() - startTime) / 1000);
  timeEl.textContent = currentTime;
}

restartBtn.addEventListener("click", () => {
  inputEl.disabled = false;
  loadQuote();
});

window.onload = loadQuote;
