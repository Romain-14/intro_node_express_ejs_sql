// commonJS
// const express = require('express');

// module
import {fileURLToPath} from "url";
import path from "path";
import express from 'express';
import mysql from 'mysql';
import 'dotenv/config';

// import productsController from './controllers/products.controller.js';


let pool = mysql.createPool({
	connectionLimit: 10000,
	host: "localhost",
	user: "root",
	password: "",
	database: "intro_sql_fsjs12",
});

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT;
const { HOST_DB, DATABASE_NAME, USERNAME_DB, PASSWORD_DB  } = process.env;

app.use(express.static(path.join(__dirname + '/public')));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// parametrage du moteur et du dossier de la vue
app.set('views', "./views");
app.set('view engine', "ejs");


app.get("/", (request, response) => {
    const data = "ro 14";
    // response.json({
    //     status: 200,
    //     msg: "Welcome to my app !"
    // })
    response.render("layout", {template: "home", name: data});
})


app.get('/form', (req,res)=>{
    res.render('layout', { template: "form"})
})

app.post('/form', (req,res)=>{
    console.log(req.body);
    pool.query('INSERT INTO products (alias, price, id_category) VALUES (?,?,?)',
    [req.body.alias, req.body.price, req.body.id_category],
     (err, result)=>{
         if(err){
             console.log(err);
         }
        console.log(result);
        res.redirect('/');
    })

})


app.listen(PORT, ()=>{
    console.log(`listening at : http://localhost:${PORT}`);
})