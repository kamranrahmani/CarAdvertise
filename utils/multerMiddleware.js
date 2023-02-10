const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const uuid = require('uuid');

const cStorage = new Storage({projectId:process.env.GCLOUD_PROJECT, credentials:{client_email:process.env.GCLOUD_CLIENT_EMAIL, private_key:process.env.GCLOUD_PRIVATE_KEY}});

const bucket = cStorage.bucket(process.env.GCS_BUCKET);

//********** multer disk storage config  ****************/

// const storage = multer.diskStorage({
//     destination: function(req,file,callback){
//         callback(null, 'images')
//     },
//     filename: function(req,file,callback){
//         let extArray = file.mimetype.split("/");
//         let extension = extArray[extArray.length - 1];
//         callback(null, Date.now() + '-' + uuid.v4() + '.'+extension);
//     }
// })

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: (req,file,callback)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            callback(null, true);
        }
        else{
            return callback(new Error('invalid file type'));
        }
    }
});

const uploadObj = upload.array('images',10);

module.exports = {
    uploadObj , bucket
}
