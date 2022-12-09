import {google} from "googleapis";
import {Anniversary} from "../models/anniversary";
import {Birthday} from "../models/birthday";
import {ANNIVERSARY_SHEET, BIRTHDAY_ANNIVERSARY_SPREADSHEET_ID, BIRTHDAY_SHEET} from "../utils/constants";
import {spreadsheetsAuth} from "../utils/googleAuth";
import {updateConfluenceBirthdayPage} from "./confluenceService";

export const getBirthdaysFromGoogleSheet: () => Promise<Array<Birthday>> = async () => {
    const spreadsheetId = BIRTHDAY_ANNIVERSARY_SPREADSHEET_ID;
    const client = await spreadsheetsAuth.getClient();
    const googleSheets = google.sheets({version: "v4", auth: client})

    const getRows = await googleSheets.spreadsheets.values.get({
        auth: spreadsheetsAuth,
        spreadsheetId,
        range: BIRTHDAY_SHEET
    });

    const employees = getRows.data.values;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    let birthdayPeople: Array<Birthday> = new Array<Birthday>();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    employees.forEach(element => {
        const dateArray = element[2].split('.');
        let birthdayDate = new Date(`${today.getFullYear()}-${dateArray[1]}-${dateArray[0]}`);

        if(birthdayDate >= today && birthdayDate <= sevenDaysLater){
            birthdayPeople.push(Birthday.MAP(element, days[birthdayDate.getDay() - 1]));
        }
    });

    await updateConfluenceBirthdayPage(birthdayPeople);

    return birthdayPeople;
}

export const getAnniversariesFromGoogleSheet: () => Promise<Array<Anniversary>> = async () => {
    const spreadsheetId = BIRTHDAY_ANNIVERSARY_SPREADSHEET_ID;
    const client = await spreadsheetsAuth.getClient();
    const googleSheets = google.sheets({version: "v4", auth: client})

    const getRows = await googleSheets.spreadsheets.values.get({
        auth: spreadsheetsAuth,
        spreadsheetId,
        range: ANNIVERSARY_SHEET
    });

    const employees = getRows.data.values;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);

    let anniversaryPeople: Array<Anniversary> = new Array<Anniversary>();

    employees.forEach(element => {
        const dateArray = element[2].split('.');
        let anniversaryDate = new Date(`${today.getFullYear()}-${dateArray[1]}-${dateArray[0]}`);

        if(anniversaryDate >= today && anniversaryDate <= nextMonth){
            const fullAnniversaryDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
            anniversaryPeople.push(Anniversary.MAP(element, today.getFullYear() - fullAnniversaryDate.getFullYear()));
        }
    });

    return anniversaryPeople;
}

const downloadFileFromGoogleDrive: (realFileId: string) => Promise<any> = async (realFileId: string) => {
    const client = await spreadsheetsAuth.getClient();
    const service = google.drive({version: 'v3', auth: client});

    try {
        const file = await service.files.get({
            fileId: realFileId,
            alt: 'media',
        });
        console.log(`GoogleDrive file download http status: ${file.status}`);

        return file.data;
    } catch (err) {
        throw err;
    }
}