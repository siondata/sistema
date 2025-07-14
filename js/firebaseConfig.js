import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyCr0SM_u0c4aEG_tT_CXWLcvd6alZJT44c",
  authDomain: "siondata22.firebaseapp.com",
  projectId: "siondata22",
  storageBucket: "siondata22.appspot.com",
  messagingSenderId: "946379205241",
  appId: "1:946379205241:web:0fe04a6246518451ee42a8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
