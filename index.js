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
          message: "Please enter the role's salary:",
        },
        {
          type: "input",
          name: "department_id",
          message: "Please enter the department ID for this role:",
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

showPrompts();
