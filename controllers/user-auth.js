const users = require('../models/index').users;
const bcrypt = require('bcrypt');

//************* GET SIGN UP **************/
function getSignUp(req,res){
    let userInput = {
        email:'',
        confirm:'',
        password:'',
        errMessage:'',
        hasError:false
    }
    if(req.session.inputData){
        userInput = req.session.inputData;
        req.session.inputData = null;
    }
    req.session.save(function(){
        res.render('signup', {inputData : userInput});
    });
}

//************* POST SIGN UP  ************/
async function signup(req,res){
   
    let userData = {
        enteredEmail : req.body.email,
        confirmEmail : req.body['confirm-email'],
        phoneNumber : req.body.phone,
        password : req.body.password,
        hasError : false,
        errMessage : ''
    }

    if(userData.enteredEmail !== userData.confirmEmail){
        userData.hasError = true;
        userData.errMessage = 'emails does not match';
        req.session.inputData = userData;
        req.session.save(function(){
            res.redirect('/signup');
        })
        return
    }

    const existingUser = await users.findOne({where:{email : userData.enteredEmail}});
    if(existingUser){
        userData.hasError = true,
        userData.errMessage = 'user with email already exists!'
        req.session.inputData = userData;
        req.session.save(function(){
            res.redirect('/signup');
        });
        return
    }

    if(userData.password.trim().length < 8){
        userData.hasError = true;
        userData.errMessage = 'password should be at least 8 charachters long';
        req.session.inputData = userData;
        req.session.save(function(){
            res.redirect('/signup');
        });
        return
    }
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const newUser = {
        email: userData.enteredEmail,
        phoneNumber : userData.phoneNumber,
        password: hashedPassword
    }
    await users.create(newUser);
    req.session.save(function(){
        res.redirect('/login');
    })
    return;

}

//************ GET LOGIN **************//
function getLogin(req,res){
    let inputData = {
        email:'',
        password:''
    }
    if(req.session.loginData){
        inputData = req.session.loginData;
        req.session.loginData = null;
    }
    req.session.save(function(){
        res.render('login', {inputData : inputData});
    })
    return
}

// *********** POST LOGIN *************//
async function login(req,res){
    const userData = {
        email: req.body.email,
        password: req.body.password,
        hasError:false,
        errMessage:''
    }
    const existingUser = await users.findOne({where:{email:userData.email}});
    if(!existingUser){
        userData.hasError = true;
        userData.errMessage = 'email or password is incorrect!'
        req.session.loginData = userData;
        req.session.save(function(){
            res.redirect('/login');
        });
        return;
    }
    const hashedPassword = existingUser.password;
    const compareResult = await bcrypt.compare(userData.password,hashedPassword);
    if(!compareResult || userData.password.trim().length === 0){
        userData.hasError = true;
        userData.errMessage = 'email or password is incorrect!';
        req.session.loginData = userData;
        req.session.save(function(){
            res.redirect('/login');
        })
        return;
    }
    req.session.user = existingUser;
    req.session.isAuth = true;
    req.session.save(function(){
        res.redirect('/profile');
    })
}

//***************GET FORGOT PASSWORD *****************/
function getPasswordReset(req,res){
    let Error = {
        flag: false,
        message:''
    }
    if(req.session.forgotData){
        Error.flag = true;
        Error.message = req.session.forgotData.errMessage;
        req.session.forgotData = null;
    }
    req.session.save(function(){
        res.render('forgot', {error:Error});
    })
}


//*************** POST FORGOT PASSWORD **************/
async function passwordReset(req,res){
    let userData = {
        email:req.body.email,
        hasError : false,
        errMessage:''
    }
    const existingUser = await users.findOne({where:{email:userData.email}});
    if(!existingUser){
        userData.hasError = true;
        userData.errMessage = 'no user found with this email';
        req.session.forgotData = userData;
        req.session.save(function(){
            res.redirect('/forgot');
        })
        return;
    }
    const newPassword = req.body.password;
    if(newPassword.trim().length < 8){
        userData.errMessage = 'password should be 8 charachters at least'
        userData.hasError = true;
        req.session.forgotData = userData;
        req.session.save(function(){
            res.redirect('/forgot');
        })
        return;
    }
    const hashedNewPassword = await bcrypt.hash(newPassword,12);
    await users.update({password:hashedNewPassword}, {where:{email:userData.email}});
    return res.redirect('/login');
}

//*************** LOGOUT ****************/
function logout(req,res){
    req.session.isAuth = false;
    req.session.user = null;
    req.session.save(function(){
        res.redirect('/');
    })
}

//********** GET USER PROFILE ***********/
function getUserProfile(req,res){
    if(req.session.isAuth){
        res.render('profile');
        return;
    }
    else{
        res.render('401');
    }
}


module.exports = {
    getSignUp, signup,
    getLogin, login,
    getPasswordReset,passwordReset,
    logout,
    getUserProfile,
}




















