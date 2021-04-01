let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let TestController = require('./../controllers/TestController');
let ArticlesController = require('./../controllers/ArticlesController');



// Routes
module.exports = function(app){

  // tests à supprimer
    app.get('/test', TestController.Test);

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.repertoire);
	app.get('/repertoire/:Lettre1', VipController.nameVips);
	app.get('/vip/:VIP_NUMERO', VipController.starResum);
//articles
app.get('/articles', ArticlesController.articlesAll);
app.get('/articles/:VIP_NUMERO', ArticlesController.articlesVip);

 // albums
 app.get('/album', AlbumController.ListerAlbum);
  app.get('/album/:VIP_NUMERO', AlbumController.ListerAlbum);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
