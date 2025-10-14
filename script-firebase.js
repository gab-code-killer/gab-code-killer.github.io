// Variables Firebase
let utilisateurActuel = null;
let donneesUtilisateur = null;

// Variables pour les éléments DOM (seront initialisées après l'affichage du contenu)
let pseudoAffiche = null;
let boutonJeu = null;
let scoreAffiche = null;
let classement = null;
let boutonDeconnexion = null;

// Fonction pour initialiser les éléments DOM une fois le contenu affiché
function initialiserElementsDOM() {
  pseudoAffiche = document.getElementById("pseudoAffiche");
  boutonJeu = document.getElementById("boutonJeu");
  scoreAffiche = document.getElementById("scoreAffiche");
  classement = document.getElementById("classement");
  boutonDeconnexion = document.getElementById("boutonDeconnexion");
  
  // Ajouter les événements
  if (boutonJeu) {
    boutonJeu.addEventListener("click", function () {
      if (donneesUtilisateur && utilisateurActuel) {
        // Augmenter le score (récupérer les améliorations depuis Firebase)
        const nouveauScore = (donneesUtilisateur.score || 0) + (donneesUtilisateur.pointsParClic || 1);
        
        // Mettre à jour dans Firestore
        db.collection('users').doc(utilisateurActuel.uid).update({
          score: nouveauScore
        }).then(() => {
          donneesUtilisateur.score = nouveauScore;
          scoreAffiche.textContent = `Score: ${nouveauScore}`;
          afficherClassement();
        });
      }
    });
  }

  if (boutonDeconnexion) {
    boutonDeconnexion.addEventListener("click", function () {
      auth.signOut().then(() => {
        console.log("Déconnecté avec succès");
        window.location.href = "accueil.html";
      }).catch((error) => {
        console.error("Erreur déconnexion:", error);
      });
    });
  }

  // Bouton améliorations
  const boutonAmeliorations = document.getElementById("boutonAmeliorations");
  if (boutonAmeliorations) {
    boutonAmeliorations.addEventListener("click", function () {
      window.location.href = "ameliorations.html";
    });
  }
}

// Fonction pour masquer l'écran de chargement et afficher le contenu
function afficherContenu() {
  const ecranChargement = document.getElementById("chargement");
  const contenuPrincipal = document.getElementById("contenu-principal");
  
  setTimeout(() => {
    ecranChargement.classList.add("fade-out");
    setTimeout(() => {
      ecranChargement.style.display = "none";
      contenuPrincipal.classList.remove("contenu-cache");
      contenuPrincipal.classList.add("contenu-visible");
      
      // IMPORTANT : Initialiser les éléments DOM APRÈS que le contenu soit affiché
      setTimeout(() => {
        initialiserElementsDOM();
        
        // Afficher les données utilisateur
        if (donneesUtilisateur && pseudoAffiche && scoreAffiche) {
          pseudoAffiche.textContent = `Salut ${donneesUtilisateur.pseudo} !`;
          scoreAffiche.textContent = `Score: ${donneesUtilisateur.score || 0}`;
          afficherClassement();
        }
      }, 100);
    }, 500);
  }, 1500); // Attendre 1.5 secondes pour montrer le chargement
}

// Fonction pour redirection douce vers accueil
function redirigerVersAccueil() {
  const ecranChargement = document.getElementById("chargement");
  const titre = ecranChargement.querySelector("h2");
  const texte = ecranChargement.querySelector("p");
  
  setTimeout(() => {
    titre.textContent = "🔐 Redirection...";
    texte.textContent = "Vous devez vous connecter pour jouer !";
    
    setTimeout(() => {
      ecranChargement.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "accueil.html";
      }, 500);
    }, 1000);
  }, 1500);
}

// Vérifier si l'utilisateur est connecté
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
          // Afficher le contenu avec une belle transition
          // L'affichage des données se fera dans afficherContenu()
          afficherContenu();
        }
      });
  } else {
    // Pas d'utilisateur connecté
    console.log("❌ Pas d'utilisateur connecté");
    
    // Redirection douce vers accueil
    redirigerVersAccueil();
  }
});

// Générer les joueurs fictifs une seule fois
const joueursFictifs = genererJoueursFictifs();

function genererJoueursFictifs() {
  const prenoms = ["Alex", "Jordan", "Casey", "Morgan", "Taylor", "Riley", "Avery", "Quinn", "Sage", "River", "Blake", "Reese", "Skyler", "Emery", "Finley", "Rowan", "Parker", "Hayden", "Cameron", "Drew", "Sam", "Jamie", "Charlie", "Devon", "Frankie", "Jesse", "Kendall", "Logan", "Micah", "Noel", "Oakley", "Phoenix", "Remy", "Shay", "Tate", "Val", "Winter", "Zion", "Angel", "Bay", "Cedar", "Dallas", "Ember", "Gray", "Harbor", "Indigo", "Jade", "Nova", "Storm", "Kai", "Ash", "Luna", "Max", "Neo", "Zara", "Axel", "Mia", "Leo", "Ivy", "Rex", "Sky", "Fox", "Eve", "Jax", "Aria", "Orion", "Ruby", "Zane", "Iris", "Ace", "Luna", "Knox", "Nyx", "Cruz", "Sage", "Blaze", "Rain", "Dex", "Star", "Jet", "Moon", "Vex", "Snow", "Rex", "Sage", "Bolt", "Faye", "Dash", "Wren", "Rush", "Belle", "Flux", "Rose", "Hawk", "Dawn", "Lynx", "Hope", "Vibe", "Joy", "Edge", "Grace"];
  const suffixes = ["2024", "Pro", "Gaming", "XL", "99", "Master", "King", "Boss", "Elite", "Legend", "Gamer", "Ninja", "Shadow", "Fire", "Storm", "Blade", "Wolf", "Dragon", "Phoenix", "Thunder", "Ace", "Cyber", "Nova", "Vortex", "Pixel", "Quantum", "Neon", "Turbo", "Alpha", "Beta", "Omega", "Zero", "Prime", "Ultra", "Mega", "Super", "Hyper", "Titan", "Flash", "Spark", "Void", "Frost", "Solar", "Lunar", "Comet", "Stellar", "Cosmic", "Atomic", "Digital", "Matrix", "Cyber", "Virtual", "Binary", "Code", "Tech", "Data", "System", "Network", "Server", "Cloud", "Stream", "Signal", "Pulse", "Wave", "Flux", "Core", "Node", "Link", "Sync", "Boost", "Surge", "Rush", "Blitz", "Dash", "Swift", "Speed", "Quick", "Fast", "Rapid", "Turbo", "Nitro", "Rocket", "Jet", "Zoom", "Flash", "Bolt", "Strike", "Impact", "Crush", "Smash", "Blast", "Boom", "Bang", "Pow", "Zap", "Shock", "Volt", "Amp", "Watt", "Power", "Energy", "Force", "Might", "Strength"];
  
  const joueursFictifs = [];
  
  // Générer entre 10 000 et 1 000 000 joueurs fictifs (ÉNORME DÉFI !)
  const nombreJoueurs = Math.floor(Math.random() * 990001) + 10000; // Entre 10 000 et 1 000 000
  console.log(`🎮 Génération de ${nombreJoueurs.toLocaleString('fr-FR')} joueurs fictifs...`);
  
  // Optimisation : génération par batch pour éviter de bloquer l'interface
  for (let i = 0; i < nombreJoueurs; i++) {
    // Afficher un message de progression tous les 50 000 joueurs
    if (i % 50000 === 0 && i > 0) {
      console.log(`⏳ Progression: ${Math.round((i/nombreJoueurs)*100)}% (${i.toLocaleString('fr-FR')}/${nombreJoueurs.toLocaleString('fr-FR')})`);
    }
    const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
    const suffixe = suffixes[Math.floor(Math.random() * suffixes.length)];
    const numero = Math.floor(Math.random() * 9999) + 1;
    const pseudo = prenom + suffixe + numero;
    
    // Répartition réaliste des scores pour un gros serveur
    let score;
    const random = Math.random();
    if (random < 0.5) {
      // 50% ont un score entre 0 et 100 (les débutants/casual)
      score = Math.floor(Math.random() * 101);
    } else if (random < 0.75) {
      // 25% ont un score entre 101 et 1000 (joueurs réguliers)
      score = Math.floor(Math.random() * 900) + 101;
    } else if (random < 0.9) {
      // 15% ont un score entre 1001 et 10000 (joueurs expérimentés)
      score = Math.floor(Math.random() * 9000) + 1001;
    } else if (random < 0.98) {
      // 8% ont un score entre 10001 et 100000 (pros)
      score = Math.floor(Math.random() * 90000) + 10001;
    } else {
      // 2% ont un score entre 100001 et 1000000 (les légendes !)
      score = Math.floor(Math.random() * 900000) + 100001;
    }
    
    joueursFictifs.push({ pseudo: pseudo, score: score });
  }
  
  console.log(`✅ Génération terminée ! ${nombreJoueurs.toLocaleString('fr-FR')} joueurs créés.`);
  return joueursFictifs;
}

function afficherClassement() {
  // Récupérer tous les joueurs depuis Firebase
  db.collection('users').orderBy('score', 'desc').get()
    .then((querySnapshot) => {
      const joueursReels = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        joueursReels.push({
          pseudo: data.pseudo,
          score: data.score || 0
        });
      });
      
      // Combiner joueurs réels et fictifs
      const tousLesJoueurs = [...joueursFictifs, ...joueursReels];
      tousLesJoueurs.sort((a, b) => b.score - a.score);
      
      // Formater le nombre de joueurs pour l'affichage
      const nombreTotal = tousLesJoueurs.length.toLocaleString('fr-FR');
      classement.innerHTML = `<h3>🌍 Classement Global</h3><p style="margin: 5px 0; color: #666; font-size: 13px;">${nombreTotal} joueurs connectés</p>`;
      
      // Trouver la position du joueur connecté
      let positionJoueur = -1;
      let joueurConnecte = null;
      for (let i = 0; i < tousLesJoueurs.length; i++) {
        if (donneesUtilisateur && tousLesJoueurs[i].pseudo === donneesUtilisateur.pseudo) {
          positionJoueur = i + 1;
          joueurConnecte = tousLesJoueurs[i];
          break;
        }
      }

      // Afficher le TOP 5 (plus compact)
      const top5 = document.createElement("div");
      top5.innerHTML = "<h4 style='margin: 10px 0; font-size: 18px;'>🏆 TOP 5</h4>";
      top5.style.marginBottom = "15px";
      
      const listeTop5 = document.createElement("div");
      listeTop5.style.padding = "8px";
      listeTop5.style.backgroundColor = "#f8f9fa";
      listeTop5.style.borderRadius = "6px";
      listeTop5.style.margin = "8px auto";
      listeTop5.style.width = "300px";
      
      // Afficher les 5 premiers seulement
      for (let i = 0; i < Math.min(5, tousLesJoueurs.length); i++) {
        const joueur = tousLesJoueurs[i];
        const rang = document.createElement("p");
        rang.textContent = `${i + 1}. ${joueur.pseudo} - ${joueur.score} points`;
        rang.style.margin = "2px 0";
        rang.style.padding = "3px";
        rang.style.fontSize = "14px";
        
        // Couleur or, argent, bronze pour le podium
        if (i === 0) {
          rang.style.backgroundColor = "#FFD700";
          rang.style.fontWeight = "bold";
          rang.textContent = `🥇 ${rang.textContent}`;
        } else if (i === 1) {
          rang.style.backgroundColor = "#C0C0C0";
          rang.style.fontWeight = "bold";
          rang.textContent = `🥈 ${rang.textContent}`;
        } else if (i === 2) {
          rang.style.backgroundColor = "#CD7F32";
          rang.style.fontWeight = "bold";
          rang.textContent = `🥉 ${rang.textContent}`;
        }
        
        // Mettre en évidence le joueur connecté s'il est dans le top 5
        if (donneesUtilisateur && joueur.pseudo === donneesUtilisateur.pseudo) {
          rang.style.backgroundColor = "#e3f2fd";
          rang.style.border = "2px solid #1976d2";
          rang.style.color = "#1976d2";
          rang.style.borderRadius = "6px";
          rang.textContent += " 👤 (Vous)";
        }
        
        listeTop5.appendChild(rang);
      }
      
      top5.appendChild(listeTop5);
      classement.appendChild(top5);

      // Afficher VOTRE POSITION si elle n'est pas dans le top 5
      if (positionJoueur > 5 && joueurConnecte) {
        const votrePosition = document.createElement("div");
        votrePosition.innerHTML = "<h4 style='margin: 10px 0; font-size: 16px;'>📍 VOTRE POSITION</h4>";
        votrePosition.style.marginTop = "15px";
        
        const positionBox = document.createElement("div");
        positionBox.style.padding = "10px";
        positionBox.style.backgroundColor = "#e3f2fd";
        positionBox.style.border = "2px solid #1976d2";
        positionBox.style.borderRadius = "8px";
        positionBox.style.margin = "8px auto";
        positionBox.style.width = "300px";
        positionBox.style.fontWeight = "bold";
        positionBox.style.color = "#1976d2";
        
        const rangJoueur = document.createElement("p");
        rangJoueur.textContent = `${positionJoueur}. ${joueurConnecte.pseudo} - ${joueurConnecte.score} points 👤 (Vous)`;
        rangJoueur.style.margin = "0";
        rangJoueur.style.fontSize = "14px";
        
        positionBox.appendChild(rangJoueur);
        votrePosition.appendChild(positionBox);
        classement.appendChild(votrePosition);
      }

      // Bouton pour voir le classement complet (plus petit)
      const boutonComplet = document.createElement("button");
      boutonComplet.textContent = "📋 Classement complet";
      boutonComplet.style.padding = "8px 15px";
      boutonComplet.style.backgroundColor = "#2196F3";
      boutonComplet.style.color = "white";
      boutonComplet.style.border = "none";
      boutonComplet.style.borderRadius = "5px";
      boutonComplet.style.cursor = "pointer";
      boutonComplet.style.marginTop = "10px";
      boutonComplet.style.fontSize = "13px";
      boutonComplet.style.transition = "0.3s";
      
      boutonComplet.addEventListener("click", () => {
        // Créer une popup avec le classement complet
        afficherClassementComplet(tousLesJoueurs);
      });
      
      classement.appendChild(boutonComplet);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du classement:", error);
    });
}

// Fonction pour afficher le classement complet dans une popup
function afficherClassementComplet(tousLesJoueurs) {
  // Créer la popup
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.left = "0";
  popup.style.width = "100%";
  popup.style.height = "100%";
  popup.style.backgroundColor = "rgba(0,0,0,0.7)";
  popup.style.zIndex = "1000";
  popup.style.display = "flex";
  popup.style.justifyContent = "center";
  popup.style.alignItems = "center";

  const contenu = document.createElement("div");
  contenu.style.backgroundColor = "white";
  contenu.style.padding = "20px";
  contenu.style.borderRadius = "10px";
  contenu.style.maxWidth = "500px";
  contenu.style.maxHeight = "80%";
  contenu.style.width = "90%";
  
  const titre = document.createElement("h2");
  titre.textContent = "🏆 Classement Complet";
  titre.style.textAlign = "center";
  titre.style.marginTop = "0";
  
  const listeComplete = document.createElement("div");
  listeComplete.style.maxHeight = "400px";
  listeComplete.style.overflowY = "auto";
  listeComplete.style.padding = "10px";
  listeComplete.style.border = "1px solid #ddd";
  listeComplete.style.borderRadius = "5px";
  
  // Ajouter tous les joueurs
  for (let i = 0; i < tousLesJoueurs.length; i++) {
    const joueur = tousLesJoueurs[i];
    const rang = document.createElement("p");
    rang.textContent = `${i + 1}. ${joueur.pseudo} - ${joueur.score} points`;
    rang.style.margin = "3px 0";
    rang.style.padding = "5px";
    
    // Alternance de couleurs
    if (i % 2 === 0) {
      rang.style.backgroundColor = "#f8f9fa";
    }
    
    // Mettre en évidence le joueur connecté
    if (donneesUtilisateur && joueur.pseudo === donneesUtilisateur.pseudo) {
      rang.style.backgroundColor = "#e3f2fd";
      rang.style.borderRadius = "8px";
      rang.style.fontWeight = "bold";
      rang.style.color = "#1976d2";
      rang.style.padding = "8px";
      rang.style.border = "2px solid #1976d2";
      rang.textContent += " 👤 (Vous)";
      
      // Faire défiler automatiquement jusqu'au joueur
      setTimeout(() => {
        rang.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
    
    listeComplete.appendChild(rang);
  }
  
  const boutonFermer = document.createElement("button");
  boutonFermer.textContent = "Fermer";
  boutonFermer.style.padding = "10px 20px";
  boutonFermer.style.backgroundColor = "#f44336";
  boutonFermer.style.color = "white";
  boutonFermer.style.border = "none";
  boutonFermer.style.borderRadius = "5px";
  boutonFermer.style.cursor = "pointer";
  boutonFermer.style.marginTop = "15px";
  boutonFermer.style.width = "100%";
  
  boutonFermer.addEventListener("click", () => {
    document.body.removeChild(popup);
  });
  
  // Fermer en cliquant sur le fond
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      document.body.removeChild(popup);
    }
  });
  
  contenu.appendChild(titre);
  contenu.appendChild(listeComplete);
  contenu.appendChild(boutonFermer);
  popup.appendChild(contenu);
  document.body.appendChild(popup);
}

// Les événements sont maintenant gérés dans initialiserElementsDOM()