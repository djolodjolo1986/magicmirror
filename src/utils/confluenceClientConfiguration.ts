import {ConfluenceClient} from "confluence.js";
import {CONFLUENCE_AUTH_API_TOKEN, CONFLUENCE_AUTH_EMAIL, CONFLUENCE_HOST} from "./constants";

export const clientConfig = new ConfluenceClient({
    host: CONFLUENCE_HOST,
    authentication: {
        basic: {
            email: CONFLUENCE_AUTH_EMAIL,
            apiToken: CONFLUENCE_AUTH_API_TOKEN
        }
    }
});