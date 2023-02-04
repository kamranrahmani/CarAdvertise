module.exports = (sequelize, DataTypes) =>{
    const brand = sequelize.define('brands',{
        brandName:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps:false
    });
    return brand;
}

