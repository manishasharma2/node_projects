const {Router} = require('express')
const multer = require('multer')
const router = Router()
const path = require('path')

const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comments')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
  })
  
const upload = multer({ storage: storage })

router.get("/:id",async(req,res) => {

    const  blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId : req.params.id}).populate("createdBy")
    console.log('blog comments --' , comments)
    return res.render('blog',{
        user: req.user,
        blog,
        comments
    })
})
router.get('/',(req,res) => {
    return res.render('addBlog',{
        user : req.user,
    })
})

router.post('/comment/:blogId', async(req,res)=>{
    await Comment.create({
        content : req.body.content,
        blogId : req.params.blogId,
        createdBy : req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

router.post('/',upload.single("coverImage"), async (req,res) =>{
    const {title,body} = req.body
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    console.log(blog)
    return res.redirect(`blog/${blog._id}`)
})

module.exports = router;


