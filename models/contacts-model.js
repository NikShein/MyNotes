const { Schema, model} = require('mongoose');

const contactsSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    secondname: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

contactsSchema.method('toClient', function() {
    const contact = this.toObject();

    contact.id = contact._id;
    delete contact._id;

    return contact;
})

const Contacts = model('Contacts', contactsSchema);

module.exports = Contacts;