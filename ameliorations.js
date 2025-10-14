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

// Variables Firebase
let utilisateurActuel = null;
let donneesUtilisateur = null;

// Vérifier si l'utilisateur est connecté avec Firebase
auth.onAuthStateChanged((user) => {
  if (user) {
    // Utilisateur connecté
    utilisateurActuel = user;
    console.log("✅ Utilisateur connecté :", user.email);
    
    // Récupérer les données de l'utilisateur depuis Firestore
    db.collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          donneesUtilisateur = doc.data();
          
          // Initialiser les améliorations si elles n'existent pas
          if (!donneesUtilisateur.pointsParClic) {
            donneesUtilisateur.pointsParClic = 1;
            donneesUtilisateur.niveauClic = 1;
            
            // Sauvegarder dans Firebase
            db.collection('users').doc(user.uid).update({
              pointsParClic: 1,
              niveauClic: 1
            });
          }
          
          mettreAJourAffichage();
        }
      });
  } else {
    // Pas d'utilisateur connecté, rediriger vers accueil
    console.log("❌ Pas d'utilisateur connecté");
    window.location.href = "accueil.html";
  }
});

// Fonction pour calculer le prix de la prochaine amélioration
function calculerPrix(niveauActuel) {
  // S'assurer que niveau est un nombre valide
  if (!niveauActuel || isNaN(niveauActuel)) {
    niveauActuel = 1;
  }
  
  // Prix de base 50, puis +125 pour chaque niveau
  return 50 + (125 * (niveauActuel - 1));
}

// Mettre à jour l'affichage
function mettreAJourAffichage() {
  if (!donneesUtilisateur) return;
  
  const niveau = donneesUtilisateur.niveauClic || 1;
  const pointsParClic = donneesUtilisateur.pointsParClic || 1;
  const prix = calculerPrix(niveau);
  const score = donneesUtilisateur.score || 0;

  document.getElementById("pseudoAffiche").textContent = `Salut ${donneesUtilisateur.pseudo} ! 👋`;
  document.getElementById("scoreAffiche").textContent = `Vos points: ${score}`;
  document.getElementById("niveauActuel").textContent = niveau;
  document.getElementById("pointsParClic").textContent = pointsParClic;
  document.getElementById("prixActuel").textContent = `${prix} points`;
  
  // Mettre à jour le texte du prix complet
  document.getElementById("prixAffiche").innerHTML = `<strong>💰 Prix de l'amélioration: ${prix} points</strong>`;

  const boutonAcheter = document.getElementById("boutonAcheter");
  if (score >= prix) {
    boutonAcheter.disabled = false;
    boutonAcheter.textContent = "Améliorer";
  } else {
    boutonAcheter.disabled = true;
    boutonAcheter.textContent = `Pas assez de points (${prix - score} manquants)`;
  }
}

// Fonction pour acheter l'amélioration
function acheterAmelioration() {
  if (!donneesUtilisateur || !utilisateurActuel) return;
  
  const niveau = donneesUtilisateur.niveauClic || 1;
  const prix = calculerPrix(niveau);
  const score = donneesUtilisateur.score || 0;

  if (score >= prix) {
    // Désactiver le bouton pendant l'achat
    const boutonAcheter = document.getElementById("boutonAcheter");
    boutonAcheter.disabled = true;
    boutonAcheter.textContent = "⏳ Achat en cours...";
    
    // Calculer les nouvelles valeurs
    const nouveauScore = score - prix;
    const nouveauNiveau = niveau + 1;
    const nouveauxPointsParClic = (donneesUtilisateur.pointsParClic || 1) + 1;

    // Mettre à jour dans Firebase
    db.collection('users').doc(utilisateurActuel.uid).update({
      score: nouveauScore,
      niveauClic: nouveauNiveau,
      pointsParClic: nouveauxPointsParClic
    }).then(() => {
      // Amélioration achetée avec succès !
      afficherNotification(`🎉 Amélioration achetée ! Maintenant tu gagnes ${nouveauxPointsParClic} points par clic !`, 'success', 2000);
      
      // Recharger la page pour synchroniser toutes les données
      setTimeout(() => {
        window.location.reload();
      }, 2200); // Laisser le temps de voir la notification
    }).catch((error) => {
      console.error("Erreur lors de l'achat:", error);
      afficherNotification("❌ Erreur lors de l'achat !", 'error');
      
      // Réactiver le bouton en cas d'erreur
      const boutonAcheter = document.getElementById("boutonAcheter");
      boutonAcheter.disabled = false;
      mettreAJourAffichage(); // Remet le bon texte du bouton
    });
  } else {
    afficherNotification("❌ Pas assez de points !", 'warning');
  }
}

// Event listeners
document.getElementById("boutonAcheter").addEventListener("click", acheterAmelioration);

document.getElementById("retourJeu").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Initialiser l'affichage
mettreAJourAffichage();