import {google} from "googleapis";
import {GOOGLE_DRIVE_SCOPE, GOOGLE_SPREADSHEETS_SCOPE} from "./constants";

export const spreadsheetsAuth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: [GOOGLE_SPREADSHEETS_SCOPE, GOOGLE_DRIVE_SCOPE]
})