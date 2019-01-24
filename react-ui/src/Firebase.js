import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyB_LAgGZWHFjlir1mdB1VM-2lMVfT4Q3-Q",
    authDomain: "examensarbete-541ff.firebaseapp.com",
    databaseURL: "https://examensarbete-541ff.firebaseio.com",
    projectId: "examensarbete-541ff",
    storageBucket: "examensarbete-541ff.appspot.com",
    messagingSenderId: "318952392275"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('posts/');
export const auth = firebase.auth();
