import {
    Get,
    JsonController
} from 'routing-controllers';
import {getAnniversariesFromGoogleSheet, getBirthdaysFromGoogleSheet} from "../services/googleService";

@JsonController('/v1/employees')
export class EmployeeController {
    @Get('/birthdays')
    async getBirthdays() {
        return await getBirthdaysFromGoogleSheet();
    }

    @Get('/anniversary')
    async getAnniversaries() {
        return await getAnniversariesFromGoogleSheet();
    }
}
