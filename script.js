// Ensure the JavaScript code runs only after the entire HTML document has been loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements using their IDs
    const addButton = document.getElementById('add-task-btn'); // The "Add Task" button
    const taskInput = document.getElementById('task-input');   // The input field for new tasks
    const taskList = document.getElementById('task-list');     // The unordered list where tasks are displayed

    /**
     * @function addTask
     * @description Adds a new task to the to-do list, both to the DOM and optionally to Local Storage.
     * @param {string} taskText - The text content of the task to be added.
     * @param {boolean} [save=true] - A flag indicating whether to save the task to Local Storage.
     * Set to `false` when loading tasks from Local Storage to prevent re-saving.
     */
    const addTask = (taskText, save = true) => {
        // Validate taskText (this check is primary when directly called by user input)
        if (taskText === "") {
            // This alert will typically be triggered by the event listener if input is empty
            alert("Please enter a task!");
            return;
        }

        // Create a new list item (<li>) element for the task
        const listItem = document.createElement('li');
        // Set the text content of the list item to the task text
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        // Set the text content of the remove button
        removeButton.textContent = "Remove";
        // Add a class name to the remove button for styling using classList.add
        removeButton.classList.add('remove-btn');

        // Attach an 'onclick' event listener to the remove button
        // When clicked, it will remove its parent element (the <li>) from the task list
        // and also update Local Storage.
        removeButton.onclick = () => {
            // Remove the listItem from the DOM
            taskList.removeChild(listItem);

            // Retrieve current tasks from Local Storage
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Find the index of the specific task text to be removed.
            // Using `indexOf` and `splice` ensures only one instance is removed,
            // which is safer than filtering if duplicate task texts are allowed.
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1); // Remove 1 element at the found index
            }
            // Save the updated tasks array back to Local Storage
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        // Append the newly created list item (with its remove button) to the task list
        taskList.appendChild(listItem);

        // If 'save' flag is true (meaning this is a new task added by the user),
        // update Local Storage.
        if (save) {
            // Retrieve current tasks from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Add the new task text to the array
            storedTasks.push(taskText);
            // Save the updated tasks array back to Local Storage
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    };

    /**
     * @function loadTasks
     * @description Loads tasks from Local Storage and populates the To-Do list on the page.
     */
    const loadTasks = () => {
        // Retrieve tasks from Local Storage, parsing from JSON.
        // If no tasks are found, default to an empty array.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Iterate over each stored task and add it to the DOM.
        // Pass `false` for the `save` parameter to prevent these tasks from being
        // re-saved to Local Storage during the loading process.
        storedTasks.forEach(taskText => addTask(taskText, false));
    };

    // Attach an event listener to the "Add Task" button
    // When the button is clicked, retrieve the input value and call addTask.
    addButton.addEventListener('click', () => {
        const text = taskInput.value.trim(); // Get and trim the input value
        if (text === "") {
            alert("Please enter a task!");
            return; // Stop if input is empty
        }
        addTask(text); // Call addTask with the text (save=true by default)
        taskInput.value = ""; // Clear the input field after adding
    });

    // Attach an event listener to the task input field for the 'keypress' event
    // This allows users to add a task by pressing the "Enter" key.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            const text = taskInput.value.trim(); // Get and trim the input value
            if (text === "") {
                alert("Please enter a task!");
                return; // Stop if input is empty
            }
            addTask(text); // Call addTask with the text (save=true by default)
            taskInput.value = ""; // Clear the input field after adding
        }
    });

    // Invoke the loadTasks function when the DOM is fully loaded.
    // This ensures that any previously saved tasks are displayed when the page loads.
    loadTasks();
});