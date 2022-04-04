import { EventEmitter } from "node:events";

const vars = new Map<string, any>();

export function useVar<T>(
    name: string,
    defaultValue: T
): [T, (value: T) => void] {
    if (!vars.has(name)) {
        vars.set(name, defaultValue);
    }

    const value = vars.get(name);

    return [value, (value: T) => vars.set(name, value)];
}

export declare interface UiCore {
    on(event: "preRender", listener: (element: HTMLElement) => void): this;
    on(event: "postRender", listener: (element: HTMLElement) => void): this;
    on(event: string, listener: Function): this;
}

export class UiCore extends EventEmitter {
    element!: HTMLElement;

    constructor(public template: () => string) {
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

    plainRender(): string {
        this.emit("preRender", this.element);
        const rendered = this.template();
        this.emit("postRender", this.element);
        return rendered;
    }
}
