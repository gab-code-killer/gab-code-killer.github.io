

const boutonUn = document.getElementById("boutonUn");
const divText = document.getElementById("divText");
const boutonDeux = document.getElementById("boutonDeux");
const boutonTrois = document.getElementById("boutonTrois");
const boutonQuatre = document.getElementById("boutonQuatre");
const boutonCinq = document.getElementById("boutonCinq");
const boutonSix = document.getElementById("boutonSix");
const boutonSept = document.getElementById("boutonSept");
const boutonHuit = document.getElementById("boutonHuit");
const boutonNeuf = document.getElementById("boutonNeuf");
const boutonZero = document.getElementById("boutonZero");
const boutonC = document.getElementById("boutonC");
const boutonPoint = document.getElementById("boutonPoint");
const boutonPlus = document.getElementById("boutonPlus");
const boutonMoins = document.getElementById("boutonMoins");
const boutonFois = document.getElementById("boutonFois");
const boutonDivise = document.getElementById("boutonDivise");
const boutonEgale = document.getElementById("boutonEgale");
let nombre1 = "";
let nombre2 = "";
let isCalcule = false;

boutonUn.addEventListener("click", function un() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "1";
    if (isCalcule === false) {
      nombre1 += "1";
    }
    if (isCalcule === true) {
      nombre2 += "1";
    }
  }
  if (divText.innerText === "01") {
    divText.innerText -= "0";
  }
});
boutonDeux.addEventListener("click", function deux() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "2";
    if (isCalcule === false) {
      nombre1 += "2";
    }
    if (isCalcule === true) {
      nombre2 += "2";
    }
  }
  if (divText.innerText === "02") {
    divText.innerText -= "0";
  }
});
boutonTrois.addEventListener("click", function trois() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "3";
    if (isCalcule === false) {
      nombre1 += "3";
    }
    if (isCalcule === true) {
      nombre2 += "3";
    }
  }
  if (divText.innerText === "03") {
    divText.innerText -= "0";
  }
});
boutonQuatre.addEventListener("click", function quatre() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "4";
    if (isCalcule === false) {
      nombre1 += "4";
    }
    if (isCalcule === true) {
      nombre2 += "4";
    }
  }
  if (divText.innerText === "04") {
    divText.innerText -= "0";
  }
});
boutonCinq.addEventListener("click", function cinq() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "5";
    if (isCalcule === false) {
      nombre1 += "5";
    }
    if (isCalcule === true) {
      nombre2 += "5";
    }
  }
  if (divText.innerText === "05") {
    divText.innerText -= "0";
  }
});
boutonSix.addEventListener("click", function six() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "6";
    if (isCalcule === false) {
      nombre1 += "6";
    }
    if (isCalcule === true) {
      nombre2 += "6";
    }
  }
  if (divText.innerText === "06") {
    divText.innerText -= "0";
  }
});
boutonSept.addEventListener("click", function sept() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "7";
    if (isCalcule === false) {
      nombre1 += "7";
    }
    if (isCalcule === true) {
      nombre2 += "7";
    }
  }
  if (divText.innerText === "07") {
    divText.innerText -= "0";
  }
});
boutonHuit.addEventListener("click", function huit() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "8";
    if (isCalcule === false) {
      nombre1 += "8";
    }
    if (isCalcule === true) {
      nombre2 += "8";
    }
  }
  if (divText.innerText === "08") {
    divText.innerText -= "0";
  }
});
boutonNeuf.addEventListener("click", function neuf() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "9";
    if (isCalcule === false) {
      nombre1 += "9";
    }
    if (isCalcule === true) {
      nombre2 += "9";
    }
  }
  if (divText.innerText === "09") {
    divText.innerText -= "0";
  }
});
boutonZero.addEventListener("click", function zero() {
  if (divText.innerText.length <= 13) {
    divText.innerText += "0";
    if (isCalcule === false) {
      nombre1 += "0";
    }
    if (isCalcule === true) {
      nombre2 += "0";
    }
  }
});
boutonC.addEventListener("click", function C() {
  divText.innerText = "";
  nombre1 = "";
  nombre2 = "";
  isCalcule = false;
});
boutonPoint.addEventListener("click", function point() {
  if (
    divText.innerText.length <= 13 &&
    divText.innerText.length > 0
  ) {
    if (isCalcule === false && nombre1.includes(".") === false) {
      divText.innerText += ".";
    }
    if (isCalcule === true && nombre2 > 0 && nombre2.includes(".") === false) {
      divText.innerText += ".";
    }

    if (isCalcule === false && nombre1.includes(".") === false) {
      nombre1 += ".";
    }
    if (isCalcule === true && nombre2 > 0 && nombre2.includes(".") === false) {
      nombre2 += ".";
    }
  }
});
boutonPlus.addEventListener("click", function plus() {
  if (
    divText.innerText.length <= 13 &&
    divText.innerText.length > 0 &&
    divText.innerText.includes("+") === false
  ) {
    divText.innerText += "+";
    isCalcule = true;
  }
});
boutonMoins.addEventListener("click", function plus() {
  if (
    divText.innerText.length <= 13 &&
    divText.innerText.length > 0 &&
    divText.innerText.includes("-") === false
  ) {
    divText.innerText += "-";
    isCalcule = true;
  }
});
boutonFois.addEventListener("click", function plus() {
  if (
    divText.innerText.length <= 13 &&
    divText.innerText.length > 0 &&
    divText.innerText.includes("×") === false
  ) {
    divText.innerText += "×";
    isCalcule = true;
  }
});
boutonDivise.addEventListener("click", function plus() {
  if (
    divText.innerText.length <= 13 &&
    divText.innerText.length > 0 &&
    divText.innerText.includes("÷") === false
  ) {
    divText.innerText += "÷";
    isCalcule = true;
  }
  });
boutonEgale.addEventListener("click", function egale() {
  if (divText.innerText.includes("+") === true) {
    divText.innerText = additionneNombre(nombre1, nombre2);
  }
  if (divText.innerText.includes("-") === true) {
    divText.innerText = soustraitNombre(nombre1, nombre2)
  }
  if (divText.innerText.includes("×") === true)
    divText.innerText = multiplieNombre(nombre1, nombre2)
  if (divText.innerText.includes("÷") === true)
    divText.innerText = diviseNombre(nombre1, nombre2)
});
function additionneNombre(nombreUn, nombreDeux) {
  const a = new Decimal(nombreUn);
  const b = new Decimal(nombreDeux);
  return a.plus(b).toString();
}
function soustraitNombre(nombreUn1, nombreDeux2) {
  const a = new Decimal(nombreUn1);
  const b = new Decimal(nombreDeux2);
  return a.minus(b).toString();
}
function multiplieNombre(nombreUn, nombreDeux) {
  const a = new Decimal(nombreUn);
  const b = new Decimal(nombreDeux);
  return a.times(b).toString();
}
function diviseNombre(nombreUn, nombreDeux) {
  const a = new Decimal(nombreUn);
  const b = new Decimal(nombreDeux);
  return a.dividedBy(b).toString();
}



