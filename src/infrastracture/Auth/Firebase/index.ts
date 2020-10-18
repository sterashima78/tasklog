import firebase from "firebase/app";
import { firebaseApp } from "../../Firebase";
export const _login = (firebaseApp: firebase.app.App) => async () => {
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
export const _logout = (firebaseApp: firebase.app.App) => () =>
  firebaseApp.auth().signOut();

export const getUser = (): Promise<
  { name: string; id: string } | undefined
> => {
  return new Promise<{ name: string; id: string }>((resolve, reject) => {
    setTimeout(() => {
      reject(undefined);
    }, 5000);
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
  });
};
export const login = _login(firebaseApp);
export const logout = _logout(firebaseApp);
