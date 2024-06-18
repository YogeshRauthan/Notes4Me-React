const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note_model');

// ROUTE 1: Get all the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid Title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
], async (req, res) => {

    try {

        const {title, description, tag} = req.body; 

        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        const note = new Note({title, description, tag, user: req.user.id});
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser, [
    body('title', 'Enter a Title').exists(),
    body('description', 'Add description').exists(),
], async (req, res) => {

    const {title, description, tag} = req.body;

    try {
    
        // create a newNote object
        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not Found")
        }

        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, [
    body('title', 'Enter a Title').exists(),
    body('description', 'Add description').exists(),
], async (req, res) => {

    try {
        
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not Found")
        }

        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

}) 

module.exports = router;