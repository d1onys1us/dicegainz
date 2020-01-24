// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDZOgyRb3XhHbxXq5oRXBlt-EyG3fpW2ww',
  authDomain: 'dicegainz.firebaseapp.com',
  projectId: 'dicegainz'
});

var db = firebase.firestore();

db.collection("users").add({
  first: "Alan",
  middle: "Mathison",
  last: "Turing",
  born: 1912
})
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  });


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

// Add button listeners
document.getElementById("roll").addEventListener("click", roll);
document.getElementById("clear").addEventListener("click", clear);