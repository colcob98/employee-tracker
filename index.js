const express = require("express");
const inquirer = require("inquirer");
const dbhelpers = require("./helpers");

function showPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Departments",
            value: "viewDepartments",
          },
          {
            name: "View All Roles",
            value: "viewRoles",
          },
          {
            name: "View All Employees",
            value: "viewEmployees",
          },
          {
            name: "Add a Department",
            value: "addDepartment",
          },
          {
            name: "Add a Role",
            value: "addRole",
          },
          {
            name: "Add an Employee",
            value: "addEmployee",
          },
          {
            name: "Update an Employee Role",
            value: "updateEmployeeRole",
          },
          {
            name: "Quit",
            value: "quit",
          },
        ],
      },
    ])
    .then((responce) => {
      let choice = responce.choice;
      switch (choice) {
        case "viewDepartments":
          viewAllDepartments();
          break;
        case "viewRoles":
          viewAllRoles();
          break;
        case "viewEmployees":
          viewAllEmployees();
          break;
        case "addDepartment":
          addDepartment();
          break;
        case "addRole":
          addRole();
          break;
        case "addEmployee":
          addEmployee();
          break;
        case "updateEmployeeRole":
          updateEmployeeRole();
          break;
        case "quit":
          quitApp();
          break;
      }
    });
}

function viewAllDepartments() {
  dbhelpers
    .viewAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => showPrompts());
}

function viewAllRoles() {
  dbhelpers
    .viewAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => showPrompts());
}

function viewAllEmployees() {
  dbhelpers
    .viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => showPrompts());
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please enter the department you would like to add.",
      },
    ])
    .then((response) => {
      const newDepartment = response.department;

      dbhelpers.addDepartment(newDepartment).then(() => {
        console.log(`Added a new ${newDepartment} department to the database!`);
        viewAllDepartments();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter the role's title you would like to add.",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the role's salary.",
      },
      {
        type: "input",
        name: "department_id",
        message: "Please enter the department ID for this role.",
      },
    ])
    .then((response) => {
      const role = {
        title: response.title,
        salary: parseFloat(response.salary),
        department_id: parseInt(response.department_id),
      };

      dbhelpers.addRole(role).then(() => {
        console.log(`Added a new role to the database!`);
        viewAllRoles();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the employee's first name.",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the employee's last name.",
      },
      {
        type: "input",
        name: "role_id",
        message: "Please enter the employee's role ID.",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Please enter the employee's manager ID.",
      },
    ])
    .then((response) => {
      const employee = {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: parseInt(response.role_id),
        manager_id: parseInt(response.manager_id),
      };

      dbhelpers.addEmployee(employee).then(() => {
        console.log(`Added a new employee to the database!`);
        viewAllEmployees();
      });
    });
}

function updateEmployeeRole() {
  let employeeSelection;
  let roleSelection;

  dbhelpers
    .viewAllEmployees()
    .then(([employeeRows]) => {
      employeeSelection = employeeRows.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee["employee ID"],
      }));
      console.log(employeeSelection);
      return dbhelpers.viewAllRoles();
    })
    .then(([roleRows]) => {
      roleSelection = roleRows.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      console.log(roleSelection);
      return inquirer.prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Select an employee to update their role.",
          choices: employeeSelection,
        },
        {
          type: "list",
          name: "role_id",
          message: "Select the role in which the employee will work.",
          choices: roleSelection,
        },
      ]);
    })
    .then((response) => {
      const role_id = response.role_id;
      const employee_id = response.employee_id;
      console.log(employee_id);
      console.log(role_id);

      return dbhelpers.updateEmployeeRole(employee_id, role_id);
    })
    .then(() => {
      console.log("Employee role updated!");
      viewAllEmployees();
    })
}

function quitApp() {
    console.log("bye bye!");
    process.exit(0);
}

showPrompts();
