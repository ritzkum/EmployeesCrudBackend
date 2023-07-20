const express =require('express');
const bodyParse = require('body-parser');
const server = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
server.use(bodyParser.json());

const cors = require('cors')
server.use(cors())
//data connectioin

// const db =  mysql.createConnection({

// });


const db = mysql.createConnection ({
    host:"localhost",
    user:"root",
    password:"",
    database:"employeedb",

})

db.connect((error) => {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

//Port

  server.listen(8085,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }
    else 
    {
        console.log("Started....!!!!");
    }
});

//Create the Records
server.post("/api/employees/add", (req, res) => {
    let details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        designation:req.body.designation,
        department:req.body.department
    };
    let sql = "INSERT INTO employees SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "employee created Failed" });
      } else {
        res.send({ status: true, message: "employee created successfully" });
      }
    });
  });

  //view the Records
server.get("/api/employees", (req, res) => {
    var sql = "SELECT * FROM employees";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


  //Search the Records (getbyId)

server.get("/api/employees/:id", (req, res) => {
    var empid = req.params.id;
    var sql = "SELECT * FROM employees WHERE id=" + empid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


  //Update the Records (updatebyId)
server.put("/api/employees/update/:id", (req, res) => {
    let sql =
      "UPDATE employees SET firstname='" +
      req.body.firstname +
      "', lastname='" +
      req.body.lastname +
      "',designation='" +
      req.body.designation +
      "', department='" +
      req.body.department +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Employee Updated Failed" });
      } else {
        res.send({ status: true, message: "Employee Updated successfully" });
      }
    });
  });


  //Delete the Records
  server.delete("/api/employees/delete/:id", (req, res) => {
    let sql = "DELETE FROM employees WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Employees Deleted Failed" });
      } else {
        res.send({ status: true, message: "Employees Deleted successfully" });
      }
    });
  });
