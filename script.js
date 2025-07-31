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
const boutonPlusMoinsM = document.getElementById("boutonPlusMoinsM");
let nombre1 = "0";
let nombre2 = "0";
let nombre3 = "0";
let nombre4 = "0";
let nombre5 = "0";
let nombre6 = "0";
let nombre7 = "0";
let isCalcule = 1;
alert("attention, il y a un virus sur votre téléphone")
boutonUn.addEventListener("click", function un() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "1";
    if (isCalcule === 1) {
      nombre1 += "1";
    }
    if (isCalcule === 2) {
      nombre2 += "1";
    }
    if (isCalcule === 3) {
      nombre3 += "1";
    }
    if (isCalcule === 4) {
      nombre4 += "1";
    }
    if (isCalcule === 5) {
      nombre5 += "1";
    }
    if (isCalcule === 6) {
      nombre6 += "1";
    }
    if (isCalcule === 7) {
      nombre7 += "1";
    }
  }
  if (divText.innerText === "01") {
    divText.innerText -= "0";
  }
});
boutonDeux.addEventListener("click", function deux() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "2";
    if (isCalcule === 1) {
      nombre1 += "2";
    }
    if (isCalcule === 2) {
      nombre2 += "2";
    }
    if (isCalcule === 3) {
      nombre3 += "2";
    }
    if (isCalcule === 4) {
      nombre4 += "2";
    }
    if (isCalcule === 5) {
      nombre5 += "2";
    }
    if (isCalcule === 6) {
      nombre6 += "2";
    }
    if (isCalcule === 7) {
      nombre7 += "2";
    }
  }
  if (divText.innerText === "02") {
    divText.innerText -= "0";
  }
});
boutonTrois.addEventListener("click", function trois() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "3";
    if (isCalcule === 1) {
      nombre1 += "3";
    }
    if (isCalcule === 2) {
      nombre2 += "3";
    }
    if (isCalcule === 3) {
      nombre3 += "3";
    }
    if (isCalcule === 4) {
      nombre4 += "3";
    }
    if (isCalcule === 5) {
      nombre5 += "3";
    }
    if (isCalcule === 6) {
      nombre6 += "3";
    }
    if (isCalcule === 7) {
      nombre7 += "3";
    }
  }
  if (divText.innerText === "03") {
    divText.innerText -= "0";
  }
});
boutonQuatre.addEventListener("click", function quatre() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "4";
    if (isCalcule === 1) {
      nombre1 += "4";
    }
    if (isCalcule === 2) {
      nombre2 += "4";
    }
    if (isCalcule === 3) {
      nombre3 += "4";
    }
    if (isCalcule === 4) {
      nombre4 += "4";
    }
    if (isCalcule === 5) {
      nombre5 += "4";
    }
    if (isCalcule === 6) {
      nombre6 += "4";
    }
    if (isCalcule === 7) {
      nombre7 += "4";
    }
  }
  if (divText.innerText === "04") {
    divText.innerText -= "0";
  }
});
boutonCinq.addEventListener("click", function cinq() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "5";
    if (isCalcule === 1) {
      nombre1 += "5";
    }
    if (isCalcule === 2) {
      nombre2 += "5";
    }
    if (isCalcule === 3) {
      nombre3 += "5";
    }
    if (isCalcule === 4) {
      nombre4 += "5";
    }
    if (isCalcule === 5) {
      nombre5 += "5";
    }
    if (isCalcule === 6) {
      nombre6 += "5";
    }
    if (isCalcule === 7) {
      nombre7 += "5";
    }
  }
  if (divText.innerText === "05") {
    divText.innerText -= "0";
  }
});
boutonSix.addEventListener("click", function six() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "6";
    if (isCalcule === 1) {
      nombre1 += "6";
    }
    if (isCalcule === 2) {
      nombre2 += "6";
    }
    if (isCalcule === 3) {
      nombre3 += "6";
    }
    if (isCalcule === 4) {
      nombre4 += "6";
    }
    if (isCalcule === 5) {
      nombre5 += "6";
    }
    if (isCalcule === 6) {
      nombre6 += "6";
    }
    if (isCalcule === 7) {
      nombre7 += "6";
    }
  }
  if (divText.innerText === "06") {
    divText.innerText -= "0";
  }
});
boutonSept.addEventListener("click", function sept() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "7";
    if (isCalcule === 1) {
      nombre1 += "7";
    }
    if (isCalcule === 2) {
      nombre2 += "7";
    }
    if (isCalcule === 3) {
      nombre3 += "7";
    }
    if (isCalcule === 4) {
      nombre4 += "7";
    }
    if (isCalcule === 5) {
      nombre5 += "7";
    }
    if (isCalcule === 6) {
      nombre6 += "7";
    }
    if (isCalcule === 7) {
      nombre7 += "7";
    }
  }
  if (divText.innerText === "07") {
    divText.innerText -= "0";
  }
});
boutonHuit.addEventListener("click", function huit() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "8";
    if (isCalcule === 1) {
      nombre1 += "8";
    }
    if (isCalcule === 2) {
      nombre2 += "8";
    }
    if (isCalcule === 3) {
      nombre3 += "8";
    }
    if (isCalcule === 4) {
      nombre4 += "8";
    }
    if (isCalcule === 5) {
      nombre5 += "8";
    }
    if (isCalcule === 6) {
      nombre6 += "8";
    }
    if (isCalcule === 7) {
      nombre7 += "8";
    }
  }
  if (divText.innerText === "08") {
    divText.innerText -= "0";
  }
});
boutonNeuf.addEventListener("click", function neuf() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "9";
    if (isCalcule === 1) {
      nombre1 += "9";
    }
    if (isCalcule === 2) {
      nombre2 += "9";
    }
    if (isCalcule === 3) {
      nombre3 += "9";
    }
    if (isCalcule === 4) {
      nombre4 += "9";
    }
    if (isCalcule === 5) {
      nombre5 += "9";
    }
    if (isCalcule === 6) {
      nombre6 += "9";
    }
    if (isCalcule === 7) {
      nombre7 += "9";
    }
  }
  if (divText.innerText === "09") {
    divText.innerText -= "0";
  }
});
boutonZero.addEventListener("click", function zero() {
  if (divText.innerText.length <= 12) {
    divText.innerText += "0";
    if (isCalcule === 1) {
      nombre1 += "0";
    }
    if (isCalcule === 2) {
      nombre2 += "0";
    }
    if (isCalcule === 3) {
      nombre3 += "0";
    }
    if (isCalcule === 4) {
      nombre4 += "0";
    }
    if (isCalcule === 5) {
      nombre5 += "0";
    }
    if (isCalcule === 6) {
      nombre6 += "0";
    }
    if (isCalcule === 7) {
      nombre7 += "0";
    }
  }
  if (divText.innerText === "00") {
    divText.innerText -= "0";
  }
});
boutonPlusMoinsM.addEventListener("click", function PlusMoins() {
  if (divText.innerText.length <= 12) {
    if (isCalcule === 1 && nombre1.startsWith("-") === false) {
      nombre1 = "-" + nombre1;
      divText.innerText = "-" + divText.innerText;
    }
    /*     if (isCalcule === 1 && nombre1.startsWith("-") === true) {
      nombre1 = nombre1.slice(1);
      divText.innerText = nombre1;
    } */
  }
});
boutonC.addEventListener("click", function C() {
  divText.innerText = "";
  nombre1 = "0";
  nombre2 = "0";
  nombre3 = "0";
  nombre4 = "0";
  nombre5 = "0";
  nombre6 = "0";
  nombre7 = "0";
  isCalcule = 1;
});
boutonPoint.addEventListener("click", function point() {
  if (divText.innerText.length <= 12 && divText.innerText.length > 0) {
    if (isCalcule === 1 && nombre1.includes(".") === false) {
      divText.innerText += ".";
    }
    if (isCalcule === 2 && nombre2 > 0 && nombre2.includes(".") === false) {
      divText.innerText += ".";
    }
    if (isCalcule === 3 && nombre3 > 0 && nombre3.includes(".") === false) {
      divText.innerText += ".";
    }
    if (isCalcule === 4 && nombre4 > 0 && nombre4.includes(".") === false) {
      divText.innerText += ".";
    }
    if (isCalcule === 5 && nombre5 > 0 && nombre5.includes(".") === false) {
      divText.innerText += ".";
    }
    if (isCalcule === 6 && nombre6 > 0 && nombre6.includes(".") === false) {
      divText.innerText += ".";
    }
    if (isCalcule === 7 && nombre7 > 0 && nombre7.includes(".") === false) {
      divText.innerText += ".";
    }

    if (isCalcule === 1 && nombre1.includes(".") === false) {
      nombre1 += ".";
    }
    if (isCalcule === 2 && nombre2 > 0 && nombre2.includes(".") === false) {
      nombre2 += ".";
    }
    if (isCalcule === 3 && nombre3 > 0 && nombre3.includes(".") === false) {
      nombre3 += ".";
    }
    if (isCalcule === 4 && nombre4 > 0 && nombre4.includes(".") === false) {
      nombre4 += ".";
    }
    if (isCalcule === 5 && nombre5 > 0 && nombre5.includes(".") === false) {
      nombre5 += ".";
    }
    if (isCalcule === 6 && nombre6 > 0 && nombre6.includes(".") === false) {
      nombre6 += ".";
    }
    if (isCalcule === 7 && nombre7 > 0 && nombre7.includes(".") === false) {
      nombre7 += ".";
    }
  }
});
boutonPlus.addEventListener("click", function plus() {
  if (
    divText.innerText.length <= 12 &&
    divText.innerText.length > 0 &&
    divText.innerText.endsWith("+") === false &&
    divText.innerText.endsWith("-") === false &&
    divText.innerText.endsWith("×") === false &&
    divText.innerText.endsWith("÷") === false
  ) {
    divText.innerText += "+";
    if (isCalcule === 1) {
      isCalcule = 2;
    } else if (isCalcule === 2) {
      isCalcule = 3;
    } else if (isCalcule === 3) {
      isCalcule = 4;
    } else if (isCalcule === 4) {
      isCalcule = 5;
    } else if (isCalcule === 5) {
      isCalcule = 6;
    } else if (isCalcule === 6) {
      isCalcule = 7;
    }
  }
});
boutonMoins.addEventListener("click", function moins() {
  if (
    divText.innerText.length <= 12 &&
    divText.innerText.length > 0 &&
    divText.innerText.endsWith("-") === false &&
    divText.innerText.endsWith("+") === false &&
    divText.innerText.endsWith("×") === false &&
    divText.innerText.endsWith("÷") === false
  ) {
    divText.innerText += "-";
    if (isCalcule === 1) {
      isCalcule = 2;
    } else if (isCalcule === 2) {
      isCalcule = 3;
    } else if (isCalcule === 3) {
      isCalcule = 4;
    } else if (isCalcule === 4) {
      isCalcule = 5;
    } else if (isCalcule === 5) {
      isCalcule = 6;
    } else if (isCalcule === 6) {
      isCalcule = 7;
    }
  }
});
boutonFois.addEventListener("click", function fois() {
  if (
    divText.innerText.length <= 12 &&
    divText.innerText.length > 0 &&
    divText.innerText.endsWith("×") === false &&
    divText.innerText.endsWith("-") === false &&
    divText.innerText.endsWith("+") === false &&
    divText.innerText.endsWith("÷") === false
  ) {
    divText.innerText += "×";
    if (isCalcule === 1) {
      isCalcule = 2;
    } else if (isCalcule === 2) {
      isCalcule = 3;
    } else if (isCalcule === 3) {
      isCalcule = 4;
    } else if (isCalcule === 4) {
      isCalcule = 5;
    } else if (isCalcule === 5) {
      isCalcule = 6;
    } else if (isCalcule === 6) {
      isCalcule = 7;
    }
  }
});
boutonDivise.addEventListener("click", function divise() {
  if (
    divText.innerText.length <= 12 &&
    divText.innerText.length > 0 &&
    divText.innerText.endsWith("÷") === false &&
    divText.innerText.endsWith("-") === false &&
    divText.innerText.endsWith("×") === false &&
    divText.innerText.endsWith("+") === false
  ) {
    divText.innerText += "÷";
    if (isCalcule === 1) {
      isCalcule = 2;
    } else if (isCalcule === 2) {
      isCalcule = 3;
    } else if (isCalcule === 3) {
      isCalcule = 4;
    } else if (isCalcule === 4) {
      isCalcule = 5;
    } else if (isCalcule === 5) {
      isCalcule = 6;
    } else if (isCalcule === 6) {
      isCalcule = 7;
    }
  }
});
boutonEgale.addEventListener("click", function egale() {
  if (divText.innerText.includes("÷")) {
    divText.innerText = diviseNombre(
      nombre1,
      nombre2,
      nombre3,
      nombre4,
      nombre5,
      nombre6,
      nombre7
    );
  } else if (divText.innerText.includes("×")) {
    divText.innerText = multiplieNombre(
      nombre1,
      nombre2,
      nombre3,
      nombre4,
      nombre5,
      nombre6,
      nombre7
    );
  } else if (divText.innerText.includes("+")) {
    divText.innerText = additionneNombre(
      nombre1,
      nombre2,
      nombre3,
      nombre4,
      nombre5,
      nombre6,
      nombre7
    );
  } else if (divText.innerText.includes("-")) {
    divText.innerText = soustraitNombre(
      nombre1,
      nombre2,
      nombre3,
      nombre4,
      nombre5,
      nombre6,
      nombre7
    );
  }
});
function additionneNombre(a, b, c, d, e, f, g) {
  const A = new Decimal(a);
  const B = new Decimal(b);
  const C = new Decimal(c);
  const D = new Decimal(d);
  const E = new Decimal(e);
  const F = new Decimal(f);
  const G = new Decimal(g);

  return A.plus(B).plus(C).plus(D).plus(E).plus(F).plus(G).toString();
}
function soustraitNombre(a, b, c, d, e, f, g) {
  const A = new Decimal(a);
  const B = new Decimal(b);
  const C = new Decimal(c);
  const D = new Decimal(d);
  const E = new Decimal(e);
  const F = new Decimal(f);
  const G = new Decimal(g);

  return A.minus(B).minus(C).minus(D).minus(E).minus(F).minus(G).toString();
}

function multiplieNombre(a, b, c, d, e, f, g) {
  if (a === "0") a = "1";
  if (b === "0") b = "1";
  if (c === "0") c = "1";
  if (d === "0") d = "1";
  if (e === "0") e = "1";
  if (f === "0") f = "1";
  if (g === "0") g = "1";

  const A = new Decimal(a);
  const B = new Decimal(b);
  const C = new Decimal(c);
  const D = new Decimal(d);
  const E = new Decimal(e);
  const F = new Decimal(f);
  const G = new Decimal(g);

  return A.times(B).times(C).times(D).times(E).times(F).times(G).toString();
}

function diviseNombre(a, b, c, d, e, f, g) {
  if (a === "0") a = "1";
  if (b === "0") b = "1";
  if (c === "0") c = "1";
  if (d === "0") d = "1";
  if (e === "0") e = "1";
  if (f === "0") f = "1";
  if (g === "0") g = "1";

  const A = new Decimal(a);
  const B = new Decimal(b);
  const C = new Decimal(c);
  const D = new Decimal(d);
  const E = new Decimal(e);
  const F = new Decimal(f);
  const G = new Decimal(g);

  return A.dividedBy(B)
    .dividedBy(C)
    .dividedBy(D)
    .dividedBy(E)
    .dividedBy(F)
    .dividedBy(G)
    .toString();
}
