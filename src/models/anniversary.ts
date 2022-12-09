export class Anniversary {
    name: string;
    dateOfAnniversary: string;
    anniversary: number;

    public static MAP(src1: any, src2: number): Anniversary {
        const body: Anniversary = new Anniversary()
        body.name = src1[1];
        body.dateOfAnniversary = src1[2];
        body.anniversary = src2;
        return body
    }
}