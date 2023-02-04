const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null, 'images')
    },
    filename: function(req,file,callback){
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        callback(null, Date.now() + '-' + uuid.v4() + '.'+extension);
    }
})

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 2
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

module.exports = upload.array('images',10);
