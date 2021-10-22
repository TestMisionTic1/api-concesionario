import Express from "express";
import { getDB } from "../../db/db.js";

const rutasVehiculo = Express.Router();

rutasVehiculo.route("/vehiculos").get((req, res) => {
  console.log("Alguien hizo get enla ruta /vehiculos");
  const conexion = getDB();
  conexion
    .collection("vehiculo")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send("Error consultando los vehiculos");
      } else {
        res.json(result);
      }
    });
});

rutasVehiculo.route("/vehiculos/nuevo").post((req, res) => {
  console.log(req);
  const datosVehiculo = req.body;
  console.log("llaves: ", Object.keys(datosVehiculo));
  try {
    if (
      Object.keys(datosVehiculo).includes("name") &&
      Object.keys(datosVehiculo).includes("brand") &&
      Object.keys(datosVehiculo).includes("model")
    ) {
      // implementar codigo para crear vehiculo en la base de dato
      const conexion = getDB();
      conexion
        .collection("vehiculo")
        .insertOne(datosVehiculo, (err, result) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(200);
          }
        });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

rutasVehiculo.route("/vehiculos/editar").patch((req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroVehiculo = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const conexion = getDB();
  conexion.collection("vehiculo").findOneAndUpdate(
    filtroVehiculo,
    operacion,
    {
      upsert: true,
      returnOriginal: true,
    },
    (err, result) => {
      if (err) {
        console.error("error actualizando el vehiculo", err);
        res.sendStatus(500);
      } else {
        console.log("Actualizado con exito");
        res.sendStatus(200);
      }
    }
  );
});

rutasVehiculo.route("/vehiculos/eliminar").delete((req, res) => {
  const filtroVehiculo = { _id: new ObjectId(req.body.id) };
  const conexion = getDB();
  conexion.collection("vehiculo").deleteOne(filtroVehiculo, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

export default rutasVehiculo;
