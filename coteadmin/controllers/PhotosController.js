let model = require("../models/vip.js");
let async = require("async");

module.exports.photos = function(request, response){
    response.title = "Administration photos";
    response.render('photos', response);
};


/////////////////////////////Ajout////////////////////////////

module.exports.AjouterPhotoTest = function(request, response){
    response.title = "Administration vips";
    model.vips(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

       response.vips = result;

       response.render('ajouterPhoto', response);
     } );
};

module.exports.AjouterPhoto = function(request, response){
    response.title = "Administration vips";

    let vipNum = request.body.vip;
    let photo_adresse = request.body.photo;
    let photo_sujet = request.body.photo_sujet;
    let photo_commentaire = request.body.photo_commentaire;

    let photoVip = {'VIP_NUMERO': vipNum, 'PHOTO_SUJET': photo_sujet, 'PHOTO_COMMENTAIRE': photo_commentaire, 'PHOTO_ADRESSE': photo_adresse};

     async.series([
         function(callback){
           model.vips(function(err, result) {
             callback(null, result)
           });
         },
         function(callback){
           model.vips(function(err2, result2) {
             callback(null, result2)
           });
         },
         function(callback){
           model.photoNumero(vipNum, function(err3, result3) {
             callback(null, result3)
           });
         }
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }

          response.vips = result[0];

          photoNum = result[2][0]['photoNum'] + 1;

          model.InsererPhoto(photoNum, photoVip);

          response.render('ajouterPhoto', response);
     });
};

/////////////////////////////Suppression//////////////////////////////

module.exports.SupprimerPhotoTest = function(request, response){
    response.title = "Administration vips";
    model.vips(function(err, result){
        if (err) {
            console.log(err);
            return;
        }
       response.vips = result;

       response.render('supprimerPhoto', response);
     } );
};

module.exports.SelectionnerPhoto = function(request, response){
    response.title = "Administration vips";

    let vipNum = request.body.vip;

     async.series([
         function(callback){
           model.vips(function(err, result) {
             callback(null, result)
           });
         },
         function(callback){
           model.photosVip(vipNum, function(err2, result2) {
             callback(null, result2)
           });
         },
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }

          let photoNum = request.body.photoVip;

          response.vips = result[0];
          response.photos = result[1];
          response.vipNum = vipNum;
          
          if (response.photos[0] == null) {
            console.log("Aucune photo à supprimer pour ce vip !");
          }

          response.render('supprimerPhoto', response);
     });
};

module.exports.SupprimerPhoto = function(request, response){
    response.title = "Administration vips";

    let vipNum = request.params.vipNum;

     async.series([
         function(callback){
           model.vips(function(err, result) {
             callback(null, result)
           });
         },
     ],
     function(err, result){
          if (err){
               console.log(err);
               return;
          }

          let photoNum = request.body.photoVip;

          for (var i = 0; i < photoNum.length; i++) {
            model.DeletePhoto(vipNum, photoNum[i]);
          }

          response.vips = result[0];

          response.render('supprimerPhoto', response);
     });
};