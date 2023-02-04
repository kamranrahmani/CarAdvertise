module.exports = (sequelize,DataTypes)=>{
    const user = sequelize.define('users', {
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phoneNumber:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.STRING,
            allowNull:true
        }
    })
    return user;
}