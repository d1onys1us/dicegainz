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

let dic = {
  1: "Squat",
  2: "Bench",
  3: "Deadlift",
  4: "Press",
  5: "Front Squat",
  6: "Row",
  7: "Incline",
  8: "Pull up",
  9: "Chin up",
  10: "Dips",
}

function roll() {
  let ex = dic[Math.floor(Math.random() * 10) + 1]; // exercise from 1 to 10
  let rm = Math.floor(Math.random() * 8) + 3; // rep max from 0 to 3
  console.log("Exercise: " + ex);
  console.log("RM: " + rm);

  // Display results
  let exercises = document.getElementById('exercises');
  exercises.innerHTML += ex + " for RM " + rm + "<br>";
}

function clear() {
  let exercises = document.getElementById('exercises');
  exercises.innerHTML = "<b>Exercises:</b><br>";
}

function log() {
  let logtext = document.getElementById('logtext');

  db.collection("logs").add({
    date: new Date(),
    text: logtext.value
  })
    .then(function (docRef) {
      alert("Workout logged!");
      logtext.value = "";
      //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function login() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("user:", user);
    // ...
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

// Add button listeners
document.getElementById("roll").addEventListener("click", roll);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("log").addEventListener("click", log);
document.getElementById("login").addEventListener("click", login);