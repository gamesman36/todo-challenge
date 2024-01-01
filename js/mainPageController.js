async function fetchTasks() {
    try {
        const response = await axios.get("https://creative-tech-code-quest.vercel.app/api/todo");
        
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Invalid API response');
        }

        const tasks = response.data.map(task => ({
            title: task.title,
            status: task.status || "pending"
        }));
        console.log("Mapped Tasks:", tasks);

        model.data.entries = tasks;

        saveTasksToLocalStorage();
        updateViewMainPage();
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
}

function toggleTaskState(index) {
    
    if(index >= 0 && index < model.data.entries.length) {
        
        let currentStatus = model.data.entries[index].status;
        
        model.data.entries[index].status = currentStatus === 'pending' ? 'completed' : 'pending';
        
        saveTasksToLocalStorage();
        updateViewMainPage();
    } else {
        console.error('Invalid task index: ', index);
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(model.data.entries));
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        model.data.entries = savedTasks;
    }
}