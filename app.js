const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require('./models/index');

const routes = require('./routes/routes');

const port = process.env.PORT || 3000;

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/images',express.static('images'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(
    session({
      secret: "keyboard cat",
      store: new SequelizeStore({
        db: db.sequelize,
      }),
      saveUninitialized:false,
      resave: false,
      proxy: true,
    })
  );

app.use((req,res,next)=>{
  if(req.session.isAuth){
    res.locals.isAuth = true;
    next();
    return
  }
  next();
});
  

app.use(routes);

app.use(function(err,req,res,next){
  res.render('500');
  return next();
})

app.listen(port, ()=>{
  console.log(`server is listening on port ${port}`);
});




