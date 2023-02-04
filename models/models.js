module.exports = (sequelize,DataTypes) =>{
    const model = sequelize.define('models', {
        modelName:{
            type:DataTypes.STRING,
            alloNull:false
        }
    },{
        timestamps:false
    });

    return model;
}