// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDZOgyRb3XhHbxXq5oRXBlt-EyG3fpW2ww',
  authDomain: 'dicegainz.firebaseapp.com',
  projectId: 'dicegainz'
});

// Initialize db
var db = firebase.firestore();
// Initialize login
var provider = new firebase.auth.GoogleAuthProvider();

function login() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    var user = result.user;
  }).catch(function (error) {
    console.log("error:", error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function logout() {
  firebase.auth().signOut().then(function () {
    console.log("signed out!")
  }, function (error) {
    // An error happened.
    console.log("logout error: ")
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById("displayname").innerHTML = "Hi " + user.displayName + "!";
    document.getElementById("login").innerHTML = "Logout";
    document.getElementById("login").removeEventListener("click", login);
    document.getElementById("login").addEventListener("click", logout);
  } else {
    document.getElementById("displayname").innerHTML = "";
    document.getElementById("login").innerHTML = "Login";
    document.getElementById("login").removeEventListener("click", logout);
    document.getElementById("login").addEventListener("click", login);
  }
  document.getElementById("login").style = "display=visible;"; // make button visible
});

// Add button listeners
document.getElementById("login").addEventListener("click", login);