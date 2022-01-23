const { Router } = require('express');
const Note = require('../models/note-model');
const Contacts = require('../models/contacts-model');
const router = Router();
const auth = require('../middleware/auth');

function mapNotes(allNotes) {
    return allNotes.notes.map(n => ({
        ...n.noteId._doc,
        id: n.noteId.id
    }))
}

function mapContacts(allContacts) {
    return allContacts.contacts.map(n => ({
        ...n.contactId._doc,
        id: n.contactId.id
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
    let contact;
    if(req.user.allContacts.contacts === []) {
        contact = 0;
    } else {
        const user = await req.user
        .populate('allContacts.contacts.contactId');

        contact = mapContacts(user.allContacts);
    }
    const notes = note.slice(0, 4);
    const contacts = contact.slice(0, 4);
    const title_last_notes = 'Последние заметки';
    const title_last_contacts = 'Последние контакты';

    res.render('home', {
        notes,
        contact: contacts,
        title: 'Главная',
        isHome: true,
        title_last_notes,
        title_last_contacts
    });
});


module.exports = router