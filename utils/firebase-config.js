import { initializeApp } from "firebase/app";
import { 
  getAuth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDr31CG7Bs19FK6oberIjX3dMg97SLHPoQ",
  authDomain: "screenlist-ba6c7.firebaseapp.com",
  projectId: "screenlist",
  storageBucket: "screenlist.appspot.com",
  messagingSenderId: "358379048030",
  appId: "1:358379048030:web:ce8c670252646d56beb8cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);