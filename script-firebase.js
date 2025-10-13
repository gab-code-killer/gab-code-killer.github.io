const pseudoAffiche = document.getElementById("pseudoAffiche");
const boutonJeu = document.getElementById("boutonJeu");
const scoreAffiche = document.getElementById("scoreAffiche");
const classement = document.getElementById("classement");
const boutonDeconnexion = document.getElementById("boutonDeconnexion");

// Variables Firebase
let utilisateurActuel = null;
let donneesUtilisateur = null;

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
          pseudoAffiche.textContent = `Salut ${donneesUtilisateur.pseudo} !`;
          scoreAffiche.textContent = `Score: ${donneesUtilisateur.score || 0}`;
          afficherClassement();
          // Afficher le contenu avec une belle transition
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
  
  // Générer entre 500 et 1000 joueurs fictifs
  const nombreJoueurs = Math.floor(Math.random() * 501) + 500; // Entre 500 et 1000
  
  for (let i = 0; i < nombreJoueurs; i++) {
    const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
    const suffixe = suffixes[Math.floor(Math.random() * suffixes.length)];
    const numero = Math.floor(Math.random() * 9999) + 1;
    const pseudo = prenom + suffixe + numero;
    
    // Générer plus de scores bas (personnes nulles)
    let score;
    const random = Math.random();
    if (random < 0.4) {
      // 40% de chance d'avoir un score entre 0 et 50 (les nuls)
      score = Math.floor(Math.random() * 51);
    } else if (random < 0.6) {
      // 20% de chance d'avoir un score entre 51 et 200 (débutants)
      score = Math.floor(Math.random() * 150) + 51;
    } else if (random < 0.8) {
      // 20% de chance d'avoir un score entre 201 et 1000 (moyens)
      score = Math.floor(Math.random() * 800) + 201;
    } else {
      // 20% de chance d'avoir un score entre 1001 et 10000 (pros)
      score = Math.floor(Math.random() * 9000) + 1001;
    }
    
    joueursFictifs.push({ pseudo: pseudo, score: score });
  }
  
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
      
      classement.innerHTML = "<h3>Classement :</h3>";
      
      // Créer une div avec molette pour tous les joueurs
      const listeComplete = document.createElement("div");
      listeComplete.style.maxHeight = "300px";
      listeComplete.style.overflowY = "auto";
      listeComplete.style.padding = "10px 20px";
      listeComplete.style.margin = "10px auto";
      listeComplete.style.width = "350px";
      
      // Ajouter tous les joueurs dans la liste
      for (let i = 0; i < tousLesJoueurs.length; i++) {
        const joueur = tousLesJoueurs[i];
        const rang = document.createElement("p");
        rang.textContent = `${i + 1}. ${joueur.pseudo} - ${joueur.score} points`;
        rang.style.margin = "5px 0";
        rang.style.padding = "3px";
        
        // Mettre en évidence le joueur connecté
        if (donneesUtilisateur && joueur.pseudo === donneesUtilisateur.pseudo) {
          rang.style.backgroundColor = "#e3f2fd";
          rang.style.borderRadius = "8px";
          rang.style.fontWeight = "bold";
          rang.style.color = "#1976d2";
          rang.style.padding = "8px";
          rang.textContent += " (Vous)";
        }
        
        // Alternance de couleurs pour la lisibilité
        if (i % 2 === 0) {
          rang.style.backgroundColor = rang.style.backgroundColor || "#f8f9fa";
        }
        
        listeComplete.appendChild(rang);
      }
      
      classement.appendChild(listeComplete);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du classement:", error);
    });
}

// Logique du jeu avec Firebase
boutonJeu.addEventListener("click", function () {
  if (donneesUtilisateur && utilisateurActuel) {
    const nouveauScore = (donneesUtilisateur.score || 0) + 1;
    
    // Mettre à jour le score dans Firestore
    db.collection('users').doc(utilisateurActuel.uid).update({
      score: nouveauScore
    })
    .then(() => {
      donneesUtilisateur.score = nouveauScore;
      scoreAffiche.textContent = `Score: ${nouveauScore}`;
      afficherClassement();
    })
    .catch((error) => {
      console.error("Erreur mise à jour score:", error);
    });
  }
});

// Déconnexion
boutonDeconnexion.addEventListener("click", function () {
  auth.signOut().then(() => {
    console.log("Déconnecté avec succès");
    window.location.href = "accueil.html";
  }).catch((error) => {
    console.error("Erreur déconnexion:", error);
  });
});