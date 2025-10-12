const inputPseudo = document.getElementById("inputPseudo");
const inputEmail = document.getElementById("inputEmail");
const inputMotDePasse = document.getElementById("inputMotDePasse");
const buttonSoumettre = document.getElementById("buttonSoumettre");
const pPseudo = document.getElementById("pPseudo");
const pEmail = document.getElementById("pEmail");
const pMotDePasse = document.getElementById("pMotDePasse");
buttonSoumettre.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    inputPseudo.value !== "" &&
    inputEmail.value !== "" &&
    inputEmail.checkValidity() &&
    inputMotDePasse.value !== ""
  ) {
    const compte = {
      pseudo: inputPseudo.value,
      email: inputEmail.value,
      motDePasse: inputMotDePasse.value,
    };
    const compteExistant = localStorage.getItem(inputEmail.value);
    if (compteExistant && pseudoExiste(inputPseudo.value)) {
      inputEmail.style.backgroundColor = "#ff5656ff";
      inputPseudo.style.backgroundColor = "#ff5656ff";
      pEmail.textContent = "Cet email est déjà utilisé !";
      pPseudo.textContent = "Ce pseudo est déjà utilisé !";
    } else if (pseudoExiste(inputPseudo.value)) {
      inputPseudo.style.backgroundColor = "#ff5656ff";
      pPseudo.textContent = "Ce pseudo est déjà utilisé !";
      inputEmail.style.backgroundColor = "#ffffffff";
      pEmail.textContent = "";
    } else if (compteExistant) {
      inputEmail.style.backgroundColor = "#ff5656ff";
      pEmail.textContent = "Cet email est déjà utilisé !";
      inputPseudo.style.backgroundColor = "#ffffffff";
      pPseudo.textContent = "";
    } else {
      localStorage.setItem(inputEmail.value, JSON.stringify(compte));
      localStorage.setItem("utilisateurConnecte", inputEmail.value);
      alert("Compte créé avec succès !");
      window.location.href = "index.html";
      inputPseudo.value = "";
      inputEmail.value = "";
      inputMotDePasse.value = "";

      inputPseudo.style.backgroundColor = "";
      inputEmail.style.backgroundColor = "";
      inputMotDePasse.style.backgroundColor = "";

      pPseudo.textContent = "";
      pEmail.textContent = "";
      pMotDePasse.textContent = "";
    }
  } else if (
    inputPseudo.value === "" &&
    inputEmail.value === "" &&
    inputMotDePasse.value === ""
  ) {
    inputPseudo.style.backgroundColor = "#ff5656ff";
    inputEmail.style.backgroundColor = "#ff5656ff";
    inputMotDePasse.style.backgroundColor = "#ff5656ff";
    pPseudo.textContent = "ce champ est obligatoire !";
    pEmail.textContent = "ce champ est obligatoire !";
    pMotDePasse.textContent = "ce champ est obligatoire !";
  } else if (inputEmail.value === "" && inputMotDePasse.value === "") {
    inputPseudo.style.backgroundColor = "#ffffffff";
    inputEmail.style.backgroundColor = "#ff5656ff";
    inputMotDePasse.style.backgroundColor = "#ff5656ff";
    pPseudo.textContent = "";
    pEmail.textContent = "ce champ est obligatoire !";
    pMotDePasse.textContent = "ce champ est obligatoire !";
  } else if (inputPseudo.value === "" && inputMotDePasse.value === "") {
    inputPseudo.style.backgroundColor = "#ff5656ff";
    inputEmail.style.backgroundColor = "#ffffffff";
    inputMotDePasse.style.backgroundColor = "#ff5656ff";
    pPseudo.textContent = "ce champ est obligatoire !";
    pEmail.textContent = "";
    pMotDePasse.textContent = "ce champ est obligatoire !";
  } else if (inputPseudo.value === "" && inputEmail.value === "") {
    inputPseudo.style.backgroundColor = "#ff5656ff";
    inputEmail.style.backgroundColor = "#ff5656ff";
    inputMotDePasse.style.backgroundColor = "#ffffffff";
    pPseudo.textContent = "ce champ est obligatoire !";
    pEmail.textContent = "ce champ est obligatoire !";
    pMotDePasse.textContent = "";
  } else if (inputPseudo.value === "") {
    inputPseudo.style.backgroundColor = "#ff5656ff";
    inputEmail.style.backgroundColor = "#ffffffff";
    inputMotDePasse.style.backgroundColor = "#ffffffff";
    pPseudo.textContent = "ce champ est obligatoire !";
    pEmail.textContent = "";
    pMotDePasse.textContent = "";
  } else if (inputEmail.value === "") {
    inputEmail.style.backgroundColor = "#ff5656ff";
    inputPseudo.style.backgroundColor = "#ffffffff";
    inputMotDePasse.style.backgroundColor = "#ffffffff";
    pEmail.textContent = "ce champ est obligatoire !";
    pPseudo.textContent = "";
    pMotDePasse.textContent = "";
  } else if (inputMotDePasse.value === "") {
    inputMotDePasse.style.backgroundColor = "#ff5656ff";
    inputPseudo.style.backgroundColor = "#ffffffff";
    inputEmail.style.backgroundColor = "#ffffffff";
    pMotDePasse.textContent = "ce champ est obligatoire !";
    pPseudo.textContent = "";
    pEmail.textContent = "";
  }
});
function pseudoExiste(pseudoAVerifier) {
  for (let i = 0; i < localStorage.length; i++) {
    const cle = localStorage.key(i);

    if (cle !== "utilisateurConnecte") {
      const compte = JSON.parse(localStorage.getItem(cle));

      if (compte.pseudo === pseudoAVerifier) {
        return true;
      }
    }
  }
  return false;
}
