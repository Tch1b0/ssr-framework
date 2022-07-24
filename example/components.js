const { generateHexColor } = require("./utility");

function todoItem(name) {
    return `
        <li style="color: ${generateHexColor()}">
            ${name}
        </li>
    `;
}

function todoList(someTodos) {
    const todos = someTodos ?? [
        "Learn TypeScript",
        "Learn JavaScript",
        "Learn React",
        "Learn Angular",
        "Learn Vue",
    ];
    return `
        <ul>
            ${todos.map((todo) => todoItem(todo)).join("")}
        </ul>
    `;
}

module.exports = { todoList };
