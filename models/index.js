const {Sequelize , DataTypes} = require('sequelize');
const dbConfig = require('../database/config');

const sequelize = new Sequelize(dbConfig.db,dbConfig.username , dbConfig.password, 
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect 
    });

sequelize.authenticate().
    then(()=>{
        console.log('connected to database');
    }).
    catch(err=>{
        console.log('connection to database rejected!');
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.brands = require('./brands')(sequelize,DataTypes);
db.models = require('./models')(sequelize,DataTypes);
db.images = require('./carImages')(sequelize,DataTypes);
db.cars = require('./cars')(sequelize,DataTypes);
db.users = require('./users')(sequelize,DataTypes);

db.models.hasOne(db.cars);
db.cars.belongsTo(db.models);

db.brands.hasOne(db.cars);
db.cars.belongsTo(db.brands);

db.cars.hasMany(db.images);
db.images.belongsTo(db.cars);

sequelize.sync().
    then(()=>{
        console.log('re-sync done');
    }).catch(err=>{
        console.log('error while re-sync!');
});

module.exports = db;










