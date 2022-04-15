# intro_node_express_ejs_sql

créer le nom de l'app -> api_node

cd api_node
npm init -y (-y pour ne pas répondre au questionnaire)

npm i nodemon -D (-D pour installer ce module uniquement en mode développement)

npm i express ejs

dans package.json, modifier la prop' "type" en "start" et sa value en "node nomDuFichier"

pour lancer le serveur :
npm start

sinon :
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
