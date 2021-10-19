// hacer el import express tradicional
// const express = require("express");

import Express from "express";

const app = Express();
app.use(Express.json());

app.get("/vehiculos", (req, res) => {
  console.log("Alguien hizo get enla ruta /vehiculos");
  const vehiculos = [
    { nombre: "Corolla", marca: "Toyota", modelo: 2014 },
    { nombre: "Yaris", marca: "Toyota", modelo: 2020 },
    { nombre: "Fiesta", marca: "Ford", modelo: 2020 },
    { nombre: "Cx30", marca: "Mazda", modelo: 2020 },
  ];
  res.send(vehiculos);
});

app.post("/vehiculos/nuevo", (req, res) => {
  const datosVehiculo = req.body;
  console.log("llaves: ", Object.keys(datosVehiculo));
  try {
    if (
      Object.keys(datosVehiculo).includes("name") &&
      Object.keys(datosVehiculo).includes("brand") &&
      Object.keys(datosVehiculo).includes("model")
    ) {
      // implementar codigo para crear vehiculo en la base de dato
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log("escuchando puerto 5000");
});
