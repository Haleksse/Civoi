let model = require("../models/vip.js");
let async = require('async');


// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';
   model.repertoire(function(err, result){  // appel le module test qui exécute la requete SQL
     if (err) {
         console.log(err);
         return;
     }
    response.Name_1 = result; // result contient : [ RowDataPacket { NB: 37 } ]

    response.render('repertoireVips', response);
} )
}

module.exports.nameVips = 	function(request, response){
	let data = request.params.Lettre1;
   response.title = 'Répertoire des stars';
   async.parallel([
   function(callback){
	   model.repertoire(function(err,result){callback(null,result)});
   },
   function(callback){
	   model.nameVips(data,function(err, result){callback(null,result)});
   },
	 ],
   function(err,result){
     if (err) {
         console.log(err);
         return;
     }
	response.Name_1 = result[0];
    response.nameVips = result[1];
    response.render('NameVips', response);
} );
}

module.exports.starResum = 	function(request, response){
	let data = request.params.VIP_NUMERO;
   response.title = 'Répertoire des stars';
   async.parallel([
   function(callback){
	   model.repertoire(function(err,result){callback(null,result)});
   },
   function(callback){
	   model.starResum(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.estActeur(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.estMannequin(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.mariageVip(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.estLier(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.estRealisateur(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.estCouturier(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.estChanteur(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.estHomme(data,function(err, result){callback(null,result)});
   },
   function(callback){
	   model.photosVip(data,function(err, result){callback(null,result)});
   },
	 ],
   function(err,result){
     if (err) {
         console.log(err);
         return;
     }
	response.Name_1 = result[0];
  response.starResum = result[1];
	response.estActeur = result[2];
	response.estMannequin = result[3];
  response.mariagesVip = result[4];
  response.estLier = result[5];
  response.estRealisateur = result[6];
  response.estCouturier = result[7];
  response.estChanteur = result[8];
  response.estHomme = result[9];
  response.photosVip = result[10];

    response.render('vipResum', response);
} );
}
