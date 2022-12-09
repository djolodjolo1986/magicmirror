//
// const EmployeeModel = require('../models/employees')
//
// // GENERIC TYPE
// export function Mapper<T>(value: T): T {
//     return value;
// }
//
// export function addEmployeeRequestToEmployeeModel(request: AddEmployeeRequest): typeof EmployeeModel{
//     let employeeModel = new EmployeeModel();
//     employeeModel.firstName = request.firstName;
//     employeeModel.lastName = request.lastName;
//     employeeModel.birthday = request.birthday;
//
//     return employeeModel;
// }