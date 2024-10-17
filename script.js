document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = (filter = '') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filter.toLowerCase()));
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.name} - ${task.dueDate}</span>
                <button class="delete" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            `;
            taskList.appendChild(li);
        });
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTaskButton.addEventListener('click', () => {
        const taskName = taskInput.value;
        const dueDate = new Date().toLocaleDateString(); // For simplicity, using current date
        if (taskName) {
            tasks.push({ name: taskName, dueDate });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    searchInput.addEventListener('input', () => {
        renderTasks(searchInput.value);
    });

    renderTasks();
});