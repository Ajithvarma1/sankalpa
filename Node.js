document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    function fetchAndDisplayTasks() {
        
        fetch('/tasks')
            .then((response) => response.json())
            .then((data) => {
                taskList.innerHTML = ''; 
                data.forEach((task) => {
                    const li = document.createElement('li');
                    li.textContent = `Title: ${task.title}, Description: ${task.description}, Due Date: ${task.dueDate}, Priority: ${task.priority}`;
                    taskList.appendChild(li);
                });
            });
    }

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = document.getElementById('priority').value;

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                dueDate,
                priority,
            }),
        })
            .then(() => {
                
                fetchAndDisplayTasks();
            })
            .catch((error) => {
                console.error(error);
            });
    });
    fetchAndDisplayTasks();
});
