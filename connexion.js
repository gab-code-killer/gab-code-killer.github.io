const inputEmail = document.getElementById("inputEmail");
const inputMotDePasse = document.getElementById("inputMotDePasse");
const buttonSoumettre = document.getElementById("buttonSoumettre");
const pEmail = document.getElementById("pEmail");
const pMotDePasse = document.getElementById("pMotDePasse");

buttonSoumettre.addEventListener("click", function (event) {
  event.preventDefault();
  if (inputEmail.checkValidity() && inputMotDePasse.value !== "") {
    // Connexion avec Firebase
    auth.signInWithEmailAndPassword(inputEmail.value, inputMotDePasse.value)
      .then((userCredential) => {
        // Connexion réussie
        const user = userCredential.user;
        console.log("✅ Connexion réussie :", user.email);
        alert("Connexion réussie ! Bienvenue dans le jeu !");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("❌ Erreur connexion:", error.message);
        if (error.code === 'auth/user-not-found') {
          inputEmail.style.backgroundColor = "#ff5656ff";
          pEmail.textContent = "Ce compte n'existe pas !";
        } else if (error.code === 'auth/wrong-password') {
          inputMotDePasse.style.backgroundColor = "#ff5656ff";
          pMotDePasse.textContent = "Mot de passe incorrect !";
        } else if (error.code === 'auth/invalid-email') {
          inputEmail.style.backgroundColor = "#ff5656ff";
          pEmail.textContent = "Email invalide !";
        }
      });
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
