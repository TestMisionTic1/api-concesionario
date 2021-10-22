// hacer el import express tradicional
// const express = require("express");

import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config({ path: "./.env" });

const StringConexion = process.env.DATABASE_URL;

const client = new MongoClient(StringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get("/vehiculos", (req, res) => {
  console.log("Alguien hizo get enla ruta /vehiculos");
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

app.post("/vehiculos/nuevo", (req, res) => {
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

app.patch("/vehiculos/editar", (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroVehiculo = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
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

app.delete("/vehiculos/eliminar", (req, res) => {
  const filtroVehiculo = { _id: new ObjectId(req.body.id) };
  conexion.collection("vehiculo").deleteOne(filtroVehiculo, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.log("Error conectando a la base de datos");
      return "error";
    }
    conexion = db.db("concesionario");
    console.log("conexion exitosa");
    return app.listen(process.env.PORT, () => {
      console.log(`escuchando puerto ${process.env.PORT}`);
    });
  });
};

main();
