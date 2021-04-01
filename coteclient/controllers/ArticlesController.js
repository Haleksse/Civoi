let model = require("../models/vip.js");
let async = require("async");

// ////////////////////// A R T I C L E S   D E S   S T A R S

module.exports.articlesAll = function(request, response){
    response.title = 'Articles des stars';

    async.parallel ([
      function (callback){
        model.listeVipArticle(function(err, result){callback(null,result)});
      }
    ],
      function(err,result){

        if (err) {
          console.log(err);
          return;
        }
        response.vipListe = result[0];

        response.render('articlesMain', response);
      }
    );
  }

module.exports.articlesVip = function(request, response){
    response.title = 'Article des stars';
    let data = request.params.VIP_NUMERO;

    async.parallel ([
      function (callback){
        model.afficherArticleVip(data,function(err, result){callback(null,result)});
      },
      function (callback){
        model.listeVipArticle(function(err, result){callback(null,result)});
      }

    ],
      function(err,result){

        if (err) {
          console.log(err);
          return;
        }
        response.article = result[0];
        response.vipListe = result[1];


        response.render('articleVip', response);
      }
    );
  }
