const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    allNotes: {
        notes: [
            {
                noteId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Note',
                    required: true
                }
            }
        ]
    },
    allContacts: {
        contacts: [
            {
                contactId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contacts',
                    required: true
                }
            }
        ]
    }
    
});


userSchema.methods.addUserNote = function (note) {
    const notes = [...this.allNotes.notes];
    
    notes.push({
        noteId: note._id
    });
    this.allNotes = {notes}
    return this.save();
};

userSchema.methods.removeNote = function (id) {
    let notes = [...this.allNotes.notes];
    let idx = notes.findIndex(elem => {
        if (elem.noteId.toString() === id.toString()){
            return true;
        }
    });
    if (idx != -1) {
         notes = notes.filter((elem, index) => {
            if (index != idx) {
                return true;
            }
        });
    }
    this.allNotes = {notes}
    return this.save();

}

userSchema.methods.removeContact = function (id) {
    let contacts = [...this.allContacts.contacts];
    let idx = contacts.findIndex(elem => {
        if (elem.contactId.toString() === id.toString()){
            return true;
        }
    });
    if (idx != -1) {
        contacts = contacts.filter((elem, index) => {
            if (index != idx) {
                return true;
            }
        });
    }
    this.allContacts = {contacts}
    return this.save();

}

userSchema.methods.addUserContact = function (contact) {
    const contacts = [...this.allContacts.contacts];
    
    contacts.push({
        contactId: contact._id
    });
    this.allContacts = {contacts}
    return this.save();
};

const User = model('User', userSchema);

module.exports = User;