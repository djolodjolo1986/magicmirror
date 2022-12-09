import {Content} from "confluence.js/out/api/models";

export class ConfluenceContentResponse {
    id: string;
    title: string;
    body?: string;

    public static MAP(src: Content): ConfluenceContentResponse {
        const body: ConfluenceContentResponse = new ConfluenceContentResponse()
        body.id = src.id;
        body.title = src.title;
        body.body = src.body?.storage.value;
        return body
    }
}