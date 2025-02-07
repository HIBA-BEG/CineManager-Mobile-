const multer = require ('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage }).fields([{ name: 'affiche', maxCount: 1 }, { name: 'video' , maxCount: 1 }, { name: 'profilePic', maxCount: 1}, { name: 'trailer', maxCount: 1}]);

module.exports = upload;