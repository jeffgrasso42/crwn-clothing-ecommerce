import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBIZhNFhsnB77SP6K62sjYLIGZNgeV7si0',
  authDomain: 'crwn-clothing-db-2dbc4.firebaseapp.com',
  projectId: 'crwn-clothing-db-2dbc4',
  storageBucket: 'crwn-clothing-db-2dbc4.appspot.com',
  messagingSenderId: '305007850605',
  appId: '1:305007850605:web:4fd219db83625b0124bb64',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
