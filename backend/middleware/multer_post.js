//multer => package pour gérer les requêtes HTTP avec envoie de fichier

//====================================================================
//                      importation Package

const multer = require('multer');

//====================================================================
//création collection des différents types d'extensions (dictionnaire)
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

//====================================================================
//      configuration gestion téléchargement des images entrantes

const storage = multer.diskStorage({
  //répertoire de destination
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../../client/public/uploads/posts/`);
  }, // end destination

  //nom du fichier téléchargé
  filename: (req, file, callback) => {
    // suppression des espaces dans nom d'origine
    const name = file.originalname.split(' ').join('_');
    //ajout extension + time stamp pour rendre nom unique
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + extension);
  }, //end filename
}); // end diskStorage

//====================================================================
//              exportation du middleware multer

module.exports = multer({ storage }).single('file');
