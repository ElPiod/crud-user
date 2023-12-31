import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { getFirestore} from "@firebase/firestore" // Correction ici

const firebaseConfig = {
  apiKey: "AIzaSyAJVoNq-1GmgAYepaAkSblr1q8SPLtzVwg",
  authDomain: "crud-user-892f9.firebaseapp.com",
  projectId: "crud-user-892f9",
  storageBucket: "crud-user-892f9.appspot.com",
  messagingSenderId: "127501040675",
  appId: "1:127501040675:web:894bdaa504e404155c4596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Correction ici
export const firestore = getFirestore(app)
