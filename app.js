// commonJS
// const express = require('express');

// module
import {fileURLToPath} from "url";
import path from "path";
import express from 'express';
import mysql from 'promise-mysql';
import 'dotenv/config';

import productsController from './controllers/products.controller.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT;
const { HOST_DB, DATABASE_NAME, USERNAME_DB, PASSWORD_DB  } = process.env;

app.use(express.static(path.join(__dirname + '/public')));

// parametrage du moteur et du dossier de la vue
app.set('views', "./views");
app.set('view engine', "ejs");

// on établit la connexion à la base de donnée
mysql.createConnection({
    host: HOST_DB,
    database: DATABASE_NAME,
    user: USERNAME_DB,
    password: PASSWORD_DB,
}).then(db=>{
    console.log(`connected to : ${db.config.database}`);
    setInterval(() => {
        let test = db.query("SELECT 1");
    }, 10000);

    // on appelle la tour de controle en transmettant les infos de la BDD(db) et la variable qui contient les methodes d'express
    productsController(app, db);

}).catch(err => {
    console.log(err);
})

app.get("/", (request, response) => {
    const data = "ro 14";
    // response.json({
    //     status: 200,
    //     msg: "Welcome to my app !"
    // })
    response.render("template", {template: "home", name: data});
})


app.get("/blog", (request, response) => {
    const data = "ro 14";
    // response.json({
    //     status: 200,
    //     msg: "Welcome to my app !"
    // })
    response.render("template", {template: "blog", name: data});
})


app.listen(PORT, ()=>{
    console.log(`listening at : http://localhost:${PORT}`);
})