// const sqlite = require("sqlite3");
import sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();

const db = new sqlite3.Database("mydatabse.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the database.");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS student (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL
        
        )`,
    (err) => {
      if (err) {
        console.error("Error creating table: " + err.message);
      } else {
        console.log("Table created or already exists.");
      }
    }
  );
});

function insertdata(name, age) {
  db.run(
    "INSERT INTO student(name , age) VALUES (?, ?)",
    [name, age],
    (err) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
      } else {
        console.log("Data inserted successfully.");
      }
    }
  );
}

function onlygetdata(obj = {}) {
  let id = obj.id || null;
  let name = obj.name || null;
  let age = obj.age || null;

  db.all(
    "SELECT * FROM student WHERE id = ? OR name = ? OR age = ?",
    [id, name, age],
    (err, rows) => {
      if (err) {
        console.error("Error retrieving data: " + err.message);
      } else {
        console.log(rows);
      }
    }
  );
}

function getall() {
  db.all("SELECT * FROM student", (err, rows) => {
    if (err) {
      console.error("Error retrieving all data: " + err.message);
    } else {
      console.log(rows);
    }
  });
}

function updateData(obj = {}) {
  let name = obj.name || null;
  let age = obj.age || null;

  let query;
  let parameters = [];
  
  if (name && age == null) {
    query = "UPDATE student SET name = ? WHERE id = ?";
    parameters = [name, obj.id];
  } else if (age && name == null) {
    query = "UPDATE student SET age = ? WHERE id = ?";
    parameters = [age, obj.id];
  } else {
    query = "UPDATE student SET name = ?, age = ? WHERE id = ?";
    parameters = [name, age, obj.id];
  }
  db.run(query, parameters, (err) => {
    if (err) {
      console.error("Error updating data: " + err.message);
    } else {
      console.log("Data updated successfully.");
    }
  });
}


function deleteData(id) {
  db.run("DELETE FROM student WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting data: " + err.message);
    } else {
      console.log("Data deleted successfully.");
    }
  });
}
export { insertdata, onlygetdata, getall, updateData, deleteData };
