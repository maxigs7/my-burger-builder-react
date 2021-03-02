import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

const init = () => {
  firebase.initializeApp(firebaseConfig);
};

export default init;
