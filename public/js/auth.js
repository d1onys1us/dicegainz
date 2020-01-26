//import * as ex from './exercise.js';

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

function show_profile() {
  clear_home();
}

function show_home() {
  let main = document.getElementById("main");
  main.innerHTML = '<br><h6><b>Today\'s Exercises:</b></h6><ul class="list-group"><div id="exercises"></div></ul><br><h6><b>Notes:</b></h6><textarea class="form-control" id="notes" rows="10"></textarea><br><button id="roll" type="button" class="btn btn-dark">Reroll</button>&nbsp;<button id="start_stop" type="button" class="btn btn-success">Start</button>';
  //ex.choose_lifts();
}

function clear_home() {
  let main = document.getElementById("main");
  main.innerHTML = "";
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById("displayname").innerHTML = "Hi " + user.displayName + "!";
    document.getElementById("login").innerHTML = "Logout";
    document.getElementById("login").removeEventListener("click", login);
    document.getElementById("login").addEventListener("click", logout);
    // Set profile link
    document.getElementById("profilelink").innerHTML = '<li class="nav-item active"><a id="profile" class="nav-link">Profile</a></li>';
    document.getElementById("profile").addEventListener("click", show_profile);
  } else {
    document.getElementById("displayname").innerHTML = "";
    document.getElementById("login").innerHTML = "Login";
    document.getElementById("login").removeEventListener("click", logout);
    document.getElementById("login").addEventListener("click", login);
    // Remove profile link
    document.getElementById("profilelink").innerHTML = "";
  }
  document.getElementById("login").style = "display=visible;"; // make button visible
});

show_home();
// Add button listeners
document.getElementById("login").addEventListener("click", login);
document.getElementById("home").addEventListener("click", show_home);