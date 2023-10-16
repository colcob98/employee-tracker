const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllDepartments() {
    return this.connection
      .promise()
      .query(
        "SELECT department.name AS 'department', department.id FROM department;"
      );
  }

  viewAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.title, role.id, department.name AS 'department', role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }

  viewAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id AS 'employee ID', employee.first_name, employee.last_name, role.title, department.name AS 'department', role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS 'manager' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
      );
  }

  addDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }
}

module.exports = DB;
