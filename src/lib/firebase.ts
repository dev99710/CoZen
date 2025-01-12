import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBiSv_cTr1IqafW1t7FhGlY49J-IBhh65k",
  authDomain: "workforceunite.firebaseapp.com",
  projectId: "workforceunite",
  storageBucket: "workforceunite.firebasestorage.app",
  messagingSenderId: "163003194336",
  appId: "1:163003194336:web:76d5e24e5656d0e8c12985",
  measurementId: "G-GK10X26ZKS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
