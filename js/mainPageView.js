function updateViewMainPage() {
    app.innerHTML = `
    <ul class="todo-list">
    ${createListHTML()}
    </ul>
    `;
}

function createListHTML() {
    let html = "";
    
    for (let i = 0; i < model.data.entries.length; i++) {
        let entry = model.data.entries[i];
        let taskClass = entry.status === 'completed' ? 'task-completed' : 'task-pending';
        
        html += `
            <li class="todo-item ${taskClass}" onclick="toggleTaskState(${i})">
                ${entry.title}
            </li>
        `;
    }
    
    return html;
}