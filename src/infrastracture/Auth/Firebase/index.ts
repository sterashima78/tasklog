import firebase from "firebase/app";
import { firebaseApp } from "../../Firebase";
import { GetUser, Login, Logout } from "/@/domain/Auth/index";
export const _login = (firebaseApp: firebase.app.App): Login => async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await firebaseApp.auth().signInWithPopup(provider);
    return userCredential.user === null
      ? undefined
      : {
          name: userCredential.user.displayName || "",
          id: userCredential.user.uid,
        };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export const _logout = (firebaseApp: firebase.app.App): Logout => () =>
  firebaseApp.auth().signOut();

export const getUser: GetUser = () =>
  new Promise((resolve, reject) => {
    const unWatch = firebaseApp.auth().onAuthStateChanged((user) => {
      unWatch();
      if (user) {
        resolve({
          name: user.displayName || "",
          id: user.uid,
        });
      } else {
        reject(undefined);
      }
    });
    setTimeout(() => {
      unWatch();
      reject(undefined);
    }, 5000);
  });

export const login = _login(firebaseApp);
export const logout = _logout(firebaseApp);
