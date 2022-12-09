import { createExpressServer } from 'routing-controllers';
import "reflect-metadata";
import { EmployeeController } from './controllers/employeeController';
import dotenv from 'dotenv';
let bodyParser = require('body-parser')
import {HttpErrorHandlerMiddleware} from "./middlewares/errorHandlingMiddleware";
import {ConfluenceController} from "./controllers/confluenceController";
import {AssertOriginMiddleware} from "./middlewares/assertOriginMiddleware";

dotenv.config();
const port = process.env.PORT;

const app = createExpressServer({
    routePrefix: '/api',
    defaultErrorHandler: false,
    middlewares: [HttpErrorHandlerMiddleware, AssertOriginMiddleware],
    controllers: [EmployeeController, ConfluenceController]
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
