module.exports = (sequelize, DataTypes) =>{
    const category = sequelize.define('images',{
        address:{
            type: DataTypes.STRING,
            allowNull: true
        },
        carId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        timestamps :false
    }
    );
    return category;
}