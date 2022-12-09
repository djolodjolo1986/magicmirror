export const GOOGLE_SPREADSHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
export const GOOGLE_DRIVE_SCOPE = "https://www.googleapis.com/auth/drive";
export const BIRTHDAY_ANNIVERSARY_SPREADSHEET_ID = '1zaNm2Hg9o_C6HD1tJTic5BzUe5VUFWFeWO8OrYyHF84';
export const BIRTHDAY_SHEET = 'Sheet1';
export const ANNIVERSARY_SHEET = 'Sheet2';

export const CONFLUENCE_HOST = "https://teamsymphony.atlassian.net/";
export const CONFLUENCE_AUTH_EMAIL = "djordje.andric@symphony.is";
export const CONFLUENCE_AUTH_API_TOKEN = "uuloMGsjhzUXI1Xd9atz571D";
export const CONFLUENCE_SY_BIRTHDAYS_PAGE_ID = "2796782612";


export const ALLOWED_ORIGINS: string[] = [
    'MAGIC_MIRROR',
    'TEST_ORIGIN'
]

type CustomHeaders = {
    originService: string
}

export const CUSTOM_HEADERS: CustomHeaders = {
    originService: 'x-origin-service'
}

export const HTTP_ERROR_STATUS_BAD_REQUEST: number = 400;
export const HTTP_ERROR_STATUS_NOT_FOUND: number = 404;
export const HTTP_ERROR_STATUS_INTERNAL_SERVER_ERROR: number = 500;