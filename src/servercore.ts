import { UiCore } from "./uicore";
import { Express } from "express";
const express = require("express");

export class ServerCore {
    routes: Map<string, UiCore> = new Map();

    registerRoute(route: string, ui: UiCore) {
        this.routes.set(route, ui);
    }

    serve(port: number) {
        const app: Express = express();

        app.get("/:route", (req, res) => {
            const route = req.params.route;
            console.log(route);
            const ui = this.routes.get("/" + route);
            console.log(this.routes);

            if (ui) {
                const html = `<!DOCTYPE html>
                <html> <head> <title>${route}</title> </head> <body> ${ui.plainRender()} </body> </html>`;
                res.send(html);
            } else {
                res.status(404).send("Not found");
            }
        });

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}
