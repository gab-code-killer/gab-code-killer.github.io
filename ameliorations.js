// Vérifier si l'utilisateur est connecté
const emailConnecte = localStorage.getItem("utilisateurConnecte");
if (!emailConnecte) {
  window.location.href = "accueil.html";
}

const compteUtilisateur = JSON.parse(localStorage.getItem(emailConnecte));
if (!compteUtilisateur) {
  window.location.href = "accueil.html";
}

// Initialiser les améliorations si elles n'existent pas
if (!compteUtilisateur.ameliorations) {
  compteUtilisateur.ameliorations = {
    niveauClic: 1,  // Niveau actuel (commence à 1)
    pointsParClic: 1 // Points gagnés par clic
  };
  localStorage.setItem(emailConnecte, JSON.stringify(compteUtilisateur));
}

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
  // Recharger les données depuis localStorage pour être sûr d'avoir les plus récentes
  const compteFrais = JSON.parse(localStorage.getItem(emailConnecte));
  const niveau = compteFrais.ameliorations.niveauClic || 1;
  const pointsParClic = compteFrais.ameliorations.pointsParClic || 1;
  const prix = calculerPrix(niveau); // Passer le niveau actuel
  const score = compteFrais.score || 0;

  document.getElementById("pseudoAffiche").textContent = `Salut ${compteFrais.pseudo} ! 👋`;
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
  // Recharger les données les plus récentes
  const compteFrais = JSON.parse(localStorage.getItem(emailConnecte));
  const niveau = compteFrais.ameliorations.niveauClic || 1;
  const prix = calculerPrix(niveau); // Passer le niveau actuel
  const score = compteFrais.score || 0;

  if (score >= prix) {
    // Déduire le prix du score
    compteFrais.score = score - prix;
    
    // Augmenter le niveau et les points par clic
    compteFrais.ameliorations.niveauClic += 1;
    compteFrais.ameliorations.pointsParClic += 1;

    // Sauvegarder les nouvelles données
    localStorage.setItem(emailConnecte, JSON.stringify(compteFrais));

    alert(`🎉 Amélioration achetée ! Maintenant tu gagnes ${compteFrais.ameliorations.pointsParClic} points par clic !`);
    
    // Mettre à jour l'affichage APRÈS l'alert pour éviter les conflits
    setTimeout(() => {
      mettreAJourAffichage();
    }, 100);
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