// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // For Firestore
// import { getDatabase } from "firebase/database"; // For Realtime DB
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  //   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // For Realtime DB
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

// Realtime DB instance (if using Realtime DB)
// const db = getDatabase(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Check Firestore connection by reading a sample document
async function checkFirestoreConnection() {
  try {
    // Reference to a sample document
    const docRef = doc(db, "users", "sampleUser"); // Update "users" and "sampleUser" as per your collection and document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Connected to Firestore!");
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
  }
}

// Call the function to test the connection
checkFirestoreConnection();
export { db, auth, googleProvider };
