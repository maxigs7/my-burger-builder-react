import firebase from 'firebase/app';

const getToken = (user) => {
  return user.getIdTokenResult().then((result) => ({
    userId: user.uid,
    token: result.token,
    expirationTime: new Date(result.expirationTime),
  }));
};

const axios = {
  signIn: (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => getToken(userCredential.user)),
  signOut: () => firebase.auth().signOut(),
  signUp: (email, password) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        return getToken(userCredential.user);
      }),
};

export default axios;
