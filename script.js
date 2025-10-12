const pseudoAffiche = document.getElementById("pseudoAffiche");
const emailConnecte = localStorage.getItem("utilisateurConnecte");
const compteUtilisateur = JSON.parse(localStorage.getItem(emailConnecte));
const boutonJeu = document.getElementById("boutonJeu");
const scoreAffiche = document.getElementById("scoreAffiche");
const classement = document.getElementById("classement");
const boutonDeconnexion = document.getElementById("boutonDeconnexion");

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
  const joueurs = [];
  
  // Ajouter les vrais joueurs
  for (let i = 0; i < localStorage.length; i++) {
    const cle = localStorage.key(i);
    
    if (cle !== "utilisateurConnecte") {
      const compte = JSON.parse(localStorage.getItem(cle));
      joueurs.push({
        pseudo: compte.pseudo,
        score: compte.score || 0
      });
    }
  }
  
  // Combiner tous les joueurs
  const tousLesJoueurs = [...joueursFictifs, ...joueurs];
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
    if (compteUtilisateur && joueur.pseudo === compteUtilisateur.pseudo) {
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
  
  // Afficher ton rang en bas si tu n'es pas visible dans la liste
  if (compteUtilisateur) {
    const pseudoJoueur = compteUtilisateur.pseudo;
    const rangJoueur = tousLesJoueurs.findIndex(j => j.pseudo === pseudoJoueur);
    
    if (rangJoueur !== -1) {
      const monRangBas = document.createElement("div");
      monRangBas.id = "monRangBas";
      monRangBas.style.marginTop = "15px";
      monRangBas.style.padding = "10px";
      monRangBas.style.backgroundColor = "#e3f2fd";
      monRangBas.style.borderRadius = "8px";
      monRangBas.style.fontWeight = "bold";
      monRangBas.style.color = "#1976d2";
      monRangBas.textContent = `${rangJoueur + 1}. ${pseudoJoueur} - ${compteUtilisateur.score || 0} points`;
      
      classement.appendChild(monRangBas);
      
      // Détecter le scroll pour cacher/montrer ton rang
      listeComplete.addEventListener("scroll", function() {
        const monElementDansListe = Array.from(listeComplete.children).find(el => 
          el.textContent.includes(pseudoJoueur) && el.textContent.includes("(Vous)")
        );
        
        if (monElementDansListe) {
          const rect = monElementDansListe.getBoundingClientRect();
          const listRect = listeComplete.getBoundingClientRect();
          
          // Si ton élément est visible dans la liste
          if (rect.top >= listRect.top && rect.bottom <= listRect.bottom) {
            monRangBas.style.display = "none";
          } else {
            monRangBas.style.display = "block";
          }
        }
      });
    }
  }
}

if (compteUtilisateur) {
  pseudoAffiche.textContent = "Bienvenue " + compteUtilisateur.pseudo + " !";
} else {
  pseudoAffiche.textContent = "Personne n'est connecté";
}

if (compteUtilisateur) {
  let score = compteUtilisateur.score || 0;
  
  // Initialiser les améliorations si elles n'existent pas
  if (!compteUtilisateur.ameliorations) {
    compteUtilisateur.ameliorations = {
      niveauClic: 1,
      pointsParClic: 1
    };
    localStorage.setItem(emailConnecte, JSON.stringify(compteUtilisateur));
  }
  
  scoreAffiche.textContent = "Score: " + score;

  boutonJeu.addEventListener("click", function () {
    // Recharger les données utilisateur pour avoir les dernières améliorations
    const compteActuel = JSON.parse(localStorage.getItem(emailConnecte));
    const pointsGagnes = compteActuel.ameliorations.pointsParClic || 1;
    
    score = score + pointsGagnes;
    scoreAffiche.textContent = "Score: " + score;
    
    // Mettre à jour le compte avec le nouveau score
    compteActuel.score = score;
    localStorage.setItem(emailConnecte, JSON.stringify(compteActuel));
    
    // Mettre à jour la variable globale aussi
    Object.assign(compteUtilisateur, compteActuel);
    
    afficherClassement();
  });
  
  const boutonAmeliorations = document.getElementById("boutonAmeliorations");
  boutonAmeliorations.addEventListener("click", function () {
    window.location.href = "ameliorations.html";
  });
  
  boutonDeconnexion.addEventListener("click", function () {
    window.location.href = "accueil.html";
  });
} else {
  scoreAffiche.textContent = "Connectez-vous pour jouer !";
  boutonJeu.style.display = "none";
  boutonDeconnexion.style.display = "none";
  const boutonAmeliorations = document.getElementById("boutonAmeliorations");
  boutonAmeliorations.style.display = "none";
  const boutonConnexion = document.createElement("button");
  boutonConnexion.innerText = "Connexion ou création de compte";
  boutonConnexion.classList.add("Connexion");
  boutonConnexion.addEventListener("click", function () {
    window.location.href = "accueil.html";
  });
  boutonJeu.insertAdjacentElement("afterend", boutonConnexion);
}

afficherClassement();
