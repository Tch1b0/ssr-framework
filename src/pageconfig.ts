const defaultHTMLTemplate = `<!DOCTYPE html>
<html lang="{{SPOKEN_LANGUAGE}}">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{{PAGE_NAME}}</title>
    </head>
    <body>
        {{UI_ROOT}}
    </body>
</html>
`;

export class PageConfig {
    private modifiedTemplate: string;

    constructor(
        public template: string = defaultHTMLTemplate,
        public pageName: string = "My Page",
        public spokenLanguage: string = "en"
    ) {
        this.modifiedTemplate = this.template;
    }

    apply(key: string, value: string): string {
        this.modifiedTemplate = this.modifiedTemplate.replace(
            `{{${key}}}`,
            value
        );
        return this.modifiedTemplate;
    }

    applyConfig(): string {
        this.apply("PAGE_NAME", this.pageName);
        this.apply("SPOKEN_LANGUAGE", this.spokenLanguage);
        return this.modifiedTemplate;
    }

    reset() {
        this.modifiedTemplate = this.template;
    }
}
