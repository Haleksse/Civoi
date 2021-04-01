let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.repertoire = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT left (VIP_NOM,1) AS Lettre1 FROM `vip` Order by 1;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.nameVips = function(Lettre1,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
			let sql = "SELECT DISTINCT VIP_NOM,VIP_PRENOM,v.VIP_NUMERO,PHOTO_ADRESSE,PHOTO_NUMERO FROM `vip` v INNER JOIN PHOTO p ON v.VIP_NUMERO = p.VIP_NUMERO " +
			" where VIP_NOM like '"+Lettre1+"%' and PHOTO_NUMERO=1;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
	});
};
//---------------VIP RESUME---------------//

module.exports.starResum = function(VIP_NUMERO,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
	let sql = "SELECT DISTINCT VIP_NOM,VIP_PRENOM,v.VIP_NUMERO,NATIONALITE_NOM,VIP_TEXTE,VIP_NAISSANCE,PHOTO_ADRESSE,PHOTO_COMMENTAIRE,VIP_SEXE FROM `vip` v "
	+ " INNER JOIN `photo` p ON v.VIP_NUMERO = p.VIP_NUMERO INNER JOIN `nationalite` n ON n.NATIONALITE_NUMERO = v.NATIONALITE_NUMERO "
	+ " where v.VIP_NUMERO = "+VIP_NUMERO+" AND PHOTO_NUMERO=1;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estHomme = function(VIP_NUMERO,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
	let sql = "SELECT DISTINCT VIP_SEXE FROM `vip` v where v.VIP_NUMERO = "+VIP_NUMERO+" And VIP_SEXE = 'M';";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estActeur = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE,"
            + " 'acteur' AS nom, FILM_TITRE, FILM_DATEREALISATION, ROLE_NOM FROM vip v, joue j, film f, photo p"
            + " WHERE j.VIP_NUMERO="+VIP_NUMERO+""
            + " AND v.VIP_NUMERO = p.VIP_NUMERO"
            + " AND PHOTO_NUMERO = 1"
            + " AND j.FILM_NUMERO = f.FILM_NUMERO"
            + " AND f.VIP_NUMERO = v.VIP_NUMERO"
            + " AND NOT(v.VIP_NUMERO = "+VIP_NUMERO+")";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estMannequin = function(VIP_NUMERO,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
	let sql = "SELECT DEFILE_LIEU,DEFILE_DATE,v1.VIP_NOM,v1.VIP_PRENOM,AGENCE_NOM FROM `vip` v "
	+ " INNER JOIN `mannequin` m ON v.VIP_NUMERO = m.VIP_NUMERO INNER JOIN `apouragence` ap ON ap.VIP_NUMERO = m.VIP_NUMERO "
	+ " INNER JOIN `agence` ag ON ag.AGENCE_NUMERO = ap.AGENCE_NUMERO INNER JOIN `defiledans` dd ON dd.VIP_NUMERO = m.VIP_NUMERO "
	+ " INNER JOIN `defile` d ON d.DEFILE_NUMERO = dd.DEFILE_NUMERO INNER JOIN `couturier` c ON c.VIP_NUMERO = d.VIP_NUMERO "
	+ " INNER JOIN `vip` v1 ON c.VIP_NUMERO = v1.VIP_NUMERO "
	+ " where v.VIP_NUMERO = "+VIP_NUMERO+"";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.mariageVip = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "(SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE, MARIAGE_LIEU, MARIAGE_FIN, DATE_EVENEMENT FROM vip v, mariage m, photo p"
            + " WHERE v.VIP_NUMERO=m.VIP_VIP_NUMERO"
            + " AND m.VIP_NUMERO= "+VIP_NUMERO+""
            + " AND v.VIP_NUMERO = p.VIP_NUMERO"
            + " AND PHOTO_NUMERO = 1)"
            + " UNION"
            + " (SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE, MARIAGE_LIEU, MARIAGE_FIN, DATE_EVENEMENT FROM vip v, mariage m, photo p"
            + " WHERE v.VIP_NUMERO=m.VIP_NUMERO"
            + " AND m.VIP_VIP_NUMERO= "+VIP_NUMERO+""
            + " AND v.VIP_NUMERO = p.VIP_NUMERO"
            + " AND PHOTO_NUMERO = 1)";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estLier = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
          let sql =   "(SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE, DATE_EVENEMENT, LIAISON_MOTIFFIN FROM vip v, liaison l, photo p"
          + " WHERE v.VIP_NUMERO=l.VIP_VIP_NUMERO"
          + " AND l.VIP_NUMERO="+VIP_NUMERO+""
          + " AND v.VIP_NUMERO = p.VIP_NUMERO"
          + " AND PHOTO_NUMERO = 1)"
          + " UNION"
          + " (SELECT substring(VIP_NOM,1,1)AS lettreStar, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, VIP_TEXTE, PHOTO_NUMERO, PHOTO_ADRESSE, DATE_EVENEMENT, LIAISON_MOTIFFIN FROM vip v, liaison l, photo p"
          + " WHERE v.VIP_NUMERO=l.VIP_NUMERO"
          + " AND l.VIP_VIP_NUMERO="+VIP_NUMERO+""
          + " AND v.VIP_NUMERO = p.VIP_NUMERO"
          + " AND PHOTO_NUMERO = 1)";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estRealisateur = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT r.VIP_NUMERO, FILM_TITRE, FILM_DATEREALISATION, VIP_SEXE, ROLE_NOM"
            + " FROM realisateur r LEFT JOIN film f ON r.VIP_NUMERO=f.VIP_NUMERO"
            + " JOIN vip v ON r.VIP_NUMERO=v.VIP_NUMERO"
            + " LEFT JOIN joue j ON r.VIP_NUMERO = j.VIP_NUMERO"
            + " WHERE r.VIP_NUMERO = "+VIP_NUMERO+"";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estCouturier = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT c.VIP_NUMERO, DEFILE_LIEU, DEFILE_DATE, VIP_SEXE"
            + " FROM couturier c LEFT JOIN defile d ON c.VIP_NUMERO = d.VIP_NUMERO"
            + " JOIN vip v ON c.VIP_NUMERO = v.VIP_NUMERO"
            + " WHERE c.VIP_NUMERO = "+VIP_NUMERO+"";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estChanteur = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT DISTINCT 'chanteur' AS nom, ALBUM_TITRE, ALBUM_DATE, CHANTEUR_SPECIALITE,"
            + " MAISONDISQUE_NOM FROM vip v, photo p, composer co, album a, chanteur ch, maisondisque m"
            + " WHERE ch.VIP_NUMERO= "+VIP_NUMERO+""
            + " AND ch.VIP_NUMERO = co.VIP_NUMERO"
            + " AND co.VIP_NUMERO = p.VIP_NUMERO"
            + " AND PHOTO_NUMERO = 1"
            + " AND co.ALBUM_NUMERO = a.ALBUM_NUMERO"
            + " AND a.MAISONDISQUE_NUMERO = m.MAISONDISQUE_NUMERO";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.photosVip = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT PHOTO_NUMERO, PHOTO_ADRESSE, PHOTO_SUJET, PHOTO_COMMENTAIRE FROM photo"
            + " WHERE VIP_NUMERO = "+VIP_NUMERO+" AND PHOTO_NUMERO != 1";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
//---------------VIP ARTICLES---------------//

module.exports.afficherArticleVip = function(VIP_NUMERO,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT VIP_NOM, VIP_PRENOM, v.VIP_NUMERO, ARTICLE_TITRE, ARTICLE_RESUME, ARTICLE_DATE_INSERT"
            + " FROM vip v LEFT JOIN apoursujet a ON v.VIP_NUMERO=a.VIP_NUMERO"
            + " LEFT JOIN article ar ON a.ARTICLE_NUMERO=ar.ARTICLE_NUMERO"
            + " WHERE v.VIP_NUMERO = "+VIP_NUMERO+"";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.listeVipArticle = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT VIP_NOM, VIP_PRENOM, VIP_NUMERO FROM vip"
            + " ORDER BY VIP_NOM";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//---------------VIP ALBUMS---------------//
module.exports.listePhotosPrincipales = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE"
            + " FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE PHOTO_NUMERO = 1";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.commentairePhotos = function(VIP_NUMERO, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT PHOTO_COMMENTAIRE, PHOTO_ADRESSE, VIP_NOM, VIP_PRENOM, v.VIP_NUMERO"
            + " FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO"
            + " WHERE v.VIP_NUMERO ="+VIP_NUMERO+"";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
