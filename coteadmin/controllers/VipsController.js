let model = require("../models/vip.js");
let async = require("async");

module.exports.vips = function(request, response){
    response.title = "Administration vips";
    response.render('vips', response);
};


/////////////////////////////Ajout////////////////////////////

module.exports.AjouterVipTest = function(request, response){
    response.title = "Administration vips";
    model.nationalites(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

       response.nationalites = result;

       response.render('formulaireVip', response);
     } );
};

module.exports.AjouterVip = function(request, response){
    response.title = "Administration vips";

    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let sexe = request.body.sexe;
    let datenaissance = request.body.datenaissance;
    let nationalite = request.body.nationalite;
    let commentaire = request.body.commentaire;
    let photo_adresse = request.body.photo;
    let photo_sujet = request.body.photo_sujet;
    let photo_commentaire = request.body.photo_commentaire;

    let vip = {'NATIONALITE_NUMERO': nationalite,'VIP_NOM': nom, 'VIP_PRENOM': prenom,'VIP_SEXE': sexe, 'VIP_NAISSANCE': datenaissance, 'VIP_TEXTE': commentaire};
    let photoVip = {'PHOTO_SUJET': photo_sujet, 'PHOTO_COMMENTAIRE': photo_commentaire, 'PHOTO_ADRESSE': photo_adresse};

     async.series([
         function(callback){
           model.nationalites(function(err, result) {
             callback(null, result)
           });
         },
         function(callback){
            model.InsererVip(vip, function(err2, result2) {
              callback(null, result2);
            });
         }
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }

          response.nationalites = result[0];

          model.InsererPhotoVip(photoVip, result[1].insertId);

          response.render('formulaireVip', response);
     });
};


/////////////////////////////Modification////////////////////////////

module.exports.ModifierVipTest = function(request, response){
    response.title = "Administration vips";
    async.series([
        function(callback){
          model.nationalites(function(err, result) {
            callback(null, result)
          });
        },
        function(callback){
             model.vips(function(err2, result2) {
               callback(null, result2);
             });
        }
    ],
    function(err, result){
         if (err){
              console.log(err);
              return;
         }

         response.nationalites = result[0];
         response.vips = result[1];
         response.modif = true;

         response.render('formulaireVip', response);
    });
};

module.exports.ModifierVip = function(request, response){
    response.title = "Administration vips";

    let vipNum = request.body.vip;
    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let sexe = request.body.sexe;
    let datenaissance = request.body.datenaissance;
    let nationalite = request.body.nationalite;
    let commentaire = request.body.commentaire;
    let photo_adresse = request.body.photo;
    let photo_sujet = request.body.photo_sujet;
    let photo_commentaire = request.body.photo_commentaire;

    let vip = {'VIP_NUMERO': vipNum, 'NATIONALITE_NUMERO': nationalite,'VIP_NOM': nom, 'VIP_PRENOM': prenom,'VIP_SEXE': sexe, 'VIP_NAISSANCE': datenaissance, 'VIP_TEXTE': commentaire};
    let photoVip = {'VIP_NUMERO': vipNum, 'PHOTO_SUJET': photo_sujet, 'PHOTO_COMMENTAIRE': photo_commentaire, 'PHOTO_ADRESSE': photo_adresse};

     async.series([
         function(callback){
           model.nationalites(function(err, result) {
             callback(null, result)
           });
         },
         function(callback){
           model.vips(function(err2, result2) {
             callback(null, result2)
           });
         },
         function(callback){
              model.UpdateVip(vip, function(err3, result3) {
                callback(null, result3);
              });
         },
         function(callback){
              model.UpdatePhotoVip(photoVip, function(err4, result4) {
                callback(null, result4)
              });
         }
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }

          response.nationalites = result[0];
          response.vips = result[1];
          response.modif = true;
 
          response.render('formulaireVip', response);
     });
};


/////////////////////////////Suppression//////////////////////////////

module.exports.SupprimerVipTest = function(request, response){
    response.title = "Administration vips";
    model.vips(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

       response.vips = result;

       response.render('supprimerVip', response);
     } );
};

module.exports.SupprimerVip = function(request, response){
    response.title = "Administration vips";

    let vipNum = request.body.vip;

     async.series([
         function(callback){
           model.vips(function(err, result) {
             callback(null, result)
           });
         },
         function(callback){
            model.DeleteVip(vipNum, function(err3, result3) {
              callback(null, result3);
            });
         }
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }

          response.vips = result[0];

          response.render('supprimerVip', response);
     });
};
