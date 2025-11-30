const express = require("express")
const store = require("../utils/store")

const UserControlers = {
    getAllNotes(request, response) {
        response.json(store.getAllNotes())
    },
    getNoteById(request, response) {
        try {
        const note = store.getNoteById(request.params.id)
        if(!note) {
            response.status(404).json({ message: "Note by id not Found" })
        }else {
            response.json(note)
        }
        }
        catch{
            response.status(500).json({ message: "Bad request" })
        }
    },
    createNote(request, response) {
        try{
            if(request.headers['content-type'] !== 'application/json') {
                response.status(415).json({ message: "Unsupported Media Type" })
            } else {
                const newNote = store.createNote((request.body))
                response.status(201).json({ message: "Note успешно создан", note: newNote})
            }
            
        } 
        catch(error) {
            if(error.message == "В вашем note нет Title" || error.message == "В вашем note нет Content" || error.message == "Note с таким id уже существует"){
                response.status(400).json({ message: error.message })
            }
            else {
                response.status(500).json({ message: "Internal Server Error", error: error.message})
            }
            
        }

    }
}

module.exports = UserControlers