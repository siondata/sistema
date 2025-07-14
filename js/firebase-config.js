import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
      apiKey: "AIzaSyCr0SM_u0c4aEG_tT_CXWLcvd6alZJT44c",
      authDomain: "siondata22.firebaseapp.com",
      projectId: "siondata22",
      storageBucket: "siondata22.appspot.com",
      messagingSenderId: "946379205241",
      appId: "1:946379205241:web:0fe04a6246518451ee42a8",
      measurementId: "G-EX6YDJYS1N"
    };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
