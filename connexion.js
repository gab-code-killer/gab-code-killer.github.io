const inputEmail = document.getElementById("inputEmail");
const inputMotDePasse = document.getElementById("inputMotDePasse");
const buttonSoumettre = document.getElementById("buttonSoumettre");
const pEmail = document.getElementById("pEmail");
const pMotDePasse = document.getElementById("pMotDePasse");

buttonSoumettre.addEventListener("click", function (event) {
  event.preventDefault();
  if (this.checkValidity() && inputMotDePasse.value !== "") {
    const compteStocke = localStorage.getItem(inputEmail.value);

    if (compteStocke) {
      const compte = JSON.parse(compteStocke);
      if (compte.motDePasse === inputMotDePasse.value) {
        localStorage.setItem("utilisateurConnecte", inputEmail.value);
        alert("Connexion réussie !");
        window.location.href = "index.html";
      } else {
        alert("Mot de passe incorrect !");
      }
    } else {
      alert("Ce compte n'existe pas !");
    }
  } else if (inputEmail.value === "" && inputMotDePasse.value === "") {
    inputEmail.style.backgroundColor = "#ff5656ff";
    inputMotDePasse.style.backgroundColor = "#ff5656ff";
    pEmail.textContent = "ce champ est obligatoire !";
    pMotDePasse.textContent = "ce champ est obligatoire !";
  } else if (inputEmail.value === "") {
    inputEmail.style.backgroundColor = "#ff5656ff";
    inputMotDePasse.style.backgroundColor = "#ffffffff";
    pEmail.textContent = "ce champ est obligatoire !";
  } else if (inputMotDePasse.value === "") {
    inputMotDePasse.style.backgroundColor = "#ff5656ff";
    inputEmail.style.backgroundColor = "#ffffffff";
    pMotDePasse.textContent = "ce champ est obligatoire !";
  }
});
