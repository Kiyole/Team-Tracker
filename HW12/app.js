const mysql = require("mysql");
const inquirer = require("inquirer");

require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeeDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainSearch();
  //updateEmployeeRole();
});

function mainSearch() {
  inquirer.prompt({
    type: "list",
    name: "main",
    message: "What would you like to do?",
    choices: [
      "View Departments",
      "View Roles",
      "View Employees",
      "Add Departments",
      "Add Roles",
      "Add Employees",
      //"Remove Employee",
      "Update Employee Roles",
      "Quit"
    ]
  })
  .then(function(answer){
    switch (answer.main) {
      case 'View Departments':
        viewDepartment();
        break;
      case 'View Roles':
        viewRole();
        break;
      case 'View Employees':
        viewEmployee();
        break;
      case 'Add Departments':
        addDepartments();
        break;
      case 'Add Roles':
        addRole;
        break;
      case 'Add Employees':
        addEmployee();
        break;
      case 'Update Employee Roles':
        displayEmployee();
        updateEmployeeRole();
        break;
      //case 'Remove Employee':
        //  removeEmployee();
       // break;
      case 'Quit':
        connection.end();
        break;
    }
  })
}

function addRole() {
  inquirer.prompt([
    {
      name: "title",
      message: "What is the title of the role?",
      type: "input"
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
      type: "number"
    },
    {
      name: "title_id",
      message: "What is the title id",
      type: "number"
    }
  ]).then(function (answer) {
    console.log(answer)
    console.log({
      title: answer.title,
      salary: answer.salary,
      title_id: answer.title_id,
    });

    var query = connection.query(
      "INSERT INTO role SET ?",
      answer,
      function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log('New Role Added')
        mainSearch()
      }
    )

    console.log(query.sql);
  })
}

function addDepartments() {
  inquirer.prompt([
    {
      name: "name",
      message: "What is the name of the department?",
      type: "input"
    }
  ]).then(function (answer) {
    var query = connection.query(
      "INSERT INTO department SET ?",
      answer,
      function (err, res) {
        if (err) throw err;
        console.log('New Department Added')
        mainSearch();
      }
    )
    console.log(query.sql);
  })
}

function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      message: 'What is the employees first name?',
      type: 'input'
    },
    {
      name: 'last_name',
      message: 'What id the employees last name?',
      type: 'input'
    },
    {
      name: 'role_id',
      message: 'What is the employees role Id?',
      type: 'number'
    },
    {
      name: 'manager_id',
      message: 'What is the managers Id',
      type: 'number'
    }
  ])
    .then(function (answer) {
      console.log(answer)
      var query = connection.query(
        'INSERT INTO employee SET ?',
        answer,
        function (err, res) {
          if (err) throw err;
          console.log('New Employee Added')
          mainSearch();
        }
      )
      console.log(query.sql)
    })
}

function viewEmployee() {
  var query = connection.query(
    'SELECT * FROM employee',
    function (err, res) {
      if (err) throw err;
      //console.log(res)
      console.table(res)
      mainSearch();
    }
  )
  console.log(query.sql)
}

function viewDepartment() {
  var query = connection.query(
    'SELECT * FROM department',
    function (err, res) {
      if (err) throw err;
      console.table(res)
      mainSearch();
    }
  )
  console.log(query.sql)
}

function viewRole() {
  var query = connection.query(
    'SELECT * FROM role',
    function (err, res) {
      if (err) throw err;
      console.table(res)
      mainSearch();
    }
  )
  console.log(query.sql)
}
function removeEmployee(){
  inquirer
  .prompt([
    {
      name: ''
    }
  ])
  var query = connection.query(
    'DELETE FROM employee WHERE ?', []
  )
}
function displayEmployee(){
connection.query('SELECT * FROM employee',
function(err, result) {
if(err) throw err; 
console.table(result)
console.log('Here are the current Employees')
})
}
function updateEmployeeRole() {
   
//}).then
inquirer.prompt([
    {
      name: 'first_name',
      message: 'What is the employees first name?',
      type: 'input'
    },
    // {
    //   name: 'last_name',
    //   message: 'What is the employees last name?',
    //   type: 'input'
    // },
    {
      name: 'roleid',
      message: 'What is the employees role Id',
      type: 'number'
    }
  ])
    .then(firstAnswers => {
      inquirer
        .prompt([
          {
            name: 'title',
            message: 'What is the employees new title?',
            type: 'input'
          },
          // {
          //   name: 'salary',
          //   message: 'What  is the employees new salary?',
          //   type: 'number'
          // },
          {
            name: 'title_id',
            message: 'What is the employees new title Id',
            input: 'number'
          }
        ]).then(secondAnswers => {
          console.log(secondAnswers)
          console.log(firstAnswers)
          var query = connection.query(
            'UPDATE employee SET role_id = ? WHERE id = ?', [firstAnswers.roleid, secondAnswers.title_id],
            function (err, result){
              if (err) throw err;
              console.table(result)
              console.log(query.sql)
              mainSearch();
            })
        })
    })

  }
  
