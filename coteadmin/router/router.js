let ConnexionController = require('./../controllers/ConnexionController');
let HomeController = require('./../controllers/HomeController');
let VipsController =  require('./../controllers/VipsController');
let PhotosController =  require('./../controllers/PhotosController');



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/Home', HomeController.Index);

//Connexion
    app.post('/Connexion', ConnexionController.Connexion);
    app.get('/PageConnexion', ConnexionController.testConnexion);
    app.get('/Deconnexion', ConnexionController.Deconnexion);

//Vips
    app.get('/Vips', ConnexionController.testConnexion, VipsController.vips);

    //Ajouter
        app.get('/Vips/AjouterTest', ConnexionController.testConnexion, VipsController.AjouterVipTest);
        app.post('/Vips/Ajouter', ConnexionController.testConnexion, VipsController.AjouterVip);

    //Modifier
        app.get('/Vips/ModifierTest', ConnexionController.testConnexion, VipsController.ModifierVipTest);
        app.post('/Vips/Modifier', ConnexionController.testConnexion, VipsController.ModifierVip);

    //Supprimer
        app.get('/Vips/SupprimerTest', ConnexionController.testConnexion, VipsController.SupprimerVipTest);
        app.post('/Vips/Supprimer',  ConnexionController.testConnexion, VipsController.SupprimerVip);

//Photos
    app.get('/Photos', ConnexionController.testConnexion, PhotosController.photos);

    //Ajouter
        app.get('/Photos/AjouterTest', ConnexionController.testConnexion, PhotosController.AjouterPhotoTest);
        app.post('/Photos/Ajouter', ConnexionController.testConnexion, PhotosController.AjouterPhoto);

    //Supprimer
        app.get('/Photos/SupprimerTest', ConnexionController.testConnexion, PhotosController.SupprimerPhotoTest);
        app.post('/Photos/Selectionner', ConnexionController.testConnexion, PhotosController.SelectionnerPhoto);
        app.post('/Photos/Supprimer/:vipNum', ConnexionController.testConnexion, PhotosController.SupprimerPhoto);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
