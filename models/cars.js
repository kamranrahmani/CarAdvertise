module.exports = (sequelize,DataTypes)=>{
    const car = sequelize.define('cars',{
        brandId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        modelId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        mileage:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        year:{
            type:DataTypes.STRING,
            allowNull:true
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        address:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    });
    return car;
}