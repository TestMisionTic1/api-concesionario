import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const StringConexion = process.env.DATABASE_URL;

const client = new MongoClient(StringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const conectarBD = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.log("Error conectando a la base de datos");
      return "error";
    }
    conexion = db.db("concesionario");
    console.log("conexion exitosa");
    return callback();
  });
};

const getDB = () => {
  return conexion;
};

export { conectarBD, getDB };
