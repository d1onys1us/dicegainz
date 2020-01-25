let workout_started = false;

// Definition of a Workout Log
class WorkoutLog {
    constructor(timestamp_start, timestamp_finish, list_of_exercises, notes) {
        this.timestamp_start = timestamp_start;
        this, timestamp_finish = timestamp_finish;
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
let t1x = null;
let t2x = null;
let t3x = null;

function choose_lifts() {
    t1x = t1[Math.floor(Math.random() * t1.length)];
    t2x = t2[Math.floor(Math.random() * t2.length)];
    t3x = t3[Math.floor(Math.random() * t3.length)];

    // Display results
    let exercises = document.getElementById('exercises');
    exercises.innerHTML = "";
    exercises.innerHTML += '<li class="list-group-item">' + t1x + '</li>' + '<li class="list-group-item">' + t2x + '</li>' + '<li class="list-group-item">' + t3x + '</li>';
}

function start_stop() {
    let start_stop_button = document.getElementById("start_stop");
    let start_time = null;
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
        let notes = document.getElementById('notes');
        let list_of_exercises = [t1x, t2x, t3x];

        // Log workout in database
        let new_workout_log = new WorkoutLog(start_time, end_time, list_of_exercises, notes);
        db.collection("logs").add(JSON.parse(JSON.stringify(new_workout_log))).then(() => {
            alert("Workout logged!");
            notes.value = ""; // clear text area for notes
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}

choose_lifts(); // call it to start

document.getElementById("roll").addEventListener("click", choose_lifts);
document.getElementById("start_stop").addEventListener("click", start_stop);