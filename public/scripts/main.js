// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDZOgyRb3XhHbxXq5oRXBlt-EyG3fpW2ww',
  authDomain: 'dicegainz.firebaseapp.com',
  projectId: 'dicegainz'
});

// Initialize db
var db = firebase.firestore();

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
  let logtext = document.getElementById('logtext').value;

  db.collection("logs").add({
    date: new Date(),
    text: logtext
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

// Add button listeners
document.getElementById("roll").addEventListener("click", roll);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("log").addEventListener("click", log);