// Fonction pour afficher des notifications automatiques
function afficherNotification(message, type = 'info', duree = 3000) {
  const notification = document.createElement('div');
  notification.textContent = message;
  
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
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
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

// Éléments DOM
const pseudoAffiche = document.getElementById("pseudoAffiche");
const inputRecherche = document.getElementById("inputRecherche");
const boutonRechercher = document.getElementById("boutonRechercher");
const resultatRecherche = document.getElementById("resultatRecherche");
const listeDemandesRecues = document.getElementById("listeDemandesRecues");
const listeDemandesEnvoyees = document.getElementById("listeDemandesEnvoyees");
const listeAmis = document.getElementById("listeAmis");
const retourJeu = document.getElementById("retourJeu");

// Vérifier si l'utilisateur est connecté
auth.onAuthStateChanged((user) => {
  if (user) {
    utilisateurActuel = user;
    
    // Récupérer les données de l'utilisateur
    db.collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          donneesUtilisateur = doc.data();
          pseudoAffiche.textContent = `Bienvenue ${donneesUtilisateur.pseudo} !`;
          
          // Charger les demandes et amis
          chargerDemandesRecues();
          chargerDemandesEnvoyees();
          chargerAmis();
        }
      });
  } else {
    window.location.href = "accueil.html";
  }
});

// Rechercher un joueur
boutonRechercher.addEventListener("click", rechercherJoueur);
inputRecherche.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    rechercherJoueur();
  }
});

function rechercherJoueur() {
  const pseudoRecherche = inputRecherche.value.trim();
  
  if (pseudoRecherche === "") {
    afficherNotification("⚠️ Entrez un pseudo pour rechercher", 'warning');
    return;
  }
  
  if (pseudoRecherche === donneesUtilisateur.pseudo) {
    afficherNotification("❌ Vous ne pouvez pas vous ajouter vous-même !", 'error');
    return;
  }
  
  resultatRecherche.innerHTML = '<p style="color: white;">🔍 Recherche en cours...</p>';
  
  // Rechercher dans Firebase
  db.collection('users')
    .where('pseudo', '==', pseudoRecherche)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        resultatRecherche.innerHTML = '<p class="message-erreur">❌ Aucun joueur trouvé avec ce pseudo</p>';
      } else {
        // Joueur trouvé
        const joueurDoc = querySnapshot.docs[0];
        const joueur = joueurDoc.data();
        const joueurUid = joueurDoc.id;
        
        afficherResultatRecherche(joueur, joueurUid);
      }
    })
    .catch((error) => {
      console.error("Erreur recherche:", error);
      resultatRecherche.innerHTML = '<p class="message-erreur">❌ Erreur lors de la recherche</p>';
    });
}

async function afficherResultatRecherche(joueur, joueurUid) {
  // Vérifier si déjà ami
  const estAmi = await verifierSiAmi(joueurUid);
  // Vérifier si demande déjà envoyée
  const demandeEnvoyee = await verifierDemandeEnvoyee(joueurUid);
  // Vérifier si demande reçue de ce joueur
  const demandeRecue = await verifierDemandeRecue(joueurUid);
  
  let boutonHtml = '';
  if (estAmi) {
    boutonHtml = '<button class="btn-ajouter" disabled>✅ Déjà ami</button>';
  } else if (demandeEnvoyee) {
    boutonHtml = '<button class="btn-annuler" onclick="annulerDemande(\'' + joueurUid + '\')">❌ Annuler la demande</button>';
  } else if (demandeRecue) {
    boutonHtml = '<button class="btn-accepter" onclick="accepterDemande(\'' + joueurUid + '\')">✅ Accepter</button>';
  } else {
    boutonHtml = '<button class="btn-ajouter" onclick="envoyerDemande(\'' + joueurUid + '\', \'' + joueur.pseudo + '\')">➕ Ajouter</button>';
  }
  
  resultatRecherche.innerHTML = `
    <div class="carte-joueur">
      <div class="info-joueur">
        <div class="pseudo">${joueur.pseudo}</div>
        <div class="score">⭐ Score: ${joueur.score || 0} points</div>
      </div>
      <div class="actions-joueur">
        ${boutonHtml}
      </div>
    </div>
  `;
}

// Vérifier si déjà ami
async function verifierSiAmi(joueurUid) {
  const doc = await db.collection('users').doc(utilisateurActuel.uid)
    .collection('amis').doc(joueurUid).get();
  return doc.exists;
}

// Vérifier si demande déjà envoyée
async function verifierDemandeEnvoyee(joueurUid) {
  const doc = await db.collection('users').doc(joueurUid)
    .collection('demandes_amis').doc(utilisateurActuel.uid).get();
  return doc.exists;
}

// Vérifier si demande reçue
async function verifierDemandeRecue(joueurUid) {
  const doc = await db.collection('users').doc(utilisateurActuel.uid)
    .collection('demandes_amis').doc(joueurUid).get();
  return doc.exists;
}

// Envoyer une demande d'ami
async function envoyerDemande(joueurUid, pseudoJoueur) {
  try {
    // Ajouter la demande dans la collection du joueur cible
    await db.collection('users').doc(joueurUid)
      .collection('demandes_amis').doc(utilisateurActuel.uid).set({
        pseudo: donneesUtilisateur.pseudo,
        date: new Date()
      });
    
    afficherNotification(`✅ Demande envoyée à ${pseudoJoueur} !`, 'success');
    rechercherJoueur(); // Rafraîchir l'affichage
    chargerDemandesEnvoyees(); // Mettre à jour la liste des demandes envoyées
  } catch (error) {
    console.error("Erreur envoi demande:", error);
    afficherNotification("❌ Erreur lors de l'envoi de la demande", 'error');
  }
}

// Annuler une demande envoyée
async function annulerDemande(joueurUid) {
  try {
    await db.collection('users').doc(joueurUid)
      .collection('demandes_amis').doc(utilisateurActuel.uid).delete();
    
    afficherNotification("✅ Demande annulée", 'success');
    rechercherJoueur();
    chargerDemandesEnvoyees();
  } catch (error) {
    console.error("Erreur annulation:", error);
    afficherNotification("❌ Erreur lors de l'annulation", 'error');
  }
}

// Charger les demandes reçues
async function chargerDemandesRecues() {
  try {
    const snapshot = await db.collection('users').doc(utilisateurActuel.uid)
      .collection('demandes_amis').get();
    
    if (snapshot.empty) {
      listeDemandesRecues.innerHTML = '<p class="message-vide">Aucune demande en attente</p>';
      return;
    }
    
    listeDemandesRecues.innerHTML = '';
    
    for (const doc of snapshot.docs) {
      const demande = doc.data();
      const joueurUid = doc.id;
      
      // Récupérer le score actuel du joueur
      const joueurDoc = await db.collection('users').doc(joueurUid).get();
      const score = joueurDoc.exists ? (joueurDoc.data().score || 0) : 0;
      
      const carteHtml = `
        <div class="carte-joueur">
          <div class="info-joueur">
            <div class="pseudo">${demande.pseudo}</div>
            <div class="score">⭐ Score: ${score} points</div>
          </div>
          <div class="actions-joueur">
            <button class="btn-accepter" onclick="accepterDemande('${joueurUid}')">✅ Accepter</button>
            <button class="btn-refuser" onclick="refuserDemande('${joueurUid}')">❌ Refuser</button>
          </div>
        </div>
      `;
      
      listeDemandesRecues.innerHTML += carteHtml;
    }
  } catch (error) {
    console.error("Erreur chargement demandes:", error);
  }
}

// Charger les demandes envoyées
async function chargerDemandesEnvoyees() {
  try {
    // Rechercher toutes les demandes où l'utilisateur actuel est l'expéditeur
    const usersSnapshot = await db.collection('users').get();
    const demandesEnvoyees = [];
    
    for (const userDoc of usersSnapshot.docs) {
      const demandeDoc = await userDoc.ref.collection('demandes_amis').doc(utilisateurActuel.uid).get();
      if (demandeDoc.exists) {
        const userData = userDoc.data();
        demandesEnvoyees.push({
          uid: userDoc.id,
          pseudo: userData.pseudo,
          score: userData.score || 0
        });
      }
    }
    
    if (demandesEnvoyees.length === 0) {
      listeDemandesEnvoyees.innerHTML = '<p class="message-vide">Aucune demande envoyée</p>';
      return;
    }
    
    listeDemandesEnvoyees.innerHTML = '';
    
    demandesEnvoyees.forEach(demande => {
      const carteHtml = `
        <div class="carte-joueur">
          <div class="info-joueur">
            <div class="pseudo">${demande.pseudo}</div>
            <div class="score">⭐ Score: ${demande.score} points</div>
          </div>
          <div class="actions-joueur">
            <button class="btn-annuler" onclick="annulerDemande('${demande.uid}')">❌ Annuler</button>
          </div>
        </div>
      `;
      
      listeDemandesEnvoyees.innerHTML += carteHtml;
    });
  } catch (error) {
    console.error("Erreur chargement demandes envoyées:", error);
  }
}

// Accepter une demande
async function accepterDemande(joueurUid) {
  try {
    // Récupérer les infos du joueur
    const joueurDoc = await db.collection('users').doc(joueurUid).get();
    const joueur = joueurDoc.data();
    
    // Ajouter l'ami dans les deux sens
    await db.collection('users').doc(utilisateurActuel.uid)
      .collection('amis').doc(joueurUid).set({
        pseudo: joueur.pseudo,
        date: new Date()
      });
    
    await db.collection('users').doc(joueurUid)
      .collection('amis').doc(utilisateurActuel.uid).set({
        pseudo: donneesUtilisateur.pseudo,
        date: new Date()
      });
    
    // Supprimer la demande
    await db.collection('users').doc(utilisateurActuel.uid)
      .collection('demandes_amis').doc(joueurUid).delete();
    
    afficherNotification(`✅ ${joueur.pseudo} est maintenant votre ami !`, 'success');
    chargerDemandesRecues();
    chargerAmis();
  } catch (error) {
    console.error("Erreur acceptation:", error);
    afficherNotification("❌ Erreur lors de l'acceptation", 'error');
  }
}

// Refuser une demande
async function refuserDemande(joueurUid) {
  try {
    await db.collection('users').doc(utilisateurActuel.uid)
      .collection('demandes_amis').doc(joueurUid).delete();
    
    afficherNotification("✅ Demande refusée", 'success');
    chargerDemandesRecues();
  } catch (error) {
    console.error("Erreur refus:", error);
    afficherNotification("❌ Erreur lors du refus", 'error');
  }
}

// Charger la liste d'amis
async function chargerAmis() {
  try {
    const snapshot = await db.collection('users').doc(utilisateurActuel.uid)
      .collection('amis').get();
    
    if (snapshot.empty) {
      listeAmis.innerHTML = '<p class="message-vide">Vous n\'avez pas encore d\'amis</p>';
      return;
    }
    
    listeAmis.innerHTML = '';
    
    for (const doc of snapshot.docs) {
      const ami = doc.data();
      const amiUid = doc.id;
      
      // Récupérer le score actuel de l'ami
      const amiDoc = await db.collection('users').doc(amiUid).get();
      const score = amiDoc.exists ? (amiDoc.data().score || 0) : 0;
      
      const carteHtml = `
        <div class="carte-joueur">
          <div class="info-joueur">
            <div class="pseudo">${ami.pseudo}</div>
            <div class="score">⭐ Score: ${score} points</div>
          </div>
          <div class="actions-joueur">
            <button class="btn-supprimer" onclick="supprimerAmi('${amiUid}', '${ami.pseudo}')">🗑️ Supprimer</button>
          </div>
        </div>
      `;
      
      listeAmis.innerHTML += carteHtml;
    }
  } catch (error) {
    console.error("Erreur chargement amis:", error);
  }
}

// Supprimer un ami
async function supprimerAmi(amiUid, pseudoAmi) {
  if (!confirm(`Voulez-vous vraiment supprimer ${pseudoAmi} de vos amis ?`)) {
    return;
  }
  
  try {
    // Supprimer dans les deux sens
    await db.collection('users').doc(utilisateurActuel.uid)
      .collection('amis').doc(amiUid).delete();
    
    await db.collection('users').doc(amiUid)
      .collection('amis').doc(utilisateurActuel.uid).delete();
    
    afficherNotification(`✅ ${pseudoAmi} a été retiré de vos amis`, 'success');
    chargerAmis();
  } catch (error) {
    console.error("Erreur suppression:", error);
    afficherNotification("❌ Erreur lors de la suppression", 'error');
  }
}

// Retour au jeu
retourJeu.addEventListener("click", () => {
  window.location.href = "index.html";
});
