
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
    if (divText.innerText.length <= 13) {
        divText.innerText += "1";
    }
        if (divText.innerText === "01") {
        divText.innerText -= "0";
    }
});
boutonDeux.addEventListener("click", function () {
    if (divText.innerText.length <= 13) {
        divText.innerText += "2";
    }
        if (divText.innerText === "02") {
        divText.innerText -= "0";
    }
});
boutonTrois.addEventListener("click", function () {

    if (divText.innerText.length <= 13) {
        divText.innerText += "3";
    }
    if (divText.innerText === "03") {
        divText.innerText -= "0";
    }
});
boutonQuatre.addEventListener("click", function () {
    if (divText.innerText.length <= 13) {
        divText.innerText += "4";
    }
        if (divText.innerText === "04") {
        divText.innerText -= "0";
    }
});
boutonCinq.addEventListener("click", function () {
    if (divText.innerText.length <= 13) {
        divText.innerText += "5";
    }
        if (divText.innerText === "05") {
        divText.innerText -= "0";
    }
});
boutonSix.addEventListener("click", function () {

    if (divText.innerText.length <= 13) {
        divText.innerText += "6";
    }
        if (divText.innerText === "06") {
        divText.innerText -= "0";
    }
});
boutonSept.addEventListener("click", function () {
    if (divText.innerText.length <= 13) {
        divText.innerText += "7";
    }
        if (divText.innerText === "07") {
        divText.innerText -= "0";
    }
});
boutonHuit.addEventListener("click", function () {
    if (divText.innerText.length <= 13) {
        divText.innerText += "8";
    }
        if (divText.innerText === "08") {
        divText.innerText -= "0";
    }
});
boutonNeuf.addEventListener("click", function () {
    if (divText.innerText.length <= 13) {
        divText.innerText += "9";
    }
    if (divText.innerText === "09") {
        divText.innerText -= "0";
    }

});
boutonZero.addEventListener("click", function () {
    if (divText.innerText.length <= 13) {
        divText.innerText += "0";
    }
});
boutonC.addEventListener("click", function () {
    divText.innerText = "";
});
boutonPoint.addEventListener("click", function () {
    if (divText.innerText.length <= 13 && divText.innerText.length > 0 && divText.innerText.includes(".") === false) {
        divText.innerText += ".";
    }
});
