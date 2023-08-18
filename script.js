// Get references to the input box and list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCountElement = document.getElementById("task-count"); // Reference to the total task count element

// Function to add a new task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new list item (task) and add it to the list container
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Create a delete button and add it to the list item
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for '×' character
        li.appendChild(span);

        // Clear the input box after adding a task
        inputBox.value = "";
        
        // Save the updated task list to localStorage
        saveData();
        
        // Update the total task count
        updateTaskCount();
    }
}

// Event listener to handle clicks on the list container
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        // Toggle the 'checked' class to mark/unmark a task as completed
        e.target.classList.toggle("checked");
        
        // Save the updated task list to localStorage
        saveData();
    } else if (e.target.tagName === "SPAN") {
        // Remove the clicked task when the delete button is clicked
        e.target.parentElement.remove();
        
        // Save the updated task list to localStorage
        saveData();
        
        // Update the total task count
        updateTaskCount();
    }
}, false);

// Function to save the task list data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    
    // Update the total task count
    updateTaskCount();
}

// Function to display tasks from localStorage
function showTask() {
    // Retrieve task list data from localStorage and display it
    listContainer.innerHTML = localStorage.getItem("data");
    
    // Update the total task count
    updateTaskCount();
}

// Function to update the displayed total task count
function updateTaskCount() {
    const totalTasks = listContainer.querySelectorAll("li").length;
    taskCountElement.textContent = totalTasks;
}

// Display the tasks when the page loads or refreshes
showTask();