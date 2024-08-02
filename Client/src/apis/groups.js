import axios from "axios";

const link = "https://pocket-notes-zfky.onrender.com/api/groups";

// Create a new group
export const createGroup = async (name, color) => {
    try {
        const reqUrl = `${link}/createGroup`;
        const response = await axios.post(reqUrl, { name, color }); 
        return response.data;
    } catch (error) {
        console.error('Failed to create group:', error);
        throw error;
    }
};


// Get all groups
export const getAllGroups = async () => {
    try {
        const reqUrl = `${link}/getAllGroups`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to get all groups:', error);
        throw error;
    }
};

// Add a note to a group
export const addNoteToGroup = async (groupId, content) => {
    try {
        const reqUrl = `${link}/${groupId}/addNote`;
        const response = await axios.post(reqUrl, { content });
        return response.data;
    } catch (error) {
        console.error('Failed to add note to group:', error);
        throw error;
    }
};




// Get all notes in a group
export const getNotesByGroup = async (groupId) => {
   console.log("getNotesByGroup triggered")
    try {
        const reqUrl = `${link}/${groupId}/notes`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to get notes by group:', error);
        throw error;
    }
};



export const getNoteById = async (noteId) => {
    try {
        console.log('Fetching note with ID:', noteId);
        const reqUrl = `${link}/note/${noteId}`; 
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to get note by ID:', error);
        throw error;
    }
};

