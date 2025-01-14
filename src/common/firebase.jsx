import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDKGEt5AhLbpvNpmKca3Iio4HLtnMHUgKw",
    authDomain: "vessel-afc92.firebaseapp.com",
    projectId: "vessel-afc92",
    storageBucket: "vessel-afc92.firebasestorage.app",
    messagingSenderId: "829276152352",
    appId: "1:829276152352:web:31c0d3dfed9cf511551245"
  };
  

const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;
}