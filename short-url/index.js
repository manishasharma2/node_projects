const express = require('express');
const path = require('path')
const {connectMongoDb} = require('./connection')

const cookieParser = require('cookie-parser')
const URL  = require('./models/url')

const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')

const app = express();
const PORT = 3000;
const {checkForAuthentication, restrictTo} = require('./middleware/auth')

connectMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>{console.log("MongoDb connected !!")})

app.set('view engine','ejs');//set the view engine to ejs
app.set('views', path.resolve('./views'));

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkForAuthentication)

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute) 
app.use('/', staticRoute)
app.use('/user',userRoute)

app.get('/test',async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home',{urls: allUrls})
})

app.listen(PORT, () => console.log(`The app is running on port: ${PORT}`))