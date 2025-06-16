// Ensure the JavaScript code runs only after the entire HTML document has been loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements using their IDs
    const addButton = document.getElementById('add-task-btn'); // The "Add Task" button
    const taskInput = document.getElementById('task-input');   // The input field for new tasks
    const taskList = document.getElementById('task-list');     // The unordered list where tasks are displayed

    /**
     * @function addTask
     * @description Adds a new task to the to-do list.
     * It retrieves text from the input field, creates a new list item,
     * adds a remove button, and appends it to the task list.
     */
    const addTask = () => {
        // Get the value from the task input field and remove leading/trailing whitespace
        const taskText = taskInput.value.trim();

        // Check if the task text is empty
        if (taskText === "") {
            // If empty, alert the user to enter a task (as per prompt instruction)
            alert("Please enter a task!");
            return; // Exit the function if the input is empty
        }

        // Create a new list item (<li>) element for the task
        const listItem = document.createElement('li');
        // Set the text content of the list item to the task text
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        // Set the text content of the remove button
        removeButton.textContent = "Remove";
        // Add a class name to the remove button for styling
        removeButton.className = 'remove-btn';

        // Attach an 'onclick' event listener to the remove button
        // When clicked, it will remove its parent element (the <li>) from the task list
        removeButton.onclick = () => {
            taskList.removeChild(listItem); // Remove the listItem from the taskList
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        // Append the newly created list item (with its remove button) to the task list
        taskList.appendChild(listItem);

        // Clear the input field after adding the task, ready for the next entry
        taskInput.value = "";
    };

    // Attach an event listener to the "Add Task" button
    // When the button is clicked, the addTask function will be called
    addButton.addEventListener('click', addTask);

    // Attach an event listener to the task input field for the 'keypress' event
    // This allows users to add a task by pressing the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            // If 'Enter' is pressed, call the addTask function
            addTask();
        }
    });

    // Note: The prompt also states "Invoke the addTask function on DOMContentLoaded."
    // and "Set the callback function to invoke addTask." However,
    // directly invoking addTask here would result in an empty task alert on page load.
    // The current setup ensures the *event listeners* are ready on DOMContentLoaded,
    // allowing the user to interact with the app.
});