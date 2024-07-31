// script.js

document.addEventListener('DOMContentLoaded', () => {
    const addTodoButton = document.getElementById('addTodo');
    const newTodoInput = document.getElementById('newTodo');
    const todoList = document.getElementById('todoList');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editTodoInput = document.getElementById('editTodoInput');
    const saveChangesButton = document.getElementById('saveChanges');
    let currentEditIndex = -1;

    function addTodo() {
        const todoText = newTodoInput.value.trim();

        if (todoText !== '') {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <span>${todoText}</span>
                <div>
                    <button class="btn btn-warning btn-sm me-2 edit-btn">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </div>
            `;

            li.querySelector('.edit-btn').addEventListener('click', function() {
                currentEditIndex = Array.from(todoList.children).indexOf(li);
                editTodoInput.value = todoText;
                editModal.show();
            });

            li.querySelector('.delete-btn').addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this task?')) {
                    todoList.removeChild(li);
                }
            });

            todoList.appendChild(li);
            newTodoInput.value = '';
        }
    }

    function saveChanges() {
        const updatedText = editTodoInput.value.trim();
        if (updatedText !== '' && currentEditIndex > -1) {
            todoList.children[currentEditIndex].querySelector('span').textContent = updatedText;
            editModal.hide();
            currentEditIndex = -1;
        }
    }

    addTodoButton.addEventListener('click', addTodo);
    saveChangesButton.addEventListener('click', saveChanges);

    // Optional: Allow pressing Enter to add task
    newTodoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});
