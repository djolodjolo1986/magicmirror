import { Middleware, HttpError } from 'routing-controllers';
import {ExpressMiddlewareInterface} from "routing-controllers/types/driver/express/ExpressMiddlewareInterface";
import {
    ALLOWED_ORIGINS,
    CUSTOM_HEADERS,
    HTTP_ERROR_STATUS_BAD_REQUEST
} from "../utils/constants";

@Middleware({ type: 'before' })
export class AssertOriginMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): any {
        const xOrigin: string = request.headers[CUSTOM_HEADERS.originService];
        if (!ALLOWED_ORIGINS.includes(xOrigin)) {
            throw new HttpError(HTTP_ERROR_STATUS_BAD_REQUEST, `Request with x-origin-service ${xOrigin} not allowed`)
        }
        next()
    }
}