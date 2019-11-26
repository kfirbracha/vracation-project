var connection = require("../services/mysql");
class followers {
  static addFollow(req, res, next) {
    let vacation_id = req.param.vacation_id;
    let user_id = req.param.user_id;
    connection.query(
      `INSERT INTO followers(vacation_id , user_id) VALUES ("${vacation_id}" , "${user_id}")`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log(rows[0]);
      }
    );
  }

  static deleteFollow(req, res, next) {
    let vacation_id = req.param.vacation_id;
    let user_id = req.param.user_id;
    connection.query(
      `DELETE from followers WHERE vacation_id = "${vacation_id}" AND user_id = "${user_id}"`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log(rows[0]);
      }
    );
  }

  static editFollow(res, req, next) {}
}

module.exports = followers;
