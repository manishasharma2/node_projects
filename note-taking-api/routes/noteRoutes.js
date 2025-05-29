const express = require('express');
const { getNotes, createNote, getNoteById, updateNote, deletNote } = require('../controller/noteController');
const authenticate = require('../middleware/authMiddleware');
const router =  express.Router();

router.get('/',authenticate,getNotes)
router.post('/',authenticate,createNote)
router.get('/:id',authenticate,getNoteById)
router.put('/:id',authenticate,updateNote)
router.delete('/:id',authenticate,deletNote)

module.exports = router