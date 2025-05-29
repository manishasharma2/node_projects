const {Router} = require('express')
const User = require('../models/user')
const router = Router();

router.get('/signin',(req,res) =>{
    return res.render('signin')
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.post('/signup',async (req,res) => {
    const {fullname, email , password} = req.body;
    const user = await User.create({
        fullname,
        email,
        password,
    });

    return res.redirect('/')
})

router.post('/signin', async(req,res) => {
    try {
        const {email,password} = req.body;
        console.log(email, password)
        const token = await User.matchPasswordAndGenerateToken(email, password);
    
        res.cookie('token',token)
        return res.redirect('/')
    } catch (error) {
        return res.render('signin',{
            error: "Incorrect Email or password",
        })
    }

})

router.get('/logout',(req,res) => {
    res.clearCookie('token').redirect('/');
})
module.exports = router;