const con = require("../connection");
const jwt = require("jsonwebtoken");
const queries = require("../dbQueries");
const bcrypt = require("bcrypt");

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    con.query(queries.getUser, [email], (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Internal server error",
        });
      } else {
        if (result.length == 0) {
          res.status(404).send({
            message: "User not found",
          });
        } else {
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) throw err;
            if (response) {
              const payload = {
                id: result[0].id,
              };
              const token = jwt.sign(payload, "secret_key");
              res.status(200).send({
                message: "Login successful",
                token,
              });
            } else
              res.status(401).send({
                message: "Invalid credentials",
              });
          });
        }
      }
    });
  },

  register: (req, res) => {
    const { email, password } = req.body;
    con.query(queries.getUser, [email], async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(409).send({
          message: "User already exists",
        });
      } else {
        const hashed = await bcrypt.hash(password, 10);
        con.query(queries.addUser, [email, hashed], (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Internal server error",
            });
          } else {
            con.query(queries.getUser, [email], async (err, result) => {
              if (err) {
                res.status(500).send({
                  message: "Internal server error",
                });
              } else {
                const payload = {
                  id: result[0].id,
                };
                const token = jwt.sign(payload, "secret_key");
                res.status(200).send({
                  message: "Signup successful",
                  token,
                });
              }
            });
          }
        });
      }
    });
  },

  changePassword: (req, res) => {
    const { oldPassword, newPassword } = req.body;
    con.query(queries.getUserById, [req.uid], (err, result) => {
      if (err) throw err;
      bcrypt.compare(oldPassword, result[0].password, async (err, response) => {
        if (!response) {
          res.status(401).send({
            message: "Invalid credentials",
          });
        } else {
          const hashed = await bcrypt.hash(newPassword, 10);
          con.query(
            queries.updatePassword,
            [hashed, req.uid],
            (err, result) => {
              if (err)
                res.send({
                  status: 500,
                });
              else {
                res.send({
                  status: 202,
                });
              }
            }
          );
        }
      });
    });
  },
};
