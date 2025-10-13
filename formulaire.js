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
    // Créer un compte avec Firebase Authentication
    auth.createUserWithEmailAndPassword(inputEmail.value, inputMotDePasse.value)
      .then((userCredential) => {
        // Compte créé avec succès !
        const user = userCredential.user;
        console.log("🎉 Compte créé :", user.email);
        
        // Sauvegarder le pseudo dans Firestore
        return db.collection('users').doc(user.uid).set({
          pseudo: inputPseudo.value,
          email: inputEmail.value,
          score: 0,
          dateCreation: new Date()
        });
      })
      .then(() => {
        console.log("✅ Données utilisateur sauvegardées !");
        alert("Compte créé avec succès ! Bienvenue dans le jeu !");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("❌ Erreur :", error.message);
        if (error.code === 'auth/email-already-in-use') {
          inputEmail.style.backgroundColor = "#ff5656ff";
          pEmail.textContent = "Cet email est déjà utilisé !";
        } else if (error.code === 'auth/weak-password') {
          inputMotDePasse.style.backgroundColor = "#ff5656ff";
          pMotDePasse.textContent = "Le mot de passe doit avoir au moins 6 caractères !";
        }
      });
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
