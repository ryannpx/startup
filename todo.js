// document.addEventListener('DOMContentLoaded', function () {
//     const todoForm = document.getElementById('todo-form');
//     const todoList = document.getElementById('todo-list');

//     // Function to add a new task
//     function addTask(taskName) {
//         const listItem = document.createElement('li');
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         const label = document.createElement('label');
//         label.textContent = ' ' + taskName; // Add a space before the task name
//         listItem.appendChild(checkbox);
//         listItem.appendChild(label);
//         todoList.appendChild(listItem);
//     }

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
// });
document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');

    // Function to add a new task
    function addTask(taskName) {
        const listItem = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '5px'; // Add some margin to separate checkbox from text
        
        const label = document.createElement('label');
        label.textContent = taskName; // Set the label text to the task name
        
        // Event listener for checkbox change
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                label.style.textDecoration = 'line-through'; // Strikethrough text when checkbox is checked
            } else {
                label.style.textDecoration = 'none'; // Remove strikethrough when checkbox is unchecked
            }
        });
        
        // Event listener for label click to toggle checkbox
        label.addEventListener('click', function() {
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) {
                label.style.textDecoration = 'line-through'; // Strikethrough text when checkbox is checked
            } else {
                label.style.textDecoration = 'none'; // Remove strikethrough when checkbox is unchecked
            }
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        todoList.appendChild(listItem);
    }

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
});
