import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const queryAllVehicules = async (callback) => {
  const conexion = getDB();
  await conexion.collection("vehiculo").find({}).limit(50).toArray(callback);
};

const crearVehiculo = async (datosVehiculo, callback) => {
  if (
    Object.keys(datosVehiculo).includes("name") &&
    Object.keys(datosVehiculo).includes("brand") &&
    Object.keys(datosVehiculo).includes("model")
  ) {
    const conexion = getDB();

    await conexion.collection("vehiculo").insertOne(datosVehiculo, callback);
  } else {
    return "error";
  }
};

export { queryAllVehicules, crearVehiculo };
