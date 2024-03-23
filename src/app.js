import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

//Inicio motor de plantillas
app.engine("handlebars", handlebars.engine());

//Establezco la ruta de las vistas
app.set("views", `${__dirname}/views`);

//Establezco el motor de renderizado
app.set("view engine", "handlebars");

//Establezco el servidor estático de archivos
app.use(express.static(`${__dirname}/../public`));

//Utilizo en la ruta base mi grupo de views routes
app.use("/", viewsRouter);

//Inicio mi server HTTP y lo almaceno en una constante
const PORT = 8080;
const BASE_URL = "http://localhost"
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en ${BASE_URL}:${PORT}`);
});

//Inicio mi server socket
const io = new Server(httpServer);

io.on("connection", socket => {
    console.log("Nuevo cliente conectado: ", socket.id);
});