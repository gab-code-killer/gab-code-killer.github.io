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
      // Mettre à jour les données locales
      donneesUtilisateur.score = nouveauScore;
      donneesUtilisateur.niveauClic = nouveauNiveau;
      donneesUtilisateur.pointsParClic = nouveauxPointsParClic;
      
      alert(`🎉 Amélioration achetée ! Maintenant tu gagnes ${nouveauxPointsParClic} points par clic !`);
      mettreAJourAffichage();
    }).catch((error) => {
      console.error("Erreur lors de l'achat:", error);
      alert("❌ Erreur lors de l'achat !");
    });
  } else {
    alert("❌ Pas assez de points !");
  }
}

// Event listeners
document.getElementById("boutonAcheter").addEventListener("click", acheterAmelioration);

document.getElementById("retourJeu").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Initialiser l'affichage
mettreAJourAffichage();