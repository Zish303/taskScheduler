const con = require("../connection");
const queries = require("../dbQueries");

function getTasks(req, res) {
  con.query(queries.getTasks, [req.uid], (err, result) => {
    if (err) {
      res.status(500).send({
        error: "Internal server error",
      });
    } else {
      res.status(200).send({
        data: result,
      });
    }
  });
}

module.exports = {
  getTodo: (req, res) => {
    getTasks(req, res);
  },
  addTodo: (req, res) => {
    con.query(
      queries.addTask,
      [req.uid, req.body.description, 0],
      (err, result) => {
        if (err) {
          res.status(500).send({
            error: "Task addition failed",
          });
        } else {
          getTasks(req, res);
        }
      }
    );
  },
  editTodo: (req, res) => {
    con.query(
      queries.editTask,
      [req.body.description, req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            error: "Task editing failed",
          });
        } else {
          res.status(202).send({
            status: 202,
          });
        }
      }
    );
  },
  deleteTodo: (req, res) => {
    con.query(queries.deleteTask, [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send({
          error: "Deletion failed",
        });
      } else {
        getTasks(req, res);
      }
    });
  },
};
