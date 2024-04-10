

// document.addEventListener('DOMContentLoaded', function () {
//     const todoForm = document.getElementById('todo-form');
//     const todoList = document.getElementById('todo-list');
//     const clearButton = document.getElementById('clearButton');
//     const maxTasks = 11; // Maximum number of tasks allowed

//     // Function to add a new task
//     function addTask(taskName) {
//         if (todoList.children.length < maxTasks) {
//             const listItem = document.createElement('li');

//             const checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             checkbox.style.marginRight = '5px'; // Add some margin to separate checkbox from text

//             const label = document.createElement('label');
//             label.textContent = taskName; // Set the label text to the task name

//             // Event listener for checkbox change
//             checkbox.addEventListener('change', function () {
//                 if (checkbox.checked) {
//                     label.style.textDecoration = 'line-through'; // Strikethrough text when checkbox is checked
//                 } else {
//                     label.style.textDecoration = 'none'; // Remove strikethrough when checkbox is unchecked
//                 }
//                 updateLocalStorage(); // Update local storage when checkbox state changes
//             });

//             // Event listener for label click to toggle checkbox
//             label.addEventListener('click', function () {
//                 checkbox.checked = !checkbox.checked;
//                 if (checkbox.checked) {
//                     label.style.textDecoration = 'line-through'; // Strikethrough text when checkbox is checked
//                 } else {
//                     label.style.textDecoration = 'none'; // Remove strikethrough when checkbox is unchecked
//                 }
//                 updateLocalStorage(); // Update local storage when checkbox state changes
//             });

//             listItem.appendChild(checkbox);
//             listItem.appendChild(label);
//             todoList.appendChild(listItem);

//             updateLocalStorage(); // Update local storage when a task is added
//         } else {
//             alert('You have reached the maximum limit of tasks.'); // Alert the user if maximum limit is reached
//         }
//     }

//     // Function to update local storage with current tasks
//     function updateLocalStorage() {
//         const tasks = [];
//         todoList.querySelectorAll('li').forEach(function (item) {
//             tasks.push({
//                 name: item.querySelector('label').textContent,
//                 completed: item.querySelector('input').checked
//             });
//         });
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//     }

//     // Function to load tasks from the backend
//     async function loadTasksFromBackend() {
//         try {
//             const response = await fetch('/tasks');
//             const data = await response.json();
//             if (data.tasks) {
//                 data.tasks.forEach(function (task) {
//                     addTask(task.name);
//                     const lastTask = todoList.lastChild;
//                     lastTask.querySelector('input').checked = task.completed;
//                     if (task.completed) {
//                         lastTask.querySelector('label').style.textDecoration = 'line-through';
//                     }
//                 });
//             }
//         } catch (error) {
//             console.error('Error loading tasks:', error);
//         }
//     }

//     // Load tasks from the backend when the page loads
//     loadTasksFromBackend();

//     // Event listener for the form submission
//     todoForm.addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevent the default form submission behavior
//         const taskInput = document.getElementById('task');
//         const taskName = taskInput.value.trim(); // Get the task name from the input field
//         if (taskName !== '') {
//             addTask(taskName); // Add the task to the list
//             taskInput.value = ''; // Clear the input field
//         }
//     });

//     // Event listener for the clear button
//     clearButton.addEventListener('click', function () {
//         // Remove all tasks from the list
//         while (todoList.firstChild) {
//             todoList.removeChild(todoList.firstChild);
//         }
//         updateLocalStorage(); // Update local storage when tasks are cleared
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const clearButton = document.getElementById('clearButton');
    const maxTasks = 11; // Maximum number of tasks allowed

    // Function to add a new task
    function addTask(taskName) {
        if (todoList.children.length < maxTasks) {
            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.style.marginRight = '5px'; // Add some margin to separate checkbox from text

            const label = document.createElement('label');
            label.textContent = taskName; // Set the label text to the task name

            // Event listener for checkbox change
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    label.style.textDecoration = 'line-through'; // Strikethrough text when checkbox is checked
                } else {
                    label.style.textDecoration = 'none'; // Remove strikethrough when checkbox is unchecked
                }
                updateLocalStorage(); // Update local storage when checkbox state changes
            });

            // Event listener for label click to toggle checkbox
            label.addEventListener('click', function () {
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked) {
                    label.style.textDecoration = 'line-through'; // Strikethrough text when checkbox is checked
                } else {
                    label.style.textDecoration = 'none'; // Remove strikethrough when checkbox is unchecked
                }
                updateLocalStorage(); // Update local storage when checkbox state changes
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            todoList.appendChild(listItem);

            updateLocalStorage(); // Update local storage when a task is added
        } else {
            alert('You have reached the maximum limit of tasks.'); // Alert the user if maximum limit is reached
        }
    }

  // Function to update local storage with current tasks
function updateLocalStorage() {
    const tasks = [];
    const userEmail = localStorage.getItem('userEmail'); // Get the logged-in user's email
    todoList.querySelectorAll('li').forEach(function (item) {
        tasks.push({
            userEmail: userEmail, // Include the user's email with the task data
            name: item.querySelector('label').textContent,
            completed: item.querySelector('input').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


    // Function to load tasks from local storage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function (task) {
                addTask(task.name);
                const lastTask = todoList.lastChild;
                lastTask.querySelector('input').checked = task.completed;
                if (task.completed) {
                    lastTask.querySelector('label').style.textDecoration = 'line-through';
                }
            });
        }
    }

    // Load tasks from local storage when the page loads
    loadTasksFromLocalStorage();

    // Event listener for the form submission
    todoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const taskInput = document.getElementById('task');
        const taskName = taskInput.value.trim(); // Get the task name from the input field
        if (taskName !== '') {
            addTask(taskName); // Add the task to the list
            taskInput.value = ''; // Clear the input field
        }
    });

    // Event listener for the clear button
    clearButton.addEventListener('click', function () {
        // Remove all tasks from the list
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }
        updateLocalStorage(); // Update local storage when tasks are cleared
    });
});
