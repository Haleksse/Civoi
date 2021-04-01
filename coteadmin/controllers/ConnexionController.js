let model = require("../models/vip.js");
let Cryptr = require("cryptr");
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');

//////////////////////////////////////////////////////////////// C O N N E X I O N

module.exports.testConnexion = function(request, response, next){
  response.title = "Connexion";

  if (request.session.login == null) {
    response.render('connexion', response);
  } else {
    return next();
  }
};

module.exports.Connexion = function(request, response){
  response.title = "Connexion";

  model.getAuthentification(function(err, result){  // appel le module test qui exécute la requete SQL
    if (err) {
        console.log(err);
        return;
    }

   let id = request.body.login;
   let mdp = request.body.pwd

   let login = result[0]['LOGIN'];
   let passwd = result[0]['PASSWD'];

   let decryptedString = cryptr.decrypt(passwd);

   if (id === login) {
     if (mdp === decryptedString) {
       request.session.login = login;
      //  console.log("Connexion en cours");
      //  console.log("login : " + request.session.login);
       response.render('home', response);
     }
     else {
      //  console.log("Mot de passe incorrect !");
       response.render('connexion', response);
     }
   }
   else {
    //  console.log("Identifiant incorrect !");
     response.render('connexion', response);
   }

 });
};

module.exports.Deconnexion = function(request, response){
  response.title = "Administration";
  request.session.login = null;
  // console.log("Déconnexion en cours");
  response.render('connexion', response);
};