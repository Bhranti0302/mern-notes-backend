const express=require("express");
const router=express.Router();

const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/noteController");

router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports=router;