const router = require('express').Router();
const authUser = require('../controllers/user-auth');
const carController = require('../controllers/cars');


//*******************  authentication and user related routes ********************

//*********** sign up */
router.get('/signup', authUser.getSignUp);

router.post('/signup', authUser.signup);

//*********** login */
router.get('/login',authUser.getLogin);

router.post('/login', authUser.login);

//*********** password reset */
router.get('/forgot',authUser.getPasswordReset);

router.post('/forgot',authUser.passwordReset);

//************ logout */
router.post('/logout', authUser.logout);

//************ user profile */
router.get('/profile', authUser.getUserProfile);


// router.get('/', authUser.main);

//*******************************************  CARS   **************************************************/

// load all cars for main page
router.get('/',carController.getAllCars);

router.post('/savecar', carController.saveCar);

router.get('/loadusercars', carController.LoadCars);

router.get('/:id/details',carController.LoadCars)

router.post('/:id/delete', carController.deleteCar);




router.get('/filter', carController.filter)

module.exports = router;