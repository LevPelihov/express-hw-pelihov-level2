
let notes = [ 
    { id: 1, title: "Запись 1" , content: "Бла бла бла, бе бе бе", createdAt: "2025-11-29T18:45:13.971Z" },
    { id: 2, title: "Запись 1" , content: "Бла бла бла, бе бе бе", createdAt: "2025-11-29T18:45:13.971Z" }
]

const store = {
    getAllNotes() {
        return [...notes]
    },
    getNoteById(id) {
        return notes.find(note => note.id === parseInt(id))
    },
    createNote(note) {
        
        if (!note.title) {
            throw new Error("В вашем note нет Title");
        }
        if (!note.content) {
            throw new Error("В вашем note нет Content");
        }
        
        let noteId = note.id;
        
        if (noteId) {
            if (notes.some(n => n.id === noteId)) {
                throw new Error("Note с таким id уже существует");
            }
        } else {
            noteId = notes.length + 1;
        }
        const newNote = {
            id: noteId,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt || new Date().toISOString()
        };
        
        notes.push(newNote);
        return newNote;
    }
}

module.exports = store