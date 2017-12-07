import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAOhx5w3jUIg4BX0Gf21dfyMpNLYRTj5Ws",
    authDomain: "fir-auth-bac48.firebaseapp.com",
    databaseURL: "https://fir-auth-bac48.firebaseio.com",
    projectId: "fir-auth-bac48",
    storageBucket: "fir-auth-bac48.appspot.com",
    messagingSenderId: "716315503139"
  };

  firebase.initializeApp(config);

  export default firebase;


