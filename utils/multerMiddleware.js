const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const uuid = require('uuid');
require('dotenv').config();

const cStorage = new Storage({projectId:'car-advertise-website', credentials:{client_email:'car-advertise-bucket@car-advertise-website.iam.gserviceaccount.com', private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDG9zqXwPk2h7OK\n5UlYX2LueUy2J1b0vVWHFcdBhgGsv8GbsfzdRTJCJXV/OS9W1a6a4MJFE0T7hv56\nLQPRqzn7h1qACiANfqXnDSOtbJR3ACJtYj9AG4XFRWHSIEwF3Ihof1aRQBO59q5V\n3ymw0BzsHHUjygFMsosiIRcoV+T08t/gQIcDUWbhqY6oKkTkUnXJIpg0HFLmSyuK\nYWtfsKQvLSGzDGca0KwDIHzJHeYPu19QzE3i1dLaQHFNL9is2hCmIov85rB66hAG\njv+GAl60YC7u1yZ3BtnO48YiJv+DMLZ9OpDZwqS59iyKKjUWn0gU1VIqyU8xvhY0\nYJ1r53DZAgMBAAECgf8hbn0mQ54jtfKCcBmrLH5p0K8AiPSNiTrQe+w4N3frbyPy\njf2k05GTtjBPolgk4Ovj5ooBuxYEBxo8Cb5qyDV6lXYgHXuM6MQ19rZHpAmN7VwA\nsE8O8z61ZQWvRQb0ibzz113IRe1yE4mpqx7Bqtg/2tUyLPbkeOP2mHT+vymPF/KN\n5LXFVs48NIN/TPciFMjUeEv2+yapB/fOGN75PBn7ufiv1qyGol4vNLSNY0oujp5N\nfwYBffo+YzoDVI7ongb8emz8dAxfK8kyG+t1yGA+szXVVre5nWZrZxTIQjLN7pnP\niJvGrKqJHuOC6/wfuiDOdVFCMKNnHzp5CPZEBfkCgYEA/tjnyGJhfLsHsxLg6J6K\nqLzJc5/9B22Vi1Ck8hhmWN2Zsv+af4Ey3IAJ9O2uxWJrYw5DKUskLDJsHonD1UMp\n2A/xYU3KHwjJv19wfjmhimYlivC5huZEkaTteine4F2ewEZMkRT8BeTL81CBvo5Q\nxMzzcaIEctV6/nxuyZQy5bMCgYEAx92d4OGV1b4gg/3giknZ7eyFv6ABhwXHeNYO\ni1QLKHDB5N8RTpTaW1J/oOqq9tWCO/f4leMiTSN3k2qhWg7hWpV3JgoWmL8c+K80\n2iQ2Q8RnFGQvEND0M1xhjidCCdWLknsEW7KYM5lg5heCYyw32+9YyICZgKwiqJea\nSXsB4UMCgYEA5bAi/zTEPoHnB5u9P4sc18YHHwIUMGyw+rY9Y8FgBTn8vBqpab/N\nUnTIBItwGJCCzu1c1MvXl0n+rmtmKED3Zre/yv4sbFokUyo2nl1c3fsAXUBnRlEl\nfcsTCibQrJFUcmEpwx0RpFI5C1wFA/UKkMVTqJfowILt7o3B4EaEtQcCgYEAryOX\nlpl3aE7sRV2yZtwiWWibJ3l5/SzmSBAjvJoQEQcGEZ4bl2W/FqlrZ8JbwGMGdbBt\nKENaKoh63zZgX/+MIIm7WB0dAgruw0kdIk77MlUoEulbiPviEiPQ5PWn2+BCJ0Ef\nZ49P6l9sVxSg0HDOHi9V+JUgbm3pDR2UOPHOiusCgYEA5qkzNfoBFm9Kf8X6hSfu\nFpgu88mMk96CDDzPxq/awsEhfaO2EX6S6+GlarCBgVCp/UDlA60NanLsa+yu+jWc\nRVQsUm9Pr+MvBKILOWQeqOjqMfMBEEZgxeNaJ+h23MgPZattfFQEw1VbX4MEy7RO\nLfR/ldmFVtWfNTTXS7smRp4=\n-----END PRIVATE KEY-----\n"}});

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
