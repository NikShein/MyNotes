const { Router } = require('express');
const { route } = require('express/lib/application');
const router = Router();
const Contacts = require('../models/contacts-model');
const auth = require('../middleware/auth');

function mapContacts(allContacts) {
    return allContacts.contacts.map(n => ({
        ...n.contactId._doc,
        id: n.contactId.id
    }))
}

router.get('/', auth, async (req, res) => {
    let contacts;
    if(req.user.allContacts.contacts === []) {
        contacts = 0;
    } else {
        const user = await req.user
        .populate('allContacts.contacts.contactId');

        contacts = mapContacts(user.allContacts);
    }
    const addContactTitle = 'Добавить контакт';
    res.render('contacts', {
        title: 'Контакты',
        isContacts: true,
        contacts: contacts,
        addContactTitle
    });
});

router.get('/:id', auth, async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    res.render('contact', {
        contact,
        title: `${contact.firstname} ${contact.secondname}`
    });
})

router.post('/remove', auth, async (req, res) => {
    try {
        await req.user.removeContact(req.body.id)
        await Contacts.deleteOne({_id: req.body.id});
        res.redirect('/contacts');
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    };

    const contact = await Contacts.findById(req.params.id);

    res.render('contact-edit', {
        contact,
        title:`${contact.firstname} ${contact.secondname}`,
    })
});

router.post('/edit', auth, async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Contacts.findByIdAndUpdate(id, req.body);
    res.redirect('/contacts');
})

router.post('/', auth, async (req, res) => {
    const contact = new Contacts({
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        tel: req.body.tel,
        email: req.body.email,
        userId: req.user
    });

    try {
        await contact.save();
        await req.user.addUserContact(contact);
        res.redirect('/contacts')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router