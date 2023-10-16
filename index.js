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
        name: "addDepartment",
        message: "Please enter the department you would like to add.",
      },
    ])
    .then((response) => {
      const department = response;
      console.log(response.addDepartment);
      console.log(department);
    });
}

showPrompts();
