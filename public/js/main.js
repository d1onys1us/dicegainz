//import * as ex from './exercise.js';
let t1x = null;
let t2x = null;
let t3x = null;



let workout_started = false;

// Definition of a Workout Log
class WorkoutLog {
    constructor(timestamp_start, timestamp_finish, list_of_exercises, notes) {
        this.timestamp_start = timestamp_start;
        this.timestamp_finish = timestamp_finish;
        this.list_of_exercises = list_of_exercises;
        this.notes = notes;
    }
}

// Definition for an Exercise
class Exercise {
    constructor(name, num_sets, num_reps, rest_time_minutes) {
        this.name = name;
        this.num_sets = num_sets;
        this.num_reps = num_reps;
        this.rest_time_minutes = rest_time_minutes;
    }
}


let t1 = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Overhead Press",
    "Pullups",
]

let t2 = [
    "Front Squat",
    "Deadlift",
    "Close Grip Bench",
    "Pullups",
    "Overhead Press",
]

let t3 = [
    "Leg Press",
    "Leg Raises",
    "Planks",
    "Good Mornings",
    "Dips",
]

// List of exercises for this session:

function choose_lifts() {
    t1x = t1[Math.floor(Math.random() * t1.length)];
    t2x = t2[Math.floor(Math.random() * t2.length)];
    t3x = t3[Math.floor(Math.random() * t3.length)];

    // Display results
    let exercises = document.getElementById('exercises');
    exercises.innerHTML = "";
    exercises.innerHTML += '<li class="list-group-item">' + t1x + '</li>' + '<li class="list-group-item">' + t2x + '</li>' + '<li class="list-group-item">' + t3x + '</li>';
}

let start_time = null;
function start_stop() {
    let start_stop_button = document.getElementById("start_stop");
    if (start_stop_button.innerText == "Start") {
        // Start Clicked
        start_stop_button.innerText = "Stop";
        start_stop_button.className = "btn btn-danger";
        start_time = new Date();
    } else {
        // Stop Clicked -> log workout
        start_stop_button.innerText = "Start";
        start_stop_button.className = "btn btn-success";
        let end_time = new Date();
        let notes = document.getElementById('notes').value;
        let list_of_exercises = [t1x, t2x, t3x];

        // Log workout in database
        let new_workout_log = new WorkoutLog(start_time, end_time, list_of_exercises, notes);
        var user = firebase.auth().currentUser;

        db.collection("users").doc(user.email).collection("logs").doc(JSON.stringify(start_time)).set(JSON.parse(JSON.stringify(new_workout_log))).then(() => {
            alert("Workout logged!");
            notes.value = ""; // clear text area for notes
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}

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

var user_id = null;
function login() {
  let found = false;
  // Sign in with popup
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var user = result.user;
    // Check all users
    db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // If user found in database
        if (doc.data().email == user.email) {
          found = true;
          return;
        }
      });
      if (!found) {
        // Add new user with email as key
        db.collection("users").doc(user.email).set(JSON.parse(JSON.stringify(user))).then(() => {
          console.log("New user added!");
        }).catch((error) => {
          console.log("Error adding new user:", error);
        });
      }
    });
  }).catch(function (error) {
    console.log("login error:", error);
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
  let main = document.getElementById("main");
  main.innerHTML = '<br><h6><b>Previous Workouts:</b></h6><div id="logs"></div>';
  let logs = document.getElementById('logs');


  // get workout logs for user
  var user = firebase.auth().currentUser;
  db.collection("users").doc(user.email).collection("logs").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // For each 
      let log = doc.data();
      let time = log.timestamp_finish;
      let tt1 = log.list_of_exercises[0];
      let tt2 = log.list_of_exercises[1];
      let tt3 = log.list_of_exercises[2];
      
      logs.innerHTML += 'Time: ' + time + '<br>';
      logs.innerHTML += '<ul class="list-group">';
      logs.innerHTML += '<li class="list-group-item">' + tt1 + '</li>' + '<li class="list-group-item">' + tt2 + '</li>' + '<li class="list-group-item">' + tt3 + '</li>';
      logs.innerHTML += '</ul><br>';
    });
  });

  //exercises.innerHTML += '<li class="list-group-item">' + t1x + '</li>' + '<li class="list-group-item">' + t2x + '</li>' + '<li class="list-group-item">' + t3x + '</li>';
}

function show_home() {
  //clear_home
  let main = document.getElementById("main");
  main.innerHTML = '<br><h6><b>Today\'s Exercises:</b></h6><ul class="list-group"><div id="exercises"></div></ul><br><h6><b>Notes:</b></h6><textarea class="form-control" id="notes" rows="10"></textarea><br><button id="roll" type="button" class="btn btn-dark">Reroll</button>&nbsp;<button id="start_stop" type="button" class="btn btn-success">Start</button>';
  let exercises = document.getElementById('exercises');
  exercises.innerHTML += '<li class="list-group-item">' + t1x + '</li>' + '<li class="list-group-item">' + t2x + '</li>' + '<li class="list-group-item">' + t3x + '</li>';
  document.getElementById("roll").addEventListener("click", choose_lifts);
  document.getElementById("start_stop").addEventListener("click", start_stop);
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

choose_lifts();// call it to start
