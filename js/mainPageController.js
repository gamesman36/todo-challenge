async function fetchTasks() {
    if (model.data.entries.length === 0) {
        try {
            const response = await axios.get("https://creative-tech-code-quest.vercel.app/api/todo");

            if (!response.data || !Array.isArray(response.data)) {
                throw new Error("Invalid API response");
            }

            const tasks = response.data.map(task => ({
                title: task.title,
                status: task.status || "pending"
            }));

            model.data.entries = tasks;
            saveTasksToLocalStorage();
            updateViewMainPage();
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }
}

async function createTask(title) {
    try {
        const response = await axios.post("https://creative-tech-code-quest.vercel.app/api/todo/1", {
            title: title,
            status: "pending"
        });

        if (!response.data || typeof response.data !== "object") {
            throw new Error("Invalid API response")
        }

        const newTask = {
            title: response.data.title,
            status: response.data.status
        };

        model.data.entries.push(newTask);

        saveTasksToLocalStorage();
        updateViewMainPage();
    }
    catch (error) {
        console.error("Failed to create task:", error);
    }
}

function toggleTaskState(index) {
    if (index >= 0 && index < model.data.entries.length) {
        let task = model.data.entries[index];
        if (task.status === "pending") {
            task.status = "completed";
        } else if (task.status === "completed") {
            task.status = "deleted";
        }

        saveTasksToLocalStorage();
        updateViewMainPage();
    } else {
        console.error("Invalid task index: ", index);
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(model.data.entries));
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        model.data.entries = savedTasks;
    }
}