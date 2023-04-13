const cardholder = document.getElementById("userName-input");
const cardNumber = document.getElementById("cardNumber-input");
const expInputMm = document.getElementById("exp-date-input-mm");
const expInputYy = document.getElementById("exp-date-input-yy");
const cvc = document.getElementById("cvc-input");
const submit = document.getElementById("submit");
const nameOnCard = document.getElementById("card-name");
const numOnCard = document.getElementById("cardNumber");
const expMM = document.getElementById("exp-mm");
const expYY = document.getElementById("exp-yy");
const cvcDisplay = document.querySelector(".cvc");
const thankYou = document.getElementById("thank-you-header");
const continueBtn = document.getElementById("continue");
const form = document.getElementById("form");
expiryErrorMsg = document.getElementById("expiry-error");
let container = document.getElementById("container");
const thankYouSection = document.getElementById("thank-you-section");
thankYouSection.classList.add("hidden");

cvcIsValid = false;
// expYyIsValid = false;
expMmIsValid = false;
nameIsValid = false;
numIsValid = false;

valid = false;

// functions

cardholder.addEventListener("input", () => {
  nameOnCard.innerHTML = cardholder.value;
  thankYou.innerHTML = `Thank You! ${cardholder.value}`;
});

function updateCardNumber() {
  var cardNumInput = document.getElementById("cardNumber-input");
  var cardNum = document.getElementById("cardNumber");

  // Remove any existing spaces from the input string
  var inputValue = cardNumInput.value.replace(/\s+/g, "");

  // Insert spaces after every fourth character
  var spacedValue = "";
  for (var i = 0; i < inputValue.length; i++) {
    if (i > 0 && i % 4 == 0) {
      spacedValue += " ";
    }
    spacedValue += inputValue.charAt(i);
  }

  if (inputValue.length <= 16) {
    cardNum.innerText = spacedValue;
  }
}

// expiry

function updateMM() {
  let cvcMmInput = document.getElementById("exp-date-input-mm");
  let cvcMM = document.getElementById("exp-mm");
  cvcMM.innerText = cvcMmInput.value;
}

let cvcMmInput = document.getElementById("exp-date-input-mm");
cvcMmInput.addEventListener("input", updateMM);
//upadte yy

expInputYy.addEventListener("input", () => {
  expYY.innerText = expInputYy.value;
});

function updateCVC() {
  let CVCinput = document.getElementById("cvc-input");
  let CVC = document.getElementById("cvc");
  CVC.innerText = CVCinput.value;
}

let CVCinput = document.getElementById("cvc-input");
CVCinput.addEventListener("input", updateCVC);

var cardInput = document.getElementById("cardNumber-input");
cardInput.addEventListener("input", updateCardNumber);

window.onload = () => {
  let validateCardholder = () => {
    let cardholderExp = /^[A-Z a-z]+$/;
    cardholder.addEventListener("input", () => {
      let errorMsg = document.getElementById("errorMsg");
      if (cardholder.value.match(cardholderExp)) {
        errorMsg.innerHTML = "";
        nameIsValid = true;

        if (
          nameIsValid == true &&
          numIsValid == true &&
          expMmIsValid == true &&
          cvcIsValid == true
        ) {
          valid = true;
        }
      } else {
        errorMsg.innerHTML = "please enter cardholder name";
      }
    });
  };

  let validateCardnumber = () => {
    cardNumber.addEventListener("input", () => {
      let cardNumError = document.getElementById("errorMsg-number");
      if (cardNumber.value.length > 0 && cardNumber.value.length < 16) {
        cardNumError.innerHTML = "wrong format";
      } else if (cardNumber.value == "") {
        cardNumError.innerHTML = "cannot be blank";
      } else {
        cardNumError.innerHTML = "";
        numIsValid = true;

        if (
          nameIsValid == true &&
          numIsValid == true &&
          expMmIsValid == true &&
          cvcIsValid == true
        ) {
          valid = true;
        }
      }
    });
  };

  let validateExpmm = () => {
    let expMonth = /^[0-9]{2}$/;
    expInputMm.addEventListener("input", () => {
      if (expInputMm.value === "") {
        expiryErrorMsg.innerHTML = "Cannot be blank";
      } else if (expInputMm.value.match(expMonth)) {
        expiryErrorMsg.innerHTML = "";
        expMmIsValid = true;

        if (
          nameIsValid == true &&
          numIsValid == true &&
          expMmIsValid == true &&
          cvcIsValid == true
        ) {
          valid = true;
        }
      } else {
        expiryErrorMsg.innerHTML = "Wrong format";
      }
    });
  };

  // let validateExpyy = () => {
  //   let expYear = /^[0-9]{2}$/;
  //   expInputYy.addEventListener("input", () => {
  //     if (expInputYy.value === "") {
  //       expiryErrorMsg.innerHTML = "Cannot be blank";
  //     } else if (expInputYy.value.match(expYear)) {
  //       expiryErrorMsg = "";
  //       expYyIsValid = true;

  //       if (
  //         nameIsValid == true &&
  //         numIsValid == true &&
  //         expMmIsValid == true &&
  //         expYyIsValid == true &&
  //         cvcIsValid == true
  //       ) {
  //         valid = true;
  //       }
  //     } else {
  //       expiryErrorMsg.innerHTML = "Wrong format";
  //     }
  //   });
  // };

  let validateCvc = () => {
    let cvcExp = /^[0-9]{3}$/;
    cvc.addEventListener("input", () => {
      let cvcErrorMsg = document.getElementById("errorMsg-cvc");
      if (cvc.value === "") {
        cvcErrorMsg.innerHTML = "cannot be blank";
      } else if (cvc.value.match(cvcExp)) {
        cvcErrorMsg.innerHTML = "";
        cvcIsValid = true;

        if (
          nameIsValid == true &&
          numIsValid == true &&
          expMmIsValid == true &&
          cvcIsValid == true
        ) {
          valid = true;
        }
      } else {
        cvcErrorMsg.innerHTML = "wrong format";
      }
    });
  };

  validateCardholder();
  validateCardnumber();
  validateExpmm();
  // validateExpyy();
  validateCvc();

  // if (
  //   nameOnCard.innerHTML !== "JANE APPLESSED" ||
  //   numOnCard.innerHTML !== "0000 0000 0000 0000" ||
  //   expMM.innerHTML !== "00" ||
  //   expYY.innerHTML !== "00" ||
  //   (cardNumber.value.length > 0 && cardNumber.value.length == 16)
  // ) {
  //   valid = true;
  // }
};

// submit button

submit.addEventListener("click", () => {
  if (valid == false) {
    event.preventDefault();
    console.log("false info");
  } else if (valid == true) {
    event.preventDefault();
    form.classList.add("hidden");
    thankYouSection.classList.remove("hidden");
    thankYouSection.style.display = "block";
    console.log("correct info");
  }
});

continueBtn.addEventListener("click", (e) => {
  e.preventDefault();

  thankYouSection.classList.add("hidden");
  thankYouSection.style.display = "none";
  form.classList.remove("hidden");
  nameOnCard.innerHTML = "JANE APPLESSED";
  numOnCard.innerHTML = "0000 0000 0000 0000";
  expMM.innerHTML = "00";
  expYY.innerHTML = "00";
  cvcDisplay.innerHTML = "000";
  cardholder.value = "";
  cardNumber.value = "";
  expInputMm.value = "";
  expInputYy.value = "";
  cvc.value = "";
  expiryErrorMsg.innerHTML = "";
});

/*so prince i know its weird talking to your self but this sis me 
from yesterday n i notice you;ve been slacking off
lately ure not coding like before
prince i trust u with my body today you are gonna crack this
seemingly hard to solve puzzle promise me it wont pass today
i have created a demove for you to use create an
algorithm 
open a new window test it out
i believe in you and emiola does to
n you dont wanna let any off us donw so may 
believes u have potential it this is what they saw they wont
believe in you sole this problem today once an for all
i know you can do this now make this thing work n make me proud. */

// let alert = false;

// let num = prompt("select any number");

// let checkAlert = () => {
//   if (num <= 0) {
//     alert = false;
//   } else if (num >= 1) {
//     alert = true;
//   } else {
//     console.log("no number selected");
//   }
// };

// checkAlert();

// submit.addEventListener("click", (e) => {
//   if (alert == true) {
//     e.preventDefault();
//     console.log("it worked u're a genius");
//   } else {
//     e.preventDefault();
//     console.log("wrong input or it didnt work failure");
//   }
// });
