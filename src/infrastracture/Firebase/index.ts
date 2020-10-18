import firebase from "firebase/app";
import { firebaseConfig } from "./config";
import "firebase/auth";
import "firebase/firestore";

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const fireStore = firebaseApp.firestore();
