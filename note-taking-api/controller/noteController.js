const Note = require('../models/noteModel')

const createNote = async (req, res) =>{
    try {
        const {title,content} = req.body;
        const note = await Note.create({title, content,userId:  req.user.userId})
        res.status(200).json({note})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getNotes = async(req,res)=>{
    const notes  = await Note.find({userId : req.user.userId});
    res.json({notes})
}

const getNoteById = async (req , res) => {
    const note = await Note.findById(req.params.id)
    if(!note) res.status(400).json({message : 'Note not found'})
    res.json(note)
}

const updateNote = async (req,res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(note)
}

const deletNote = async (req,res) => {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({message: "Note Deleted Successfully !! "})
}

module.exports = {deletNote,createNote,getNotes,getNoteById,updateNote}