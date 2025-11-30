const express = require("express")
const UserControlers = require("../controllers/controllers")
const router = express.Router();

router.get("/", (request, response) => {
        response.json({ Message: "Server is runing"})
    })

router.get("/notes",  UserControlers.getAllNotes)
router.get("/notes/:id",  UserControlers.getNoteById)
router.post("/notes",  UserControlers.createNote)
router.put("/notes",  UserControlers.createNote)

module.exports = router