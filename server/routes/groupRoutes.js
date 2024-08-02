const express = require("express");
const { createGroup, getAllGroups, addNoteToGroup, getNotesByGroup, getNoteById } = require("../controllers/groupController");

const router = express.Router();


router.post("/createGroup", createGroup);
router.get("/getAllGroups", getAllGroups);
router.post("/:groupId/addNote", addNoteToGroup);
router.get("/:groupId/notes", getNotesByGroup);
router.get("/note/:noteId", getNoteById);

module.exports = router;
