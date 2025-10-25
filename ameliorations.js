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
          
          // 🔥 NOUVEAU: Récupérer les données locales depuis sessionStorage
          const scoreLocal = sessionStorage.getItem('scoreLocal');
          const niveauLocal = sessionStorage.getItem('niveauLocal');
          const pointsParClicLocal = sessionStorage.getItem('pointsParClicLocal');
          
          if (scoreLocal) {
            donneesUtilisateur.score = parseInt(scoreLocal);
            console.log("📊 Score local récupéré:", scoreLocal);
          }
          
          if (niveauLocal) {
            donneesUtilisateur.niveauClic = parseInt(niveauLocal);
            console.log("⚡ Niveau local récupéré:", niveauLocal);
          }
          
          if (pointsParClicLocal) {
            donneesUtilisateur.pointsParClic = parseInt(pointsParClicLocal);
            console.log("🎯 Points par clic local récupéré:", pointsParClicLocal);
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

  // 🔥 NOUVEAU: Vérifications de sécurité pour éviter les erreurs null
  const pseudoAffiche = document.getElementById("pseudoAffiche");
  const scoreAffiche = document.getElementById("scoreAffiche");
  const niveauActuel = document.getElementById("niveauActuel");
  const pointsParClicElement = document.getElementById("pointsParClic");
  const prixActuel = document.getElementById("prixActuel");
  const prixAffiche = document.getElementById("prixAffiche");
  const boutonAcheter = document.getElementById("boutonAcheter");

  if (pseudoAffiche) pseudoAffiche.textContent = `Salut ${donneesUtilisateur.pseudo} ! 👋`;
  if (scoreAffiche) scoreAffiche.textContent = `Vos points: ${score}`;
  if (niveauActuel) niveauActuel.textContent = niveau;
  if (pointsParClicElement) pointsParClicElement.textContent = pointsParClic;
  if (prixActuel) prixActuel.textContent = `${prix} points`;
  
  // Mettre à jour le texte du prix complet
  if (prixAffiche) prixAffiche.innerHTML = `<strong>💰 Prix de l'amélioration: ${prix} points</strong>`;
  if (boutonAcheter) {
    if (score >= prix) {
      boutonAcheter.disabled = false;
      boutonAcheter.textContent = "Améliorer";
    } else {
      boutonAcheter.disabled = true;
      boutonAcheter.textContent = `Pas assez de points (${prix - score} manquants)`;
    }
  } else {
    console.warn("⚠️ Bouton d'achat non trouvé !");
  }
}

// Fonction pour acheter l'amélioration
function acheterAmelioration() {
  console.log("🛒 Début de l'achat d'amélioration");
  
  if (!donneesUtilisateur || !utilisateurActuel) {
    console.log("❌ Pas de données utilisateur ou pas connecté");
    return;
  }
  
  const niveau = donneesUtilisateur.niveauClic || 1;
  const prix = calculerPrix(niveau);
  const score = donneesUtilisateur.score || 0;
  
  console.log(`📊 État actuel: Score=${score}, Niveau=${niveau}, Prix=${prix}`);

  if (score >= prix) {
    console.log("✅ Score suffisant, début de l'achat");
    
    // Désactiver le bouton pendant l'achat
    const boutonAcheter = document.getElementById("boutonAcheter");
    if (!boutonAcheter) {
      console.error("❌ Bouton d'achat non trouvé !");
      return;
    }
    
    boutonAcheter.disabled = true;
    boutonAcheter.textContent = "⏳ Achat en cours...";
    
    console.log("🔒 Bouton désactivé");
    
    // 🔥 SAUVEGARDER les valeurs originales AVANT de les modifier
    const scoreOriginal = score;
    const niveauOriginal = niveau;
    const pointsParClicOriginal = donneesUtilisateur.pointsParClic || 1;
    
    // Calculer les nouvelles valeurs
    const nouveauScore = score - prix;
    const nouveauNiveau = niveau + 1;
    const nouveauxPointsParClic = (donneesUtilisateur.pointsParClic || 1) + 1;

    // Mettre à jour les données locales d'abord
    donneesUtilisateur.score = nouveauScore;
    donneesUtilisateur.niveauClic = nouveauNiveau;
    donneesUtilisateur.pointsParClic = nouveauxPointsParClic;
    
    // 🔥 NOUVEAU: Mettre à jour le sessionStorage
    sessionStorage.setItem('scoreLocal', nouveauScore.toString());
    sessionStorage.setItem('niveauLocal', nouveauNiveau.toString());
    sessionStorage.setItem('pointsParClicLocal', nouveauxPointsParClic.toString());
    
    // Timeout de sécurité pour débloquer le bouton au cas où
    const timeoutId = setTimeout(() => {
      console.log("⏰ Timeout de sécurité : réactivation du bouton");
      boutonAcheter.disabled = false;
      mettreAJourAffichage();
    }, 5000); // 5 secondes maximum
    
    // Mettre à jour dans Firebase
    console.log("🔄 Début de la sauvegarde Firebase...");
    db.collection('users').doc(utilisateurActuel.uid).update({
      score: nouveauScore,
      niveauClic: nouveauNiveau,
      pointsParClic: nouveauxPointsParClic
    }).then(() => {
      console.log("✅ Firebase: Sauvegarde réussie");
      // Annuler le timeout de sécurité
      clearTimeout(timeoutId);
      
      // Amélioration achetée avec succès !
      afficherNotification(`🎉 Amélioration achetée ! Maintenant tu gagnes ${nouveauxPointsParClic} points par clic !`, 'success', 1500);
      
      // Réactiver le bouton immédiatement
      boutonAcheter.disabled = false;
      
      // Mettre à jour l'affichage immédiatement
      mettreAJourAffichage();
      
      console.log("✅ Amélioration achetée avec succès !");
      
    }).catch((error) => {
      // Annuler le timeout de sécurité
      clearTimeout(timeoutId);
      
      console.error("❌ Firebase: Erreur lors de l'achat:", error);
      console.error("❌ Type d'erreur:", error.code);
      console.error("❌ Message d'erreur:", error.message);
      afficherNotification("❌ Erreur lors de l'achat ! Vérifiez votre connexion.", 'error', 3000);
      
      // 🔥 IMPORTANT: Remettre les données locales à leur état précédent
      donneesUtilisateur.score = scoreOriginal;
      donneesUtilisateur.niveauClic = niveauOriginal;
      donneesUtilisateur.pointsParClic = pointsParClicOriginal;
      
      // Remettre le sessionStorage à l'état précédent
      sessionStorage.setItem('scoreLocal', scoreOriginal.toString());
      sessionStorage.setItem('niveauLocal', niveauOriginal.toString());
      sessionStorage.setItem('pointsParClicLocal', pointsParClicOriginal.toString());
      
      // Réactiver le bouton immédiatement
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