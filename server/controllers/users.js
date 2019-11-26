var connection = require("../services/mysql");
var jwt = require("jsonwebtoken");
class userControllers {
  static login(req, res, next) {
    let username = req.query.username;
    let password = req.query.password;

    connection.query(
      `SELECT * FROM users WHERE user_name ="${username}" AND password = "${password}" LIMIT 1`,
      function(err, rows, fields) {
        if (err) {
          throw err;
        }
        console.log(rows.length);

        if (rows.length === 1) {
          const user = rows[0];
          let userToSend = {
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            id: user.id
          };
          if (user.user_name == "admin") {
            jwt.sign({ user }, "isadmin", function(err, token) {
              if (err) res.sendStatus(403);
              console.log(token, userToSend);
              res.json({ isLoggedIn: true, userToSend, token });
            });
          } else if (user.user_name != "admin") {
            jwt.sign({ user }, "isuser", function(err, token) {
              if (err) res.sendStatus(403);
              res.json({ isLoggedIn: true, userToSend, token });
            });
          }
        } else {
          res.sendStatus(403);
        }
      }
    );
  }

  static register(req, res, next) {
    let user_name = req.body.data.username;
    let first_name = req.body.data.first_name;
    let last_name = req.body.data.last_name;
    let password = req.body.data.password;
    console.log(req.body.data.username);

    connection.query(
      `SELECT * FROM users WHERE user_name="${user_name}"`,
      function(err, rows, fields) {
        if (err) throw err;
        if (rows[0] == null) {
          connection.query(
            `INSERT INTO users (first_name,last_name,user_name,password , role) VALUES ("${first_name}" , "${last_name}" , "${user_name}" , "${password}" , "2")`,
            function(err, rows, fields) {
              console.log(rows);
              res.redirect("/");
            }
          );
        } else {
          res.send("user exists flease select difernet username");
        }
      }
    );
  }
}

module.exports = userControllers;
