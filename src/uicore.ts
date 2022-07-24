import { EventEmitter } from "node:events";
import { UiComponent } from ".";
import { PageConfig } from "./pageconfig";

export declare interface UiCore {
    on(event: "preRender", listener: (element: HTMLElement) => void): this;
    on(event: "postRender", listener: (element: HTMLElement) => void): this;
    on(event: string, listener: Function): this;
}

export class UiCore extends EventEmitter {
    element!: HTMLElement;

    constructor(
        public template: UiComponent,
        public pageConfig: PageConfig = new PageConfig()
    ) {
        super();
    }

    render(target: string | HTMLElement = this.element) {
        if (typeof target === "string") {
            this.element = document.querySelector<HTMLElement>(target)!;
        } else {
            this.element = target;
        }

        this.emit("preRender", this.element);
        this.element.innerHTML = this.template();
        this.emit("postRender", this.element);
    }

    plainRender(asPage: boolean = true): string {
        this.emit("preRender", this.element);
        let rendered = this.template();
        this.emit("postRender", this.element);
        if (asPage) {
            this.pageConfig.applyConfig();
            rendered = this.pageConfig.apply("UI_ROOT", rendered);
            this.pageConfig.reset();
        }
        return rendered;
    }
}
