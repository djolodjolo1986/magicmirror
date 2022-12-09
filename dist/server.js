"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
require("reflect-metadata");
const employeeController_1 = require("./controllers/employeeController");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, routing_controllers_1.createExpressServer)({
    routePrefix: '/api',
    controllers: [employeeController_1.EmployeeController]
});
app.listen(port, () => {
    console.log(`️[server]: aaServer is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map