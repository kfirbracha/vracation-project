var connection = require("../services/mysql");
var formidable = require("formidable");
class vacation {
  static allVacation(req, res, next) {
    connection.query(
      `SELECT vacation.id,vacation.description,vacation.destination,vacation.image_path_name,DATE_FORMAT(vacation.date_from ,'%Y-%m-%d') date_from,DATE_FORMAT(vacation.date_to ,'%Y-%m-%d') date_to,price FROM vacation`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
      }
    );
  }

  static getImg(req, res, next) {
    console.log(__dirname);
    console.log(req.params.file);

    res.sendFile(__dirname + "/uploads/" + req.params.file);
  }

  static addVacation(req, res, next) {
    var fileName = "";
    var form = new formidable.IncomingForm();
    form.on("fileBegin", function(name, file) {
      file.path = __dirname + "/uploads/" + file.name;
      fileName = file.name;
      console.log(fileName);
    });

    form.parse(req, (err, fields, files) => {
      //files =====>>> need to insert file name and siplay not working
      let parsedData = JSON.parse(fields.data);
      let description = parsedData.description;
      let destination = parsedData.destination;
      let date_from = parsedData.date_from;
      let date_to = parsedData.date_to;
      let price = parsedData.price;
      let image_path_name =
        "http://localhost:3000/controllers/uploads/" + fileName;

      connection.query(
        `INSERT INTO vacation(description , destination ,image_path_name ,date_from,date_to,price) VALUES("${description}" ,"${destination}" ,"${image_path_name}" ,"${date_from}" ," ${date_to}","${price}")`,
        function(err, rows, fields) {
          if (err) {
            res.send(err);
          }
          console.log(rows);

          res.send(rows);
        }
      );
    });

    form.on("file", function(name, file) {
      console.log("Uploaded " + file.name);
    });
  }

  static deleteVacation(req, res, next) {
    console.log(req.params.id);
    let id = req.params.id;

    connection.query(`DELETE FROM vacation WHERE id="${id}"`, function(
      err,
      rows,
      fields
    ) {
      console.log(rows);
      res.send(rows);
    });
  }

  static getSingle(req, res, next) {
    console.log(req.params.id);

    let id = req.params.id;
    connection.query(`SELECT *FROM vacation WHERE id="${id}"`, function(
      err,
      rows,
      fields
    ) {
      if (err) throw err;
      console.log(rows[0]);
      res.send(rows[0]);
    });
  }

  static editVacation(req, res, next) {
    let id = req.param.id;
    let description = req.body.description;
    let destination = req.body.destination;
    let image_path_name = req.body.image_path_name;
    let date_from = req.body.date_from;
    let date_to = req.body.date_to;
    let price = req.body.price;
    let followers = req.body.followers;
    console.log(title, body);
    console.log(
      `UPDATE vacation SET description = "${description}" , destination= "${destination}" image_path_name ="${image_path_name}", date_from="${date_from}", date_to="${date_to}" price="${price}" , followers="${followers}" WHERE id = ${id}`
    );
    connection.query(
      `UPDATE vacation SET description = "${description}" , destination= "${destination}" image_path_name ="${image_path_name}", date_from="${date_from}", date_to="${date_to}" price="${price}" , followers="${followers}" WHERE id = ${id}`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log("The solution is: ", rows);
        res.redirect("/");
      }
    );
  }
}

module.exports = vacation;
