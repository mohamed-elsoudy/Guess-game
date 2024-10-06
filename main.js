// set the game name
let theNameGame = "Guess The Word";
document.querySelector(".header").innerHTML = theNameGame;
document.title = theNameGame;
let words = ["Create","Update","Delete","Master","Branch","Mainly","School",];
let theWord = words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();
console.log(theWord);

// cereating inputs and tries

let theNumberofTries = 5;
let theNumberofLetters = 5;
let theNumberofHints = 2;
let currentTry = 1;
let sucess = true;




// hints 
 

document.querySelector(".hint span").innerHTML = theNumberofHints;
let hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint);

 function generateInputs () {
  for (let i = 1; i <= theNumberofTries; i++) {
    let trying = document.createElement("div");
    trying.className =`try-${i}`;
    trying.innerHTML = `<span>Try${i}</span>`;

    if (i !== 1) trying.classList.add("disabled-inputs");

    for (let j = 1; j <= theNumberofLetters; j++) {
      let theInputs = document.createElement("input");
      theInputs.type = "text";
      theInputs.maxLength = 1;
      theInputs.id = `try-${i}-letter${j}`;
      trying.appendChild(theInputs);
    }
    let inputsContainer = document.querySelector(".inputs");
    inputsContainer.appendChild(trying);
  }
  document.querySelector(".inputs").children[0].children[1].focus();

  let disabled = document.querySelectorAll(".disabled-inputs input");
  disabled.forEach((input) => (input.disabled = true));
  let allInputs = document.querySelectorAll("input");
  allInputs.forEach((input, index) => {
    input.addEventListener("input", function(){
      input.value = this.value.toUpperCase();
      let nextElement = allInputs[index + 1];
      if(nextElement) nextElement.focus();
    })
    input.addEventListener("keydown", function(e){
      if(e.key === "ArrowRight") {
        let nextElement = allInputs[index + 1];
        if(nextElement) nextElement.focus();
      }
      if(e.key === "ArrowLeft") {
        let lastElement = allInputs[index - 1];
        if(lastElement) lastElement.focus();
      }
    })
  });
}
// game logic
let check = document.querySelector(".check");
check.addEventListener("click", logic);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && document.querySelector(`.try-${currentTry}`)   ) {
  logic()
  }
})
function logic() {
 for(let i = 1; i <= theNumberofLetters; i++) {
  let theLetter = document.querySelector(`#try-${currentTry}-letter${i}`);
  let wordLetter = theWord[i - 1];
  if(theLetter.value.toLowerCase() === wordLetter.toLowerCase() && theLetter.value !== "") {
    theLetter.classList.add("c-orange");
  } else if (theWord.includes(theLetter.value.toLowerCase()) && theLetter.value !== "") {
    theLetter.classList.add("c-green");
    sucess = false
  } else {
    theLetter.classList.add("c-black");
    sucess= false;
  }
 }
 if (sucess === true) {
  document.querySelector(".message").innerHTML = `You Win The Word is <span>${theWord}</span>`;
  let alltries = document.querySelectorAll(".inputs > div");
  alltries.forEach((div) => div.classList.add("disabled-inputs"));
  check.disabled = true;
 } else {
  currentTry++;
  let thetryone = document.querySelectorAll(`input`).forEach((e)=> {e.disabled = true;} );
  let thetrytwo = document.querySelectorAll(`.inputs > div`).forEach((e)=> {e.classList.add("disabled-inputs")} );
  let thetry = document.querySelectorAll(`.try-${currentTry} input`);
  thetry.forEach((e) => (e.disabled = false));
  let theLetter = document.querySelector(`.try-${currentTry}`);
  if (theLetter) {
    document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
    theLetter.children[1].focus();
  } else {
    check.disabled = true;
    document.querySelector(".hint").disabled = true;
    document.querySelector(".message").innerHTML = `You Lose The Word Is <span>${theWord}</span>`;
  }
  }
}


function getHint () {
  if (theNumberofHints > 0) {
    theNumberofHints--;
    document.querySelector(".hint span").innerHTML = theNumberofHints;

  }
    if (theNumberofHints === 0) {
      hintButton.disabled = true;
    }
  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  let emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
  // let emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
  
  console.log(enabledInputs);

  if (emptyEnabledInputs.length > 0) { 
    let randomInex = Math.floor(Math.random() * emptyEnabledInputs.length);
    let randomInput = emptyEnabledInputs[randomInex];
    let inexToFill = Array.from(enabledInputs).indexOf(randomInput);
    randomInput.value = theWord[inexToFill].toUpperCase();
    console.log(emptyEnabledInputs);
//   let randomInput = emptyEnabledInputs[random]; 

//   let index = Array.from(enabledInputs).indexOf(randomInput);

      if (emptyEnabledInputs   !== -1) {
      }
    }
  }

  function handleBackspace(event) {
    if (event.key === "Backspace") {
      const inputs = document.querySelectorAll("input:not([disabled])");
      const currentIndex = Array.from(inputs).indexOf(document.activeElement);
      // console.log(currentIndex);
      if (currentIndex > 0) {
        const currentInput = inputs[currentIndex];
        const prevInput = inputs[currentIndex - 1];
        currentInput.value = "";
        prevInput.value = "";
        prevInput.focus();
      }
    }
  }
  
  document.addEventListener("keydown", handleBackspace);
window.onload = function () {
generateInputs();

};