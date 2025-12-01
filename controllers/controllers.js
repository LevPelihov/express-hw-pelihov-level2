const express = require("express")
const store = require("../utils/store")
const validate = {
    validateLength(note) {
            if (note.title && !(note.title.length >= 1 && note.title.length <= 100)) 
                throw new Error("В вашем Title должно быть от 1-100 символов");
            
            if (note.content && !(note.content.length >= 1 && note.content.length <= 500)) 
                throw new Error("В вашем Content должно быть от 1-500 символов");
    },
    validateTitle(note) {
        if (!note.title) 
            throw new Error("В вашем note нет Title");

        if (typeof note.title != "string") {
            throw new Error("Title должен быть строкой");
        }

    },
    validateContent(note) {
        if (!note.content) 
            throw new Error("В вашем note нет Content");

        if (typeof note.content != "string") {
            throw new Error("Content должен быть строкой");
        }
    },
    validateIdReplacement(note, id) {
        if (note.id && note.id !== parseInt(id)) 
            throw new Error("Вы не можете менять id");
        
    },
    
}
const UserControlers = {
    getAllNotes(request, response) {
        response.json(store.getAllNotes())
    },
    getNoteById(request, response) {
        try {
            
            const note = store.getNoteById(request.params.id)
            response.json({ message: `Note по id: ${request.params.id} успешно найден`, Note: note})
        }
        catch(error){
            if(error.message == "Note по id не найден" ){
                response.status(404).json({ error: error.message })
            }
            else {
                response.status(500).json({ error: "Internal Server Error", error: error.message})
            }
        }
    },
    createNote(request, response) {
        try{
            if(request.headers['content-type'] !== 'application/json') {
                response.status(415).json({ message: "Unsupported Media Type" })
            } else {
                validate.validateTitle(request.body)
                validate.validateContent(request.body)
                validate.validateLength(request.body)
                const newNote = store.createNote((request.body))
                response.status(201).json({ message: "Note успешно создан", note: newNote})
            }
            
        } 
        catch(error) {
            if(error.message == "В вашем note нет Title"
                || error.message == "В вашем note нет Content"
                || error.message == "Note с таким id уже существует"
                || error.message == "В вашем Title должно быть от 1-100 символов"
                || error.message == "В вашем Content должно быть от 1-500 символов"
                ){
                response.status(400).json({ error: error.message })
            }
            else {
                response.status(500).json({ error: "Internal Server Error", error: error.message})
            }
            
        }

    },
    patchNote(request, response) {
        try {
            if(request.headers['content-type'] !== 'application/json') {
                response.status(415).json({ message: "Unsupported Media Type" })
            }
            else {
                store.getNoteById(request.params.id)
                validate.validateIdReplacement(request.body, request.params.id)
                validate.validateLength(request.body)
                const note = store.patchNote(request.params.id, request.body)
                response.status(201).json({ message: `Данные Note по id: ${request.params.id} обновлены`, note: note})
            }
        }
        catch(error){
            if(error.message == "Вы не можете менять id"
                || error.message == "В вашем Title должно быть от 1-100 символов"
                || error.message == "В вашем Content должно быть от 1-500 символов"){
                response.status(400).json({ error: error.message })
            }
            else if(error.message == "Note по id не найден") {
                response.status(404).json({ error: error.message })
            }
            else {
                response.status(500).json({ error: "Internal Server Error", error: error.message})
            }
        }
    },
    updateNote(request, response){
        try {
            if(request.headers['content-type'] !== 'application/json') {
                response.status(415).json({ message: "Unsupported Media Type" })
            } else {
                store.getNoteById(request.params.id)
                validate.validateIdReplacement(request.body, request.params.id)
                validate.validateTitle(request.body)
                validate.validateLength(request.body)
                const note = store.updateNote(request.params.id, request.body)
                response.status(201).json({ message: `Данные Note по id: ${request.params.id} полностью обновлены`, note: note})
            }
        }
        catch(error){
            if(error.message == "Вы не можете менять id" 
                || error.message == "В вашем note нет Title"
                || error.message == "В вашем Title должно быть от 1-100 символов"
                || error.message == "В вашем Content должно быть от 1-500 символов"){
                response.status(400).json({ error: error.message })
            }
            else if(error.message == "Note по id не найден") {
                response.status(404).json({ error: error.message })
            }
            else {
                response.status(500).json({ error: "Internal Server Error", error: error.message})
            }
        }
    },
    deleteNote(request, response) {
        try {
            const note = store.getNoteById(request.params.id)
            store.deleteNote(request.params.id)
            response.json({ message: `Note по id: ${request.params.id} успешно удалён`, deletedNote: note})
        }
        catch(error){
            if(error.message == "Note по id не найден" ){
                response.status(404).json({ error: error.message })
            }
            else {
                response.status(500).json({ error: "Internal Server Error", error: error.message})
            }
        }
    }
    
}

module.exports = UserControlers