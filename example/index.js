const { ServerCore, UiCore, PageConfig } = require("../dist/index.js");
const { todoList } = require("./components.js");

const main = new UiCore(
    () => `
        <h1>Welcome to my beautiful site</h1>
        <p>Pages: </p>
        <ul>
            <li><a href="/home">Home</a></li>
        </ul>
    `,
    new PageConfig(undefined, "Main")
);

const home = new UiCore(
    () => `
        <h1>Some nice website</h1>
        ${todoList()}
        <hr>
        <p>${new Date()}</p>
    `,
    new PageConfig(undefined, "Home")
);

const server = new ServerCore();
server.registerRoute("/", main);
server.registerRoute("/home", home);
server.serve(8080);
