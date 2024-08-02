const Group = require('../models/group');

// Create a new group
const createGroup = async (req, res) => {
    const { name, color } = req.body;

    try {
  
        const newGroup = new Group({ name, color });

      
        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        console.error('Failed to create group:', error);
        res.status(500).json({ error: 'Failed to create group' });
    }
};

// Get all groups
const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Failed to get groups:', error);
        res.status(500).json({ error: 'Failed to get groups' });
    }
};

// Add a note to a group
const addNoteToGroup = async (req, res) => {
    const { groupId } = req.params;
    const { content } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const newNote = { content };
        group.notes.push(newNote);
        await group.save();

        res.status(201).json(group);
    } catch (error) {
        console.error('Failed to add note to group:', error);
        res.status(500).json({ error: 'Failed to add note to group' });
    }
};

// Get all notes in a group
const getNotesByGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json(group.notes);
    } catch (error) {
        console.error('Failed to get notes by group:', error);
        res.status(500).json({ error: 'Failed to get notes by group' });
    }
};

// Get a note by ID
const getNoteById = async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await Group.findOne({ 'notes._id': noteId }, { 'notes.$': 1 });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note.notes[0]);
    } catch (error) {
        console.error('Failed to get note by ID:', error);
        res.status(500).json({ error: 'Failed to get note by ID' });
    }
};

module.exports = { createGroup, getAllGroups, addNoteToGroup, getNotesByGroup, getNoteById };
