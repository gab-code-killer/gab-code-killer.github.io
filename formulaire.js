// Fonction pour afficher des notifications automatiques
function afficherNotification(message, type = 'info', duree = 3000) {
  // Créer la notification
  const notification = document.createElement('div');
  notification.textContent = message;
  
  // Styles de base
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.padding = '15px 20px';
  notification.style.borderRadius = '8px';
  notification.style.color = 'white';
  notification.style.fontWeight = 'bold';
  notification.style.zIndex = '10000';
  notification.style.minWidth = '300px';
  notification.style.textAlign = 'center';
  notification.style.fontSize = '14px';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  notification.style.transform = 'translateX(100%)';
  notification.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
  
  // Couleurs selon le type
  if (type === 'success') {
    notification.style.backgroundColor = '#4CAF50';
    notification.style.border = '2px solid #45a049';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#f44336';
    notification.style.border = '2px solid #d32f2f';
  } else if (type === 'warning') {
    notification.style.backgroundColor = '#ff9800';
    notification.style.border = '2px solid #f57c00';
  } else {
    notification.style.backgroundColor = '#2196F3';
    notification.style.border = '2px solid #1976d2';
  }
  
  // Ajouter au DOM
  document.body.appendChild(notification);
  
  // Animation d'entrée
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Animation de sortie et suppression
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, duree);
}

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
        afficherNotification("🎉 Compte créé avec succès ! Bienvenue dans le jeu !", 'success', 2000);
        
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2200);
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
