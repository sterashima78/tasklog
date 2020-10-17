import firebase from "firebase/app";
import { firebaseConfig } from "./config";
import "firebase/auth";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
