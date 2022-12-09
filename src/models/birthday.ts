import {Content} from "confluence.js/out/api/models";

export class Birthday {
    name: string;
    birthday: string;
    dayOfTheWeek: string;

    public static MAP(src1: any, src2: string): Birthday {
        const body: Birthday = new Birthday()
        body.name = src1[1];
        body.birthday = src1[2];
        body.dayOfTheWeek = src2;
        return body
    }
}