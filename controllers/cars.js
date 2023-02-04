const cars = require('../models/index').cars;
const brands = require('../models/index').brands;
const models = require('../models/index').models;
const images = require('../models/index').images;
const users = require('../models/index').users;
const upload = require('../utils/multerMiddleware');
const filterquery = require('../utils/filter').filterQuery;



async function saveCar(req,res){
    let message = {}

    upload(req,res, async function(err){
        try{

            let carData = req.body;
            for(const field in carData){
                if(carData[field].length == 0){
                    message.text = 'please fill all necessary fields';
                    res.status(400).send(JSON.stringify(message));
                    return;
                }
            }
            if(err){
                message.text = err.message;
                res.status(400).send(JSON.stringify(message));
                return;
            }
            const brandId  = (await brands.findOrCreate({where:{brandName:carData.brand.toUpperCase()}}))[0].dataValues.id;
            const modelId = (await models.findOrCreate({where:{modelName:carData.model.toUpperCase()}}))[0].dataValues.id;
            let carObject = {
                brandId : brandId,
                modelId : modelId,
                userId: req.session.user.id,
                price:  carData.price,
                mileage: carData.mileage,
                year: carData.year,
                description: carData.description,
                address: carData.address
            }
            const car = await cars.create(carObject);
            for(let i = 0 ; i < req.files.length; i++){
                let image = {
                    address: req.files[i].path,
                    carId : car.id
                }
                await images.create(image);
            }
    
            message.text = "Car added successfully";
            res.status(200).send(JSON.stringify(message));
            return
        }
        catch(err){
            message.text = err.message;
            res.status(500).send(JSON.stringify(message));
        }
    })
    

}

async function LoadCars(req,res){
    let message = {};
    if(req.params.id){
        let carId = req.params.id;
        carId = carId.substring(0,carId.length);
        try{ 
            const car = await cars.findAll({include:[{model:brands},{model:models}, {model:images}] , where:{id: carId}});
            const user = await users.findAll({where:{id:car[0].dataValues.userId}})
            const Data = car[0].dataValues;
            const carsent = {
                brand: Data.brand.dataValues.brandName,
                model:Data.model.dataValues.modelName,
                price: Data.price,
                mileage: Data.mileage,
                year: Data.year,
                description : Data.description,
                address: Data.address,
                images: Data.images,
                tel:user[0].dataValues.phoneNumber
            }
            res.render('details',{car:carsent});
            return
        }catch(err){
            // res.render('500');      // error page;
            return
        }
    }
    else{
        try{
            const userCars = await cars.findAll({include:[{model:brands},{model:models}, {model:images}] , where:{userId : req.session.user.id}});                
             res.status(200).send(JSON.stringify(userCars));
             return
        }catch(err){
            message.text = err.message;
            res.status(500).send(JSON.stringify(message));
            return
        }
    }

}

async function getAllCars(req,res){
    const fetchedCars = await cars.findAll({include:[{model:brands},{model:models}, {model:images}]}); 
    res.render('main', {cars:fetchedCars});
}

async function filter(req,res){
    const queryObject = filterquery(req.query);
    const filteredCars = await cars.findAll({include:[{model:brands},{model:models}, {model:images}] , where:queryObject});
    res.render('main', {cars:filteredCars});
}


async function deleteCar(req,res){
    const id = req.body.carId
    await cars.destroy({where:{id:id}});
    res.redirect('/profile');
    return
}




module.exports = {
    saveCar, LoadCars,getAllCars,
    deleteCar, filter
}





