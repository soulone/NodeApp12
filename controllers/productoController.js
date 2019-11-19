let db = require('../models/dbconexion');
let fs = require('fs');

let productos = {
  listar(req, res) {
    let sql = "SELECT * FROM productos";
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(result);
      }
    });
  },

  store(req, res) {

    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    var tmp_path = req.files.imagen.path;

    var target_path = './public/images/' + req.files.imagen.name;
    var target_path_name_image = req.files.imagen.name;

    fs.rename(tmp_path, target_path, () => {
      fs.unlink(tmp_path, () => {
        let sql = "INSERT INTO productos(descripcion,precio,imagen) VALUES(?,?,?)";
        db.query(sql, [descripcion, precio, target_path_name_image], function (err, newData) {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.json(newData);
          }
        });
      })
    });
  },

  show(req, res) {
    const { codigo } = req.body;
    let sql = "SELECT * FROM productos WHERE codigo=?";
    db.query(sql, [codigo], function (err, rowData) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(rowData);
      }
    });
  },
  edit(req, res) {
    const { codigo, descripcion, precio } = req.body;
    var tmp_path = req.files.imagen.path;
    var target_path = './public/images/' + req.files.imagen.name;

    console.log('*******************************');
    console.log(req.body);
    console.log(req.files.imagen);
    console.log('*******************************');

    fs.rename(tmp_path, target_path, () => {
      fs.unlink(tmp_path, () => {
        let sql = "UPDATE productos SET descripcion=?, precio=?, image=? WHERE codigo=?";
        db.query(sql, [descripcion, precio, target_path, codigo], function (err, newData) {
          if (err) {
            res.sendStatus(500);
          } else {
            res.json(newData);
          }
        });
      })
    });

  },
  delete(req, res) {
    const xcodigo = req.params.xcodigo;
    let sql = "DELETE FROM productos WHERE codigo=?";
    db.query(sql, [xcodigo], function (err, newData) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  }
}

module.exports = productos;

