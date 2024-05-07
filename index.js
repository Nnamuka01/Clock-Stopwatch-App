import "./style.css";

// console.log(document.querySelector("#clock"));
document.querySelector("#clock").innerHTML = `
<div class="card">
   <h1>Hello World!</h1>
   <div class="button-container">
   <button id="clockButton">Clock</button>
   <button id="timerButton">Stopwatch</button>
   </div>
   <div id="first-section">
   <h2>It is <span id="time">.</span></h2>
   <label for="timezone">Select Timezone</label>
   <select id="timezone">
      <option value="local">Local Time</option>  
      <option value="America/New_York">New York</option>
      <option value="Europe/London">London(GMT/BST)</option>
      <option value="Africa/Lagos">Lagos</option>
      <option value="Asia/Dubai">Dubai</option>
      <option value="America/Jamaica">Jamaica</option>
      <option value="Europe/Madrid">Madrid(CET)</option>
    </select>
   </div>
   <div id="second-section" style="display: none;">
      <div id="stopwatch">
      <h3 id="displayTime">00:00:00</h3>
      </div>
      <button id="startButton">Start</button>
      <button id="pauseButton">Pause</button>
      <button id="resetButton">Reset</button>
   </div>
</div>`;

function updateTime() {
  let selectedTimezone = document.getElementById("timezone").value;

  const presentTime = new Date();

  let options;

  if (selectedTimezone === "local") {
    options = {};
  } else {
    options = {
      timeZone: selectedTimezone,
      hour12: "true",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
  }

  let currentTime = presentTime.toLocaleTimeString("en-US", options);

  if (selectedTimezone === "Europe/London") {
    currentTime += " in London";
  }
  if (selectedTimezone === "America/New_York") {
    currentTime += " in New York";
  }
  if (selectedTimezone === "Africa/Lagos") {
    currentTime += " in Lagos";
  }
  if (selectedTimezone === "Asia/Dubai") {
    currentTime += " in Dubai";
  }
  if (selectedTimezone === "America/Jamaica") {
    currentTime += " in Jamaica";
  }
  if (selectedTimezone === "Europe/Madrid") {
    currentTime += " in Madrid";
  }
  document.getElementById("time").textContent = currentTime;
}

let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById("displayTime");
let timer;

function stopWatch() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

  // this adds 0 when the hr, ms, ss is less than 10
  let hr = hours < 10 ? "0" + hours : hours;
  let ms = minutes < 10 ? "0" + minutes : minutes;
  let ss = seconds < 10 ? "0" + seconds : seconds;

  displayTime.innerHTML = `${hr} : ${ms} : ${ss}`;
}

// this function handles the start functionality
function watchStart() {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(stopWatch, 1000);
}

// this function handles the pause functionality
function watchPause() {
  clearInterval(timer);
}

// this functionn handles the reset functionality
function watchReset() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  displayTime.innerHTML = "00:00:00";
}

// handles the clicking of the start btn
let start = document
  .getElementById("startButton")
  .addEventListener("click", watchStart);

// handles the clicking of the pause btn
let pause = document
  .getElementById("pauseButton")
  .addEventListener("click", watchPause);

// handles the clicking of the reset btn
let reset = document
  .getElementById("resetButton")
  .addEventListener("click", watchReset);

// handles the clicking of the clock btn
document.getElementById("clockButton").addEventListener("click", function () {
  document.getElementById("first-section").style.display = "block";

  document.getElementById("second-section").style.display = "none";
  // Add active class to clock button
  document.getElementById("clockButton").classList.add("active-button");
  // Remove active class from stopwatch button
  document.getElementById("timerButton").classList.remove("active-button");
});

// handles the clicking of the timer btn
document.getElementById("timerButton").addEventListener("click", function () {
  document.getElementById("first-section").style.display = "none";

  document.getElementById("second-section").style.display = "block";
  // Add active class to stopwatch button
  document.getElementById("timerButton").classList.add("active-button");
  // Remove active class from clock button
  document.getElementById("clockButton").classList.remove("active-button");
});

// handles the calling of the updateTime function
window.onload = function () {
  updateTime();
  setInterval(updateTime, 1000);
};
