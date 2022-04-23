const multer = require("multer");
const config = require("../../config.json");
var multerS3 = require('multer-s3');
const aws = require("aws-sdk");
aws.config.update({
    accessKeyId: config.awsAccessKeyId ,
    secretAccessKey: config.awsSecretAccesskey
  });
s3 = new aws.S3();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multerS3({
  limits: 500000,
  acl: "public-read",
  s3,
  bucket: config.awsBucketName ,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
      cb(null, { fieldName: file.fieldname });
    }
    cb(error);


    //  cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    let removeSpecialCharacters = file.originalname.toLowerCase().replace(/[^A-Z0-9.]+/ig, "-");
    //  const name = Date.now()+file.originalname.toLowerCase().split(" ").join("-");
    const name = Date.now() + removeSpecialCharacters;
    //  const name = Date.now()+file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];

    cb(null, name);
    //  cb(null, destinationPath + "/" + file.originalname);
  },
});


var uploadImages = multer({
  storage: storage,
  limits: { fieldSize: 8 * 1024 * 1024 },
}).fields([
  { name: "productImage", maxCount: 6 }
]);
// var discriptionUploads = multer({
//   storage: storage,
//   limits: { fieldSize: 8 * 1024 * 1024 },
// }).fields([

//   { name: "image", maxCount: 1 },
// ]);

module.exports = {
  uploadImages,
  // fileUpload
};
