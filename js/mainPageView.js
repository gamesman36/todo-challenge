function updateViewMainPage() {
    app.innerHTML = `
    <ul class="todo-list">
    ${createListHTML()}
    </ul>
    `;
}

function createListHTML() {
    let html = "<h1>My<br /> To-Do</h1>";
    for (let i = 0; i < model.data.entries.length; i++) {
        let entry = model.data.entries[i];
        
        let taskClass = "";
        if (entry.status === "pending") {
            taskClass = "todo-item pending";
        } else if (entry.status === "completed") {
            taskClass = "todo-item completed";
        } else {
            taskClass = "todo-item deleted"
        }
        
        html += `<li class="${taskClass}" onclick="toggleTaskState(${i})">${entry.title}</li>`;
    }
    return html;
}
