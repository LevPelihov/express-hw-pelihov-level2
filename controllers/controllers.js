const express = require("express")
const store = require("../utils/store")

const UserControlers = {
    getAllNotes(request, response) {
        response.json(store.getAllNotes())
    },
    getNoteById(request, response) {
        try {
        const note = store.getNoteById(request.params.id)
        response.json({ message: `Note по id: ${request.params.id} успешно найден`, deletedNote: note})
        }
        catch(error){
            if(error.message == "Note по id не найден" ){
                response.status(400).json({ message: error.message })
            }
            else {
                response.status(500).json({ message: "Internal Server Error", error: error.message})
            }
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

    },
    patchNote(request, response) {
        try {
            if(request.headers['content-type'] !== 'application/json') {
                response.status(415).json({ message: "Unsupported Media Type" })
            } else {
            const note = store.patchNote(request.params.id, request.body)
            response.json({ message: `Данные Note по id: ${request.params.id} обновлены`, note: note})
            }
        }
        catch(error){
            if(error.message == "Вы не можете менять id" || error.message == "Note по id не найден" ){
                response.status(400).json({ message: error.message })
            }
            else {
                response.status(500).json({ message: "Internal Server Error", error: error.message})
            }
        }
    },
    updateNote(request, response){
        try {
            if(request.headers['content-type'] !== 'application/json') {
                response.status(415).json({ message: "Unsupported Media Type" })
            } else {
            const note = store.updateNote(request.params.id, request.body)
            response.json({ message: `Данные Note по id: ${request.params.id} полностью обновлены`, note: note})
            }
        }
        catch(error){
            if(error.message == "Вы не можете менять id" || error.message == "Note по id не найден" || error.message == "Вы не указали Title"){
                response.status(400).json({ message: error.message })
            }
            else {
                response.status(500).json({ message: "Internal Server Error", error: error.message})
            }
        }
    },
    deleteNote(request, response) {
        try {
        const deleted = store.deleteNote(request.params.id)
        response.json({ message: `Note по id: ${request.params.id} успешно удалён`, deletedNote: deleted})
        }
        catch(error){
            if(error.message == "Note по id не найден" ){
                response.status(400).json({ message: error.message })
            }
            else {
                response.status(500).json({ message: "Internal Server Error", error: error.message})
            }
        }
    }
    
}

module.exports = UserControlers