document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const contentArea = document.getElementById('content-area');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior

      
       // Remove 'active' class from all links
       navLinks.forEach(nav => nav.classList.remove('active'));

       // Add 'active' class to clicked link
       this.classList.add('active');

       // Load the corresponding content
       const contentId = this.getAttribute('data-content');
       loadContent(contentId);
    });
  });

  function loadContent(contentId) {
    // Clear previous content
    contentArea.innerHTML = '';

    // Load content based on the contentId
    switch (contentId) {
      case 'dashboard':
        loadDashboard();
        break;
        case 'task management':
                loadTaskManagement();
                break;
      case 'reminders':
        loadReminders();
        break;
      case 'youtube':
        loadYouTubeSearch();
        break;
      case 'ai-assistant':
        loadAiAssistant();
        break;
     
      
      case 'papers':
        loadPaper();
        break;
    }
  }

  // function for dashboard

  function loadDashboard() {
    contentArea.innerHTML = `
     <div id="task-container" style=" height: 93.3vh; max-height: 300vh; padding: 20px; 
        text-align: center; padding-bottom: 20px; color: white; font-family: Arial, sans-serif;background-color: #d4f1ea;">
        <h1 style="color:black; padding-top:30px; font-family:Merriweather; font-size:50px;">Welcome to your dashboard!!!!!</h1>
        <img src="dashboardlogo.jpg" alt="Dashboard Image" style=" width: 50vw; /* 50% of the viewport width */
    height: 50vh; /* 50% of the viewport height */
    object-fit: cover; /* Ensures the image covers the area without distortion */
    display: block; /* Prevents inline spacing issues */
    margin: 20px auto; /* Centers the image horizontally */
    border-radius: 10px;  box-shadow: 10px 10px 20px black; /* Red shadow */">
    <p style="color:black; padding-top:50px; font-family:Caveat;">The expert in anything was once a beginner</p>
    </div>
    `;
}function handleLogout() {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    window.location.href = "login.html"; // Redirect to login page

    // Prevent going back to dashboard using the browser back button
    setTimeout(() => {
        window.history.pushState(null, null, window.location.href);
    }, 0);
}

// Check login status when the page loads
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        loadDashboard(); // Load dashboard if logged in
    } else {
        window.location.href = "login.html"; // Redirect to login if not logged in
    }
});




  //function for Task Mangement

  function loadTaskManagement() {
    contentArea.innerHTML = `
       
    <div class="containers " style=" display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 120px auto 0 auto;
    max-width: 500px;">
        <div class="stats-conatiner">
            <div class="details">
                <h1>Task Management</h1>
                <p>Keep it up!</p>
                <div id="progressBar">
                    <div id="progress"></div>
                </div>
            </div>
            <div class="stats-numbers">
                <p id="numbers">0/0</p>
            </div>
        </div>

        <form action="">
            <input id="taskInput" type="text " placeholder=" Write your Task..." style="flex: 1;padding: 16px;border: 1px solid var(--purple);border-radius: 10px;outline: none;
    color: black;    margin-top: 5%;">
            <button id="newTask" type="submit" style="width: 50px;height: 50px;border-radius: 50%;display: flex;align-items: center;
justify-content: center;background-color: var(--purple);color: var(--text);font-size: 30px;font-weight: bold;outline: none;    margin-top: 5%;">+</button>
        </form>
        <ul id="task-list"></ul>
    </div>
    
 
        
    `;
  
  
  document.addEventListener("DOMContentLoaded",() => {
    const storedTasks = JSON.parse(localStorage.getItem ('tasks'))

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task))
        updateTasksList();
        updateStats();
    }
})




let tasks = [];


const saveTasks = ()=> {
    localStorage.setItem('tasks',JSON.stringify(tasks))
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();


    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();

}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1)
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress =  totalTasks === 0 ? 0 :  (completedTasks / totalTasks) * 100 ;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;


    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if (tasks.length && completedTasks === totalTasks){
        blastConfetti();
    }

};



const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" class="edit-task" data-index="${index}" />
                    <img src="bin.png" class="delete-task" data-index="${index}" />
                </div>
            </div>
        `;

        taskList.appendChild(listItem);

        // Attach event listeners properly
        listItem.querySelector(".edit-task").addEventListener("click", function () {
            editTask(index);
        });

        listItem.querySelector(".delete-task").addEventListener("click", function () {
            deleteTask(index);
        });

        listItem.querySelector(".checkbox").addEventListener("change", function () {
            toggleTaskComplete(index);
        });
    });
};



document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();


    addTask();
});


const blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
}



// function for Reminder

  function loadReminders() {
    contentArea.innerHTML = `

     <div class="clock">
        <h1>
            REMINDER
        </h1>
        <h3>
            A Friendly Reminder!
        </h3>
        <div class="time" id="time">
            00:00:00
        </div>
        <div class="input-row">
            <div class="input-field">
                <label for="alarmDate" style="color: rgb(0, 0, 0);">
                    Select Date🗓️:
                </label>
                <input type="date" id="alarmDate" class="alarm-input" min="">
            </div>
            <div class="input-field">
                <label for="alarmTime" style="color: rgb(0, 0, 0);">
                    Select Time⌛:
                </label>
                <input type="time" id="alarmTime" class="alarm-input">
                <label for="audioFile" style="color: rgb(0, 0, 0);">
                    Select Audio🎶: </label>
                <label for="alarmAudio" class="custom-file-label"> Audio</label>
                <input type="file" id="alarmAudio" accept="audio/*">
            </div>


            <button id="setAlarm">
                Set Alarm
            </button>
        </div>
        <div class="alarms" id="alarms">
        </div>
    </div>
    
    `;
    let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let tInput = document.getElementById("alarmTime");
let audioInput = document.getElementById("alarmAudio");
let btn = document.getElementById("setAlarm");
let contan = document.getElementById("alarms");
let interVal;
let maxValue = 3;
let cnt = 0;
let almTimesArray = [];
let selectedAudio = null;
let alarmAudio = new Audio(); // Preload the audio to bypass autoplay restrictions

// Update time every second
function timeChangeFunction() {
    let curr = new Date();
    let hrs = curr.getHours();
    let min = String(curr.getMinutes()).padStart(2, "0");
    let sec = String(curr.getSeconds()).padStart(2, "0");
    let period = "AM";
    if (hrs >= 12) {
        period = "PM";
        if (hrs > 12) {
            hrs -= 12;
        }
    }
    hrs = String(hrs).padStart(2, "0");
    time.textContent = `${hrs}:${min}:${sec} ${period}`;
}

// Handle audio file selection
audioInput.addEventListener("change", function () {
    if (this.files.length > 0) {
        selectedAudio = URL.createObjectURL(this.files[0]);
        alarmAudio.src = selectedAudio;
        alarmAudio.load();
    }
});

// Set alarm function
function alarmSetFunction() {
    let now = new Date();
    let selectedDate = new Date(dateInput.value + "T" + tInput.value);

    if (selectedDate <= now) {
        alert(`Invalid time. Please select a future date and time.`);
        return;
    }

    if (almTimesArray.includes(selectedDate.toString())) {
        alert(`You cannot set multiple alarms for the same time.`);
        return;
    }

    if (!selectedAudio) {
        alert("Please select an alarm sound!");
        return;
    }

    if (cnt < maxValue) {
        let timeUntilAlarm = selectedDate - now;
        let alarmDiv = document.createElement("div");
        alarmDiv.classList.add("alarm");
        alarmDiv.innerHTML = `
            <span>${selectedDate.toLocaleString()}</span>
            <button class="delete-alarm">Delete</button>
        `;

        alarmDiv.querySelector(".delete-alarm").addEventListener("click", () => {
            alarmDiv.remove();
            cnt--;
            clearTimeout(interVal);
            const idx = almTimesArray.indexOf(selectedDate.toString());
            if (idx !== -1) {
                almTimesArray.splice(idx, 1);
            }
        });

        // Preload audio in a muted state to bypass autoplay restrictions
        alarmAudio.muted = true;
        alarmAudio.play().then(() => {
            console.log("Audio preloaded successfully.");
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
            alarmAudio.muted = false;
        }).catch(error => {
            console.log("Autoplay blocked during preload:", error);
        });

        // Trigger alarm at the set time
        interVal = setTimeout(() => {
            if (selectedAudio) {
                alarmAudio.loop = true; // Keep playing until user stops it
                alarmAudio.volume = 1.0; // Ensure full volume
                alarmAudio.play().catch(error => {
                    console.log("Error playing alarm sound:", error);
                });
            }

            alert("⏰ HEY ITS TIME!!!!!!!");

            // Stop the audio when the alert is dismissed
            if (alarmAudio) {
                alarmAudio.pause();
                alarmAudio.currentTime = 0;
            }

            alarmDiv.remove();
            cnt--;
            const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
            if (alarmIndex !== -1) {
                almTimesArray.splice(alarmIndex, 1);
            }
        }, timeUntilAlarm);

        contan.appendChild(alarmDiv);
        cnt++;
        almTimesArray.push(selectedDate.toString());
    } else {
        alert("You can only set a maximum of 3 alarms.");
    }
}

setInterval(timeChangeFunction, 1000);
btn.addEventListener("click", alarmSetFunction);
timeChangeFunction();

  }
let alarmAudio = new Audio();
let selectedAudio = null;
let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

function checkAlarms() {
    let now = new Date().getTime();
    alarms = JSON.parse(localStorage.getItem("alarms")) || [];
    
    alarms.forEach((alarm, index) => {
        let alarmTime = new Date(alarm.time).getTime();
        if (now >= alarmTime) {
            // Play alarm sound
            if (alarm.audio) {
                alarmAudio.src = alarm.audio;
                alarmAudio.loop = true;
                alarmAudio.play();
            }

            // Alert the user
            alert("⏰ HEY, IT'S TIME FOR YOUR REMINDER!");

            // Remove the triggered alarm
            alarms.splice(index, 1);
            localStorage.setItem("alarms", JSON.stringify(alarms));
        }
    });
}

// Check alarms every second in the background
setInterval(checkAlarms, 1000);

// Listen for tab visibility changes
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        checkAlarms();
    }
});

// Modify alarmSetFunction to store alarms persistently
function alarmSetFunction() {
    let selectedDate = new Date(dateInput.value + "T" + tInput.value);

    if (selectedDate <= new Date()) {
        alert("Invalid time. Please select a future date and time.");
        return;
    }

    if (!selectedAudio) {
        alert("Please select an alarm sound!");
        return;
    }

    alarms.push({ time: selectedDate.toISOString(), audio: selectedAudio });
    localStorage.setItem("alarms", JSON.stringify(alarms));

    alert("Alarm set successfully!");
}


  // function for Search Engine

  function loadYouTubeSearch() {
    contentArea.innerHTML = `
    <div id="task-container" style=" height: 93.3vh; max-height: 300vh; padding: 20px; 
        text-align: center; padding-bottom: 20px; color: white; font-family: Arial, sans-serif;">
        
        <h2 style="font-size: 30px;color:black;">Search Engine</h2><br>

        <input type="text" id="search-input" placeholder="Enter your search..." 
            style="padding: 10px; width: 50%; border-radius: 5px; border:2px solid; font-size: 16px;">
        <br><br>

        <button id="youtube-btn" 
            style="padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Search YouTube
        </button>

        <button id="google-btn"  
            style="padding: 10px 20px; background-color: #34a853; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Search Google
        </button>

        <div id="history-container" style="display: none; margin-top: 20px;">
            <h3 style="color: black;">Search History</h3>
            <div id="history" style="background: white; padding: 10px; border-radius: 10px; color: white; width: 50%; margin: auto;
             display: flex;flex-direction: column;gap: 10px; margin-top: 30px;width: 50%;list-style: none;padding: 0;border-radius: 10px;
             /* ✅ Ensure a fixed height so overflow works */ max-height: 410px; /* Adjust as needed */overflow-y: auto; /* Enables scrolling */scrollbar-width: none;"></div>
        </div>

    </div>
    `;

    document.getElementById("youtube-btn").addEventListener("click", () => search("YouTube"));
    document.getElementById("google-btn").addEventListener("click", () => search("Google"));

    displayHistory();
}

function search(platform) {
  let searchInput = document.getElementById('search-input');
  let query = searchInput.value.trim();
  
  if (!query) {
      alert("Please enter a search term!");
      return;
  }

  saveToHistory(query, platform);
  
  let url = platform === "YouTube"
      ? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
      : `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  window.open(url, "_blank");

  // **Clear input field after search**
  searchInput.value = "";
}


function saveToHistory(query, platform) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let entry = { query, platform }; // Store query and platform
    history.unshift(entry); // Add new search at the beginning
    if (history.length > 10) history.pop(); // Keep only the latest 10 searches
    localStorage.setItem("searchHistory", JSON.stringify(history));
    displayHistory();
}

function deleteHistoryItem(index) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history.splice(index, 1);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let historyDiv = document.getElementById("history");
    let historyContainer = document.getElementById("history-container");

    if (history.length === 0) {
        historyContainer.style.display = "none";
        return;
    }

    historyContainer.style.display = "block";
    historyDiv.innerHTML = "";

    history.forEach((item, index) => {
        let historyItem = document.createElement("div");
        historyItem.style.display = "flex";
        historyItem.style.alignItems = "center";
        historyItem.style.justifyContent = "space-between";
        historyItem.style.padding = "5px 10px";
        historyItem.style.cursor = "pointer";
        historyItem.style.background = "var(--secondaryBackground)";
        historyItem.style.borderRadius = "5px";
        historyItem.style.margin = "5px";

        let icon = item.platform === "YouTube" ? "📺" : "🌍"; // YouTube (📺) or Google (🌍)
        let textSpan = document.createElement("span");
        textSpan.textContent = `${icon} ${item.query}`;
        textSpan.style.flex = "1";
        textSpan.onclick = function () {
            document.getElementById("search-input").value = item.query;
            search(item.platform);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.style.background = "transparent";
        deleteButton.style.border = "none";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.fontSize = "16px";
        deleteButton.onclick = function () {
            deleteHistoryItem(index);
        };

        historyItem.appendChild(textSpan);
        historyItem.appendChild(deleteButton);
        historyDiv.appendChild(historyItem);
    });
}

 // function for AI Assistant

 function loadAiAssistant() {
  contentArea.innerHTML = `
          <div class="chatbot-popup">
        <!-- chatbot header -->
        <div class="chat-header">
            <div class="header-info">
                <svg class="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                    viewBox="0 0 1024 1024">
                    <path
                        d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                    </path>
                </svg>
                <h2 class="logo-text">Chatbot</h2>
            </div>
            <button id="close-chatbot" class="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        <!-- chatbot body -->
        <div class="chat-body">
            <div class="message bot-message">
                <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                    viewBox="0 0 1024 1024">
                    <path
                        d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                    </path>
                </svg>
                <div class="message-text">Hey there! 👋 <br /> How can I Help you today?</div>
            </div>

            <!-- <div class="message user-message">
                <div class="message-text"> Lorem ipsum dolor sit am consec tetur
                    adipisicing. </div>
            </div>

            <div class="message bot-message thinking">
                <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                    viewBox="0 0 1024 1024">
                    <path
                        d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                    </path>
                </svg>
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div> -->
        </div>

        <!-- chatbot footer -->
        <!-- <div class="chat-container"> -->

        <div class="chat-footer">

            <form action="#" class="chat-form">
                <textarea placeholder="message..." class="message-input" required></textarea>

                <div class="chat-controls">

                    <button type="button" id="emoji-picker" class="material-symbols-rounded">sentiment_satisfied</button>
                    <div class="file-upload-wrapper">
                        <input type="file" accept="images/*" id="file-input" hidden>
                        <img src="#">
                        <button type="button"  id="file-upload"  class="material-symbols-rounded">attach_file</button>
                        <button type="button"  id="file-cancel"  class="material-symbols-rounded">close</button>
                    </div>
                   
                    <button type="submit" id="send-message" class="material-symbols-rounded">arrow_upward</button>
                </div>

            </form>

        </div>
    </div>


    <!--linking emoji mart script for emoji picker-->
    <script src="https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js"></script>
   
  `;
  const chatBody = document.querySelector(".chat-body");
  const messageInput = document.querySelector(".message-input");
  const sendMessageButton = document.querySelector("#send-message");
  const fileInput = document.querySelector("#file-input");
  const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
  const fileCancelButton = document.querySelector("#file-cancel");
  
  
  
  //API setup
  const API_KEY = "AIzaSyDmHz4UhU1nzyfLYhUzV-4fIsEwUuY6lqg"
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`
  
  const userData = {
      message: null,
      file: {
          data: null,
          mime_type: null
      }
  }
  
  
  const chatHistory = [];
  const initialInputHeight = messageInput.scrollHeight;
  
  
  //create message element with dynamic classess and return it
  const createMessageElement = (content, ...classes) => {
      const div = document.createElement("div");
      div.classList.add("message", ...classes);
      div.innerHTML = content;
      return div;
  }
  
  //generate bot response using API
  const generateBotResponse = async (incomingMessageDiv) => {
      const messageElement = incomingMessageDiv.querySelector(".message-text");
      //add user message to chat history
      chatHistory.push({
          role: "user",
          parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] :
              [])]
      });
  
      //API request options
      const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              contents: chatHistory
          })
      }
  
  
      try {
          //fetch bot response from API
          const response = await fetch(API_URL, requestOptions);
          const data = await response.json();
          if (!response.ok) throw new Error(data.error.message);
  
          //Extract and display bots response text
          const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
          messageElement.innerText = apiResponseText;
  
          //add bot response to chat history
          chatHistory.push({
              role: "model",
              parts: [{ text: apiResponseText }]
          });
      } catch (error) {
          //handle error in api response
          console.log(error);
          messageElement.innerText = error.message;
          messageElement.style.color = "#ff0000";
      } finally {
          //reser users file data,removing thinking indicator and scroll chat to bottom
          userData.file = {};
          incomingMessageDiv.classList.remove("thinking");
          chatBody.scrollTo({ top: chatBody.scrollHeight, behaviour: "smooth" });
      }
  }
  
  //handle outgoing user message
  const handleOutgoingMessage = (e) => {
      e.preventDefault();
      userData.message = messageInput.value.trim();
      messageInput.value = "";
      fileUploadWrapper.classList.remove("file-uploaded");
      messageInput.dispatchEvent(new Event("input"));
  
  
  
  
      //create and display user message
      // const messageContent = `<div class="message-text"></div>
      //                         ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,$
      //                             {userData.file.data}"  />` : ""}`;
  
      const messageContent = `<div class="message-text"></div>
                          ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachments" />` : ""}`;
  
  
  
  
      const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
      outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
      chatBody.appendChild(outgoingMessageDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behaviour: "smooth" });
  
  
      //simulate bot response with thinking indicator after a delay
      setTimeout(() => {
          const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                      viewBox="0 0 1024 1024">
                      <path
                          d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                      </path>
                  </svg>
                  <div class="message-text">
                      <div class="thinking-indicator">
                          <div class="dot"></div>
                          <div class="dot"></div>
                          <div class="dot"></div>
                      </div>
                  </div>`;
  
          const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
          chatBody.appendChild(incomingMessageDiv);
          chatBody.scrollTo({ top: chatBody.scrollHeight, behaviour: "smooth" });
          generateBotResponse(incomingMessageDiv);
      }, 600);
  }
  
  //Handle enter key press for sending messages
  
  messageInput.addEventListener("keydown", (e) => {
      const userMessage = e.target.value.trim();
      if (e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768) {
          handleOutgoingMessage(e);
      }
  });
  
  // Adjust input field height dynamically
  messageInput.addEventListener("input", () => {
      messageInput.style.height = `${initialInputHeight}px`;
      messageInput.style.height = `${messageInput.scrollHeight}px`;
      document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight >
          initialInputHeight ? "15px" : "32px";
  });
  
  //Handle file input change and preview the selected file or image
  fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
          fileUploadWrapper.querySelector("img").src = e.target.result;
          fileUploadWrapper.classList.add("file-uploaded");
          const base64String = e.target.result.split(",")[1];
  
          //store file data in userdata
          userData.file = {
              data: base64String,
              mime_type: file.type
          }
  
          fileInput.value = "";
      }
      reader.readAsDataURL(file);
  });
  
  //cancel file upload
  fileCancelButton.addEventListener("click", () => {
      userData.file = {};
      fileUploadWrapper.classList.remove("file-uploaded");
  })
  
  //initialize emoji picker and handle emoji selection
  const picker = new EmojiMart.Picker({
      theme: "light",
      skinTonePosition: "none",
      previousPosition: "none",
      onEmojiSelect: (emoji) => {
          const { selectionStart: start, selectionEnd: end } = messageInput;
          messageInput.setRangeText(emoji.native, start, end, "end");
          messageInput.focus();
      },
  
  
  
  
  
      onClickOutside: (e) => {
          if (e.target.id === "emoji-picker") {
              document.body.classList.toggle("show-emoji-picker");
          } else {
              document.body.classList.remove("show-emoji-picker");
          }
      }
  });
  
  document.querySelector(".chat-form").appendChild(picker);
  
  
  sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e))
  document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());

 }


 

function loadPaper() {
    contentArea.innerHTML = `
      <div id="task-container" style="display: flex; justify-content: center; align-items: flex-start; 
      height: 100vh; padding: 20px; color: white; font-family: Arial, sans-serif; gap: 20px;">
      <h1 style="color:black">B.Tech:</h1>
  
        <!-- Left Side: Question Papers -->
        <div id="paper" style="flex: 1;  padding: 20px; border-radius: 10px;">
          <p style="font-size:25px;color:black;">Choose Branch For Previous Question Papers:</p>
     
    <p style="font-size:20px;padding-top:20px;padding-left:95px;">
        <a href="cse.html" style="color:var(--secondaryBackground);">Computer Science Engineering</a>
    </p> 
      <p style="font-size:20px;padding-top:20px;padding-left:95px;color:white;"><a href="cse(AI&ML).html" style="color:var(--secondaryBackground);">Computer Science Engineering(AI&ML)</a></p> 
      <p style="font-size:20px;padding-top:20px;padding-left:95px;"><a href="cse(DS).html" style="color:var(--secondaryBackground);">Computer Science Engineering(Data Science)</a></p> 
      <p style="font-size:20px;padding-top:20px;padding-left:95px;"><a href="CSE(CS).html" style="color:var(--secondaryBackground);">Computer Science Engineering(cyber security)</a></p> 
      <p style="font-size:20px;padding-top:20px;padding-left:95px;"><a href="CE.html" style="color:var(--secondaryBackground);">Civil Engineering</a></p> 
      <p style="font-size:20px;padding-top:20px;padding-left:95px;;"><a href="ME.html" style="color:var(--secondaryBackground);">Mechanical Engineering</a></p> 
      <p style="font-size:20px;padding-top:20px;padding-left:95px;"><a href="EEE.html" style="color:var(--secondaryBackground);;">Electrical and Electronics Engineering </a></p> 
      <p style="font-size:20px;padding-top:20px;padding-left:95px;"><a href="ECE.html" style="color:var(--secondaryBackground);"> Electronics and Communication Engineering</a></p> 

        </div>

      </div>
    `;
  }
  
});