var jwt = require("jsonwebtoken");

class auth {
  // static authMiddleware(req, res, next) {
  //   console.log(req.headers);

  //   const bearerHeader = req.headers["authorization"];
  //   if (typeof bearerHeader !== "undefined") {
  //     const bearer = bearerHeader.split(" ");
  //     bearerToken = bearer[1];
  //     jwt.verify(bearerToken, "kfir", function(err, data) {
  //       if (err) {
  //         res.sendStatus(403, err);
  //       } else {
  //         console.log(data);

  //         userJWT = data;
  //         next();
  //       }
  //     });
  //   } else {
  //     res.sendStatus(403);
  //   }
  // }

  static isAdminMiddleware(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== undefined) {
      const bearer = bearerHeader.split(" ");
      jwt.verify(bearer[0], "isadmin", function(err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
          if (data.user.role === 1) {
            console.log(data);

            req.token = data;

            next();
          } else {
            res.sendStatus(403);
          }
        }
      });
    } else {
      res.sendStatus(403);
    }
  }

  static isUserMiddleware(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      jwt.verify(bearer[0], "isuser", function(err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
          if (data.user.role !== 1) {
            console.log(data);

            req.token = data;
            next();
          } else {
            res.sendStatus(403);
          }
        }
      });
    } else {
      res.sendStatus(403);
    }
  }
}
module.exports = auth;
