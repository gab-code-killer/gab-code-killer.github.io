// Configuration Firebase - NOUVEAU PROJET !
const firebaseConfig = {
  apiKey: "AIzaSyBCNSIA4Fem2MOa_mnEPzFXXNMU-fgNiCw",
  authDomain: "jeu-du-clicker-86f40.firebaseapp.com",
  projectId: "jeu-du-clicker-86f40",
  storageBucket: "jeu-du-clicker-86f40.firebasestorage.app",
  messagingSenderId: "1022147716223",
  appId: "1:1022147716223:web:67a2fb7547513232a0cb4a"
};

// Démarrer Firebase
firebase.initializeApp(firebaseConfig);

// Les outils Firebase qu'on va utiliser
const auth = firebase.auth();
const db = firebase.firestore();

console.log("🔥 Nouveau projet Firebase connecté !");