const { ServerCore, UiCore } = require("../dist/index.js");

function generateHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

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

const main = new UiCore(
    () => `
        <h1>Some nice website</h1>
        ${todoList()}
    `
);

const server = new ServerCore();
server.registerRoute("/home", main);
server.serve(8080);
