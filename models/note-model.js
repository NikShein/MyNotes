const { Schema, model} = require('mongoose');

const noteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    noteTitle: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
} , { timestamps: true });

noteSchema.method('toClient', function() {
    const note = this.toObject();

    note.id = note._id;
    delete note._id;

    return note;
})

const Note = model('Note', noteSchema);

module.exports = Note;