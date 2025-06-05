const prompt = require("prompt-sync")();
const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("todo.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the users database.");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      desc TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table is ready.");
      }
    }
  );
});

function addTodo() {
  const title = prompt("Enter todo title: ");
  const desc = prompt("Enter todo description: ");

  db.run(
    `INSERT INTO todo (title, desc) VALUES (?, ?)`,
    [title, desc],
    function (err) {
      if (err) {
        console.error("Error adding todo:", err.message);
      } else {
        console.log(`Todo added with ID: ${this.lastID}`);
      }
    }
  );
}

function listTodos() {
  db.all(`SELECT * FROM todo`, (err, rows) => {
    if (err) {
      console.error("Error fetching todos:", err.message);
    } else {
      console.log(rows);
    }
  });
}

function deleteTodo(id) {
  db.run(`DELETE FROM todo WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("Error deleting todo:", err.message);
    } else {
      console.log(`Todo deleted.`);
    }
  });
}

function updateTodo() {
  const id = prompt("Enter todo ID to update: ");
  const title = prompt("Enter new todo title: ");
  const desc = prompt("Enter new todo description: ");

  db.run(
    `UPDATE todo SET title = ?, desc = ? WHERE id = ?`,
    [title, desc, id],
    function (err) {
      if (err) {
        console.error("Error updating todo:", err.message);
      } else {
        console.log(`Todo updated.`);
      }
    }
  ); 
}

updateTodo()
