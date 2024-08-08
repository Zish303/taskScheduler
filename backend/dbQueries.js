module.exports = {
  createTableUser: `create table if not exists users(id int not null auto_increment primary key, email varchar(255), password varchar(255))`,
  createTableTodo: `create table if not exists todo( id int not null auto_increment primary key, uid int not null, description varchar(1000), completed tinyint(1))`,
  getTasks: `SELECT id, description FROM todo WHERE uid = ?`,
  editTask: `UPDATE todo SET description = ? WHERE id = ?`,
  addTask: `INSERT INTO todo(uid, description, completed) VALUES (?,?,?)`,
  deleteTask: `DELETE FROM todo WHERE id = ?`,
  getUser: `SELECT id,email,password FROM users WHERE email=?`,
  getUserById: `SELECT email,password FROM users WHERE id=?`,
  addUser: `INSERT INTO users(email, password) VALUES (?,?)`,
  updatePassword: `UPDATE users SET password = ? WHERE id = ?`,
};
