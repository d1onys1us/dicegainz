//T1: Bench Press @ 215 lbs for what RM

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

function choose_lifts() {
    let t1x = t1[Math.floor(Math.random() * t1.length)];
    let t2x = t2[Math.floor(Math.random() * t2.length)];
    let t3x = t3[Math.floor(Math.random() * t3.length)];

    // Display results
    let exercises = document.getElementById('exercises');
    exercises.innerHTML = "";
    exercises.innerHTML += '<li class="list-group-item">' + t1x + '</li>' + '<li class="list-group-item">' + t2x + '</li>' + '<li class="list-group-item">' + t3x + '</li>';
}

choose_lifts(); // call it to start

document.getElementById("roll").addEventListener("click", choose_lifts);