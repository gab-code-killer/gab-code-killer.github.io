// Variables Firebase
let utilisateurActuel = null;
let donneesUtilisateur = null;
let jeuInitialise = false; // Variable pour éviter les redirections après initialisation

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
        // Augmenter le score SEULEMENT EN LOCAL (pas dans Firebase)
        const nouveauScore = (donneesUtilisateur.score || 0) + (donneesUtilisateur.pointsParClic || 1);
        
        // Mettre à jour SEULEMENT les données locales
        donneesUtilisateur.score = nouveauScore;
        scoreAffiche.textContent = `Score: ${nouveauScore}`;
        
        // 🔥 NOUVEAU: Sauvegarder le score local dans sessionStorage
        sessionStorage.setItem('scoreLocal', nouveauScore.toString());
        
        // 🔥 NOUVEAU: Mettre à jour seulement ton score dans le classement (plus rapide)
        mettreAJourScoreClassement(nouveauScore);
        
        // On ne sauvegarde PAS dans Firebase ici !
        console.log("Score local mis à jour:", nouveauScore);
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

  // Bouton amis
  const boutonAmis = document.getElementById("boutonAmis");
  if (boutonAmis) {
    boutonAmis.addEventListener("click", function () {
      window.location.href = "amis.html";
    });
  }

  // Bouton quitter avec ta popup
  const boutonQuitter = document.getElementById("boutonQuitter");
  if (boutonQuitter) {
    boutonQuitter.addEventListener("click", function () {
      creerPopupSauvegardePersonnalisee();
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
          
          // 🔥 NOUVEAU: Récupérer les données locales depuis sessionStorage au chargement
          const scoreLocal = sessionStorage.getItem('scoreLocal');
          const niveauLocal = sessionStorage.getItem('niveauLocal');
          const pointsParClicLocal = sessionStorage.getItem('pointsParClicLocal');
          
          if (scoreLocal) {
            donneesUtilisateur.score = parseInt(scoreLocal);
            console.log("📊 Score local récupéré au chargement:", scoreLocal);
          } else {
            // Initialiser le sessionStorage avec le score Firebase
            sessionStorage.setItem('scoreLocal', donneesUtilisateur.score.toString());
          }
          
          if (niveauLocal) {
            donneesUtilisateur.niveauClic = parseInt(niveauLocal);
          } else {
            // Initialiser avec les valeurs par défaut si pas de données locales
            donneesUtilisateur.niveauClic = donneesUtilisateur.niveauClic || 1;
            sessionStorage.setItem('niveauLocal', donneesUtilisateur.niveauClic.toString());
          }
          
          if (pointsParClicLocal) {
            donneesUtilisateur.pointsParClic = parseInt(pointsParClicLocal);
          } else {
            // Initialiser avec les valeurs par défaut si pas de données locales
            donneesUtilisateur.pointsParClic = donneesUtilisateur.pointsParClic || 1;
            sessionStorage.setItem('pointsParClicLocal', donneesUtilisateur.pointsParClic.toString());
          }
          
          // Afficher le contenu seulement si pas encore initialisé
          if (!jeuInitialise) {
            afficherContenu();
            jeuInitialise = true; // Marquer comme initialisé
            
            // 🎮 Démarrer la progression des joueurs fictifs
            demarrerProgressionFictifs();
          }
        }
      });
  } else if (!jeuInitialise) {
    // Rediriger seulement si le jeu n'est pas encore initialisé
    console.log("❌ Pas d'utilisateur connecté");
    redirigerVersAccueil();
  }
});

// Fonction pour initialiser les joueurs fictifs dans Firebase (une seule fois)
async function initialiserJoueursFictifs() {
  try {
    // Vérifier si les joueurs fictifs existent déjà
    const snapshot = await db.collection('joueurs_fictifs').limit(1).get();
    
    if (!snapshot.empty) {
      console.log("✅ Les joueurs fictifs existent déjà dans Firebase");
      return;
    }

    console.log("🔄 Création des joueurs fictifs dans Firebase...");

    const prenoms = ["Alex", "Jordan", "Casey", "Morgan", "Taylor", "Riley", "Avery", "Quinn", "Sage", "River", "Blake", "Reese", "Skyler", "Emery", "Finley", "Rowan", "Parker", "Hayden", "Cameron", "Drew", "Sam", "Jamie", "Charlie", "Devon", "Frankie", "Jesse", "Kendall", "Logan", "Micah", "Noel", "Oakley", "Phoenix", "Remy", "Shay", "Tate", "Val", "Winter", "Zion", "Angel", "Bay", "Cedar", "Dallas", "Ember", "Gray", "Harbor", "Indigo", "Jade", "Nova", "Storm", "Kai", "Ash", "Luna", "Max", "Neo", "Zara", "Axel", "Mia", "Leo", "Ivy", "Rex", "Sky", "Fox", "Eve", "Jax", "Aria", "Orion", "Ruby", "Zane", "Iris", "Ace", "Luna", "Knox", "Nyx", "Cruz", "Sage", "Blaze", "Rain", "Dex", "Star", "Jet", "Moon", "Vex", "Snow", "Rex", "Sage", "Bolt", "Faye", "Dash", "Wren", "Rush", "Belle", "Flux", "Rose", "Hawk", "Dawn", "Lynx", "Hope", "Vibe", "Joy", "Edge", "Grace"];
    const suffixes = ["2024", "Pro", "Gaming", "XL", "99", "Master", "King", "Boss", "Elite", "Legend", "Gamer", "Ninja", "Shadow", "Fire", "Storm", "Blade", "Wolf", "Dragon", "Phoenix", "Thunder", "Ace", "Cyber", "Nova", "Vortex", "Pixel", "Quantum", "Neon", "Turbo", "Alpha", "Beta", "Omega", "Zero", "Prime", "Ultra", "Mega", "Super", "Hyper", "Titan", "Flash", "Spark", "Void", "Frost", "Solar", "Lunar", "Comet", "Stellar", "Cosmic", "Atomic", "Digital", "Matrix", "Cyber", "Virtual", "Binary", "Code", "Tech", "Data", "System", "Network", "Server", "Cloud", "Stream", "Signal", "Pulse", "Wave", "Flux", "Core", "Node", "Link", "Sync", "Boost", "Surge", "Rush", "Blitz", "Dash", "Swift", "Speed", "Quick", "Fast", "Rapid", "Turbo", "Nitro", "Rocket", "Jet", "Zoom", "Flash", "Bolt", "Strike", "Impact", "Crush", "Smash", "Blast", "Boom", "Bang", "Pow", "Zap", "Shock", "Volt", "Amp", "Watt", "Power", "Energy", "Force", "Might", "Strength"];
    
    // Créer 500 joueurs fictifs (optimisé pour Firebase)
    const nombreJoueurs = 500;
    const batch = db.batch();
    
    for (let i = 0; i < nombreJoueurs; i++) {
      const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
      const suffixe = suffixes[Math.floor(Math.random() * suffixes.length)];
      const numero = Math.floor(Math.random() * 9999) + 1;
      const pseudo = prenom + suffixe + numero;
      
      // Score entre 0 et 50000 pour commencer (sera ajusté selon le max des vrais joueurs)
      let score;
      const random = Math.random();
      if (random < 0.5) {
        score = Math.floor(Math.random() * 101); // 50% entre 0-100
      } else if (random < 0.75) {
        score = Math.floor(Math.random() * 900) + 101; // 25% entre 101-1000
      } else if (random < 0.9) {
        score = Math.floor(Math.random() * 9000) + 1001; // 15% entre 1001-10000
      } else {
        score = Math.floor(Math.random() * 40000) + 10001; // 10% entre 10001-50000
      }
      
      const docRef = db.collection('joueurs_fictifs').doc();
      batch.set(docRef, {
        pseudo: pseudo,
        score: score,
        fictif: true,
        dateCreation: new Date()
      });
    }
    
    await batch.commit();
    console.log(`✅ ${nombreJoueurs} joueurs fictifs créés dans Firebase !`);
  } catch (error) {
    console.error("❌ Erreur création joueurs fictifs:", error);
  }
}

// Initialiser les joueurs fictifs au chargement
initialiserJoueursFictifs();

// Fonction pour calculer les points gagnés selon le niveau du joueur (plus réaliste)
function calculerPointsGagnes(scoreActuel) {
  if (scoreActuel < 100) {
    // Débutants : +1 à +5 points
    return Math.floor(Math.random() * 5) + 1;
  } else if (scoreActuel < 1000) {
    // Joueurs réguliers : +5 à +20 points
    return Math.floor(Math.random() * 16) + 5;
  } else if (scoreActuel < 10000) {
    // Expérimentés : +10 à +50 points
    return Math.floor(Math.random() * 41) + 10;
  } else {
    // Pros : +20 à +100 points
    return Math.floor(Math.random() * 81) + 20;
  }
}

// Fonction pour calculer le taux d'activité selon l'heure (plus réaliste)
function calculerTauxActivite() {
  const maintenant = new Date();
  const heure = maintenant.getHours();
  
  // Nuit (23h-8h) : Très peu de joueurs actifs (5-10%)
  if (heure >= 23 || heure < 8) {
    return 0.05 + (Math.random() * 0.05); // Entre 5% et 10%
  }
  // Heures de pointe (18h-22h) : Beaucoup de joueurs actifs (70-90%)
  else if (heure >= 18 && heure < 23) {
    return 0.70 + (Math.random() * 0.20); // Entre 70% et 90%
  }
  // Midi-après-midi (12h-18h) : Activité moyenne (40-60%)
  else if (heure >= 12 && heure < 18) {
    return 0.40 + (Math.random() * 0.20); // Entre 40% et 60%
  }
  // Matinée (8h-12h) : Activité faible-moyenne (20-40%)
  else {
    return 0.20 + (Math.random() * 0.20); // Entre 20% et 40%
  }
}

// Fonction pour faire progresser les joueurs fictifs de manière réaliste
async function faireProgresserJoueursFictifs() {
  try {
    const maintenant = new Date();
    const heure = maintenant.getHours();
    
    // Message selon l'heure
    let periode = "";
    if (heure >= 23 || heure < 8) {
      periode = "🌙 Nuit - Peu de joueurs actifs";
    } else if (heure >= 18 && heure < 23) {
      periode = "🔥 Heures de pointe - Beaucoup de joueurs !";
    } else if (heure >= 12 && heure < 18) {
      periode = "☀️ Après-midi - Activité normale";
    } else {
      periode = "🌅 Matinée - Activité modérée";
    }
    
    console.log(`⏰ ${heure}h - ${periode}`);
    
    // Récupérer tous les joueurs fictifs
    const snapshot = await db.collection('joueurs_fictifs').get();
    
    if (snapshot.empty) {
      console.log("⚠️ Aucun joueur fictif trouvé");
      return;
    }

    const batch = db.batch();
    let compteur = 0;
    let joueursActifs = 0;
    
    // Calculer le taux d'activité selon l'heure
    const tauxActivite = calculerTauxActivite();

    snapshot.forEach((doc) => {
      // Chance d'être actif selon l'heure de la journée
      const estActif = Math.random() < tauxActivite;
      
      if (estActif) {
        const data = doc.data();
        const scoreActuel = data.score || 0;
        const pointsGagnes = calculerPointsGagnes(scoreActuel);
        const nouveauScore = scoreActuel + pointsGagnes;
        
        batch.update(doc.ref, { score: nouveauScore });
        joueursActifs++;
        compteur++;
        
        // Firebase limite à 500 opérations par batch
        if (compteur === 500) {
          batch.commit();
          compteur = 0;
        }
      }
    });

    // Commit les dernières mises à jour
    if (compteur > 0) {
      await batch.commit();
    }

    const pourcentageActifs = ((joueursActifs / snapshot.size) * 100).toFixed(1);
    console.log(`📈 ${joueursActifs}/${snapshot.size} joueurs fictifs ont progressé (${pourcentageActifs}% actifs)`);
    
    // Rafraîchir le classement pour montrer les changements
    if (typeof afficherClassement === 'function') {
      afficherClassement();
    }
  } catch (error) {
    console.error("❌ Erreur progression fictifs:", error);
  }
}

// Démarrer la progression automatique des joueurs fictifs
function demarrerProgressionFictifs() {
  // Première mise à jour après 30 secondes
  setTimeout(() => {
    faireProgresserJoueursFictifs();
    
    // Puis toutes les 1 à 2 minutes (aléatoire pour plus de réalisme)
    setInterval(() => {
      const delai = (Math.random() * 60000) + 60000; // Entre 1 et 2 minutes
      setTimeout(faireProgresserJoueursFictifs, delai);
    }, 90000); // Vérifier toutes les 1.5 minutes en moyenne
  }, 30000);
  
  console.log("🎮 Système de progression des joueurs fictifs activé !");
}

// Fonction légère pour mettre à jour seulement le score du joueur connecté
function mettreAJourScoreClassement(nouveauScore) {
  // Trouver tous les éléments qui affichent le score du joueur connecté
  const elements = classement.querySelectorAll('p');
  elements.forEach(element => {
    if (element.textContent.includes('👤 (Vous)') && donneesUtilisateur) {
      // Mise à jour rapide du texte sans recréer le DOM
      const ancienTexte = element.textContent;
      const nouveauTexte = ancienTexte.replace(/\d+ points/, `${nouveauScore} points`);
      element.textContent = nouveauTexte;
    }
  });
}

function afficherClassement() {
  // Récupérer les joueurs réels ET fictifs depuis Firebase
  Promise.all([
    db.collection('users').orderBy('score', 'desc').get(),
    db.collection('joueurs_fictifs').orderBy('score', 'desc').get()
  ])
    .then(([joueursReelsSnapshot, joueursFictifsSnapshot]) => {
      const joueursReels = [];
      const joueursFictifs = [];
      
      // Récupérer les joueurs réels
      joueursReelsSnapshot.forEach((doc) => {
        const data = doc.data();
        joueursReels.push({
          pseudo: data.pseudo,
          score: data.score || 0,
          reel: true
        });
      });
      
      // Récupérer les joueurs fictifs
      joueursFictifsSnapshot.forEach((doc) => {
        const data = doc.data();
        joueursFictifs.push({
          pseudo: data.pseudo,
          score: data.score || 0,
          fictif: true
        });
      });
      
      // 🔥 NOUVEAU: Ajuster les scores fictifs pour qu'ils restent sous le max des vrais joueurs
      const scoreMaxReel = joueursReels.length > 0 ? Math.max(...joueursReels.map(j => j.score)) : 0;
      
      // Filtrer et ajuster les joueurs fictifs
      const joueursFictifsAjustes = joueursFictifs.filter(j => {
        // Garder seulement les joueurs fictifs avec un score inférieur au max réel
        return j.score <= scoreMaxReel;
      });
      
      console.log(`📊 Scores: Max réel = ${scoreMaxReel}, Fictifs gardés = ${joueursFictifsAjustes.length}/${joueursFictifs.length}`);
      
      // 🔥 NOUVEAU: Remplacer le score du joueur connecté par son score local
      if (donneesUtilisateur) {
        // Trouver et remplacer le score du joueur connecté
        for (let i = 0; i < joueursReels.length; i++) {
          if (joueursReels[i].pseudo === donneesUtilisateur.pseudo) {
            joueursReels[i].score = donneesUtilisateur.score; // Score local
            console.log("📊 Score local utilisé dans classement:", donneesUtilisateur.score);
            break;
          }
        }
      }
      
      // Combiner joueurs réels et fictifs ajustés
      const tousLesJoueurs = [...joueursFictifsAjustes, ...joueursReels];
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
  const nombreTotal = tousLesJoueurs.length;
  const nombreAffiche = Math.min(10000, nombreTotal);
  
  if (nombreTotal > 10000) {
    titre.textContent = `🏆 TOP 10 000 (sur ${nombreTotal.toLocaleString('fr-FR')} joueurs)`;
  } else {
    titre.textContent = `🏆 Classement Complet (${nombreTotal.toLocaleString('fr-FR')} joueurs)`;
  }
  titre.style.textAlign = "center";
  titre.style.marginTop = "0";
  titre.style.fontSize = "18px";
  
  const listeComplete = document.createElement("div");
  listeComplete.style.maxHeight = "400px";
  listeComplete.style.overflowY = "auto";
  listeComplete.style.padding = "10px";
  listeComplete.style.border = "1px solid #ddd";
  listeComplete.style.borderRadius = "5px";
  
  // Vérifier si le joueur connecté est dans les 10 000 premiers
  let joueurDansTop10k = false;
  let positionJoueurConnecte = -1;
  
  for (let i = 0; i < Math.min(10000, tousLesJoueurs.length); i++) {
    if (donneesUtilisateur && tousLesJoueurs[i].pseudo === donneesUtilisateur.pseudo) {
      joueurDansTop10k = true;
      positionJoueurConnecte = i + 1;
      break;
    }
  }

  // Ajouter les 10 000 premiers joueurs (ou moins si il y en a moins)
  for (let i = 0; i < nombreAffiche; i++) {
    const joueur = tousLesJoueurs[i];
    const rang = document.createElement("p");
    rang.textContent = `${i + 1}. ${joueur.pseudo} - ${joueur.score} points`;
    rang.style.margin = "3px 0";
    rang.style.padding = "5px";
    rang.style.fontSize = "13px";
    
    // Alternance de couleurs
    if (i % 2 === 0) {
      rang.style.backgroundColor = "#f8f9fa";
    }
    
    // Mettre en évidence le joueur connecté s'il est dans le top 10k
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
  
  // Si il y a plus de 10 000 joueurs, ajouter un indicateur
  if (nombreTotal > 10000) {
    const indicateur = document.createElement("div");
    indicateur.style.padding = "15px";
    indicateur.style.backgroundColor = "#fff3cd";
    indicateur.style.border = "1px solid #ffeaa7";
    indicateur.style.borderRadius = "8px";
    indicateur.style.margin = "10px 0";
    indicateur.style.textAlign = "center";
    indicateur.style.fontWeight = "bold";
    indicateur.style.color = "#856404";
    
    const nombreRestant = (nombreTotal - 10000).toLocaleString('fr-FR');
    indicateur.innerHTML = `
      <div style="font-size: 16px; margin-bottom: 5px;">⬇️ Et encore ${nombreRestant} joueurs...</div>
      <div style="font-size: 12px; opacity: 0.8;">Seuls les 10 000 premiers sont affichés pour les performances</div>
    `;
    
    listeComplete.appendChild(indicateur);
  }
  
  // Si le joueur connecté n'est pas dans le top 10k, l'afficher séparément
  if (!joueurDansTop10k && donneesUtilisateur) {
    // Trouver la vraie position du joueur
    let vraiePosition = -1;
    for (let i = 0; i < tousLesJoueurs.length; i++) {
      if (tousLesJoueurs[i].pseudo === donneesUtilisateur.pseudo) {
        vraiePosition = i + 1;
        break;
      }
    }
    
    if (vraiePosition > -1) {
      const votrePositionDiv = document.createElement("div");
      votrePositionDiv.style.padding = "15px";
      votrePositionDiv.style.backgroundColor = "#e3f2fd";
      votrePositionDiv.style.border = "2px solid #1976d2";
      votrePositionDiv.style.borderRadius = "10px";
      votrePositionDiv.style.margin = "15px 0";
      votrePositionDiv.style.textAlign = "center";
      
      votrePositionDiv.innerHTML = `
        <div style="font-weight: bold; color: #1976d2; font-size: 14px; margin-bottom: 5px;">📍 VOTRE POSITION</div>
        <div style="font-weight: bold; color: #1976d2; font-size: 16px;">
          ${vraiePosition.toLocaleString('fr-FR')}. ${donneesUtilisateur.pseudo} - ${donneesUtilisateur.score} points 👤 (Vous)
        </div>
      `;
      
      listeComplete.appendChild(votrePositionDiv);
    }
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

// Créer notre propre popup avec "Save" et "Cancel"
function creerPopupSauvegardePersonnalisee() {
  // Créer le fond sombre
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.3)';
  overlay.style.zIndex = '10000';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';

  // Créer la popup qui ressemble au navigateur
  const popup = document.createElement('div');
  popup.style.backgroundColor = '#f7f7f7';
  popup.style.border = '1px solid #ccc';
  popup.style.borderRadius = '8px';
  popup.style.padding = '20px';
  popup.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
  popup.style.fontSize = '14px';
  popup.style.color = '#333';
  popup.style.minWidth = '400px';
  popup.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';

  // Icône et titre
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.marginBottom = '15px';
  
  const icon = document.createElement('div');
  icon.innerHTML = '⚠️';
  icon.style.fontSize = '20px';
  icon.style.marginRight = '10px';
  
  const titre = document.createElement('div');
  titre.textContent = 'Sauvegarder vos modifications';
  titre.style.fontWeight = '500';
  
  header.appendChild(icon);
  header.appendChild(titre);

  // Message
  const message = document.createElement('div');
  message.textContent = 'Votre progression sera sauvegardée sur votre compte.';
  message.style.marginBottom = '20px';
  message.style.color = '#666';

  // Conteneur des boutons
  const boutonsContainer = document.createElement('div');
  boutonsContainer.style.display = 'flex';
  boutonsContainer.style.gap = '10px';
  boutonsContainer.style.justifyContent = 'flex-end';

  // Bouton Save
  const btnSave = document.createElement('button');
  btnSave.textContent = 'Sauvegarder';
  btnSave.style.backgroundColor = '#007AFF';
  btnSave.style.color = 'white';
  btnSave.style.border = 'none';
  btnSave.style.padding = '8px 16px';
  btnSave.style.borderRadius = '6px';
  btnSave.style.cursor = 'pointer';
  btnSave.style.fontWeight = '500';
  btnSave.onclick = () => {
    // Fermer la popup immédiatement
    document.body.removeChild(overlay);
    
    // Sauvegarder en arrière-plan
    if (donneesUtilisateur && utilisateurActuel) {
      db.collection('users').doc(utilisateurActuel.uid).update({
        score: donneesUtilisateur.score || 0
      }).then(() => {
        console.log("✅ Score sauvegardé !");
      }).catch((error) => {
        console.error("❌ Erreur sauvegarde:", error);
      });
    }
  };

  // Bouton Cancel
  const btnCancel = document.createElement('button');
  btnCancel.textContent = 'Annuler';
  btnCancel.style.backgroundColor = '#f0f0f0';
  btnCancel.style.color = '#333';
  btnCancel.style.border = '1px solid #ccc';
  btnCancel.style.padding = '8px 16px';
  btnCancel.style.borderRadius = '6px';
  btnCancel.style.cursor = 'pointer';
  btnCancel.onclick = () => {
    // Juste fermer la popup
    document.body.removeChild(overlay);
  };

  // Assembler tout
  boutonsContainer.appendChild(btnCancel);
  boutonsContainer.appendChild(btnSave);
  popup.appendChild(header);
  popup.appendChild(message);
  popup.appendChild(boutonsContainer);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}



// Les événements sont maintenant gérés dans initialiserElementsDOM()