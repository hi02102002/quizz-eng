import { initializeApp } from 'firebase/app';
import {
   FacebookAuthProvider,
   getAuth,
   GithubAuthProvider,
   GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
   apiKey: 'AIzaSyBWBLu_Wk2BgQW0fa5wbtLnzBBlPqelgvQ',
   authDomain: 'quizz-eng.firebaseapp.com',
   databaseURL: 'https://quizz-eng-default-rtdb.firebaseio.com',
   projectId: 'quizz-eng',
   storageBucket: 'quizz-eng.appspot.com',
   messagingSenderId: '174671292233',
   appId: '1:174671292233:web:66cee594b1312c9632dc98',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
