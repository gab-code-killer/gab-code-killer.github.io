
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

boutonUn.addEventListener("click", function () {
    if (divText.innerText.length <= 14) {
        divText.innerText += "1";
    }
});
boutonDeux.addEventListener("click", function () {
    if (divText.innerText.length <= 14) {
        divText.innerText += "2";
    }
});
boutonTrois.addEventListener("click", function () {

    if (divText.innerText.length <= 14) {
        divText.innerText += "3";
    }

});
boutonQuatre.addEventListener("click", function () {
    if (divText.innerText.length <= 14) {
        divText.innerText += "4";
    }
});
boutonCinq.addEventListener("click", function () {
    if (divText.innerText.length <= 14) {
        divText.innerText += "5";
    }
});
boutonSix.addEventListener("click", function () {

    if (divText.innerText.length <= 14) {
        divText.innerText += "6";
    }
});
boutonSept.addEventListener("click", function () {
    if (divText.innerText.length <= 14) {
        divText.innerText += "7";
    }
});
boutonHuit.addEventListener("click", function () {
    if (divText.innerText.length <= 14) {
        divText.innerText += "8";
    }
});
boutonNeuf.addEventListener("click", function () {
    if (divText.innerText.length <= 14) {
        divText.innerText += "9";
    }

});
boutonZero.addEventListener("click", function () {
    if (divText.innerText.length <= 14 && divText.innerText.length > 0) {
        divText.innerText += "0";
    }
});
boutonC.addEventListener("click", function () {
    divText.innerText = "";
});
boutonPoint.addEventListener("click", function () {
    if (divText.innerText.length <= 14 && divText.innerText.length > 0 && divText.innerText.includes(".") === false) {
        divText.innerText += ".";
    }
});
