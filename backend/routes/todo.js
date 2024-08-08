const express = require("express");
const router = express.Router();
const todo = require("../controller/todo");
const verify = require("../middleware/verify");

router.get("/", verify, todo.getTodo);
router.post("/add/", verify, todo.addTodo);
router.put("/edit/:id", verify, todo.editTodo);
router.delete("/delete/:id/", verify, todo.deleteTodo);

module.exports = router;
