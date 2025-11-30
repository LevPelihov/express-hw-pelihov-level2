
let notes = [ 
    { id: 1, title: "Запись 1" , content: "Бла бла бла, бе бе бе", createdAt: "2025-11-29T18:45:13.971Z" },
    { id: 2, title: "Запись 1" , content: "Бла бла бла, бе бе бе", createdAt: "2025-11-29T18:45:13.971Z" }
]

const store = {
    getAllNotes() {
        return [...notes]
    },
    getNoteById(id) {
        const note = notes.find(note => note.id === parseInt(id))
        if (!note) {
            throw new Error("Note по id не найден");
        }else{
            return note
        }
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
            createdAt: note.createdAt || new Date()
        };
        
        notes.push(newNote);
        return newNote;
    }, 
    patchNote (id, note){
        const OldNote = this.getNoteById(id)
        if (note.id && note.id !== parseInt(id)) {
            throw new Error("Вы не можете менять id");
        }
        const ind = notes.findIndex(note => note.id == parseInt(id))
        const updatedNote = {
            ...OldNote,  
            ...note, 
            id: parseInt(id)
        };
        notes[ind] = updatedNote
        return updatedNote

    },
    updateNote(id, note){
        const OldNote = this.getNoteById(id)
        if (note.id && note.id !== parseInt(id)) {
            throw new Error("Вы не можете менять id");
        }
        if (!note.title) {
            throw new Error("Вы не указали Title");
        }
        const ind = notes.findIndex(note => note.id == parseInt(id))
        const updatedNote = {
            id: parseInt(id),
            title: note.title,
            content: note.content || "",
            createdAt: note.createdAt || new Date()

        };
        notes[ind] = updatedNote
        return updatedNote
    },
    deleteNote(id){
        const OldNote = this.getNoteById(id)
        const ind = notes.findIndex(note => note.id == parseInt(id))
        let deleted = notes.splice(ind, 1);
        return deleted;

    
    }
}

module.exports = store