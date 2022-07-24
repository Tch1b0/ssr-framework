import { EventEmitter } from "node:events";
import { UiComponent } from ".";
import { PageConfig } from "./pageconfig";

export class UiCore {
    element!: HTMLElement;

    constructor(
        public template: UiComponent,
        public pageConfig: PageConfig = new PageConfig()
    ) {}

    render(target: string | HTMLElement = this.element) {
        if (typeof target === "string") {
            this.element = document.querySelector<HTMLElement>(target)!;
        } else {
            this.element = target;
        }

        this.element.innerHTML = this.template();
    }

    plainRender(asPage: boolean = true): string {
        let rendered = this.template();
        if (asPage) {
            this.pageConfig.applyConfig();
            rendered = this.pageConfig.apply("UI_ROOT", rendered);
            this.pageConfig.reset();
        }
        return rendered;
    }
}
