const { Router } = require('express');
const req = require('express/lib/request');
const { route } = require('express/lib/router');
const router = Router();
const Note = require('../models/note-model');
const auth = require('../middleware/auth');
const User = require('../models/user');

function mapNotes(allNotes) {
    return allNotes.notes.map(n => ({
        ...n.noteId._doc,
        id: n.noteId.id
    }))
}


router.get('/', auth, async (req, res) => {
    let note;
    if(req.user.allNotes.notes === []) {
        note = 0;
    } else {
        const user = await req.user
        .populate('allNotes.notes.noteId');

        note = mapNotes(user.allNotes);
    }
    

    const addNoteTitle = 'Добавить заметку';

    res.render('notes', {
        title: 'Заметки',
        isPosts: true,
        note: note,
        addNoteTitle
    });
});

router.get('/:id', auth, async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('note', {
        note,
        title: 'Заметка'
    });
});

router.post('/remove', auth, async (req, res) => {
    try {
        await req.user.removeNote(req.body.id)
        await Note.deleteOne({_id: req.body.id});
        res.redirect('/notes');
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    };

    const note = await Note.findById(req.params.id);

    res.render('note-edit', {
        note
    })
});

router.post('/edit', auth, async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Note.findByIdAndUpdate(id, req.body);
    res.redirect('/notes');
})

router.post('/', auth, async (req, res) => {
    const note = new Note({
        noteTitle: req.body.title,
        text: req.body.text,
        author: req.body.author,
        userId: req.user
    })

    try {
        await note.save();
        await req.user.addUserNote(note);
        res.redirect('/notes')
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;