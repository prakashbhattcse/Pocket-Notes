import axios from "axios";

const link = "http://localhost:3000/api/groups";

// Create a new group
// This function sends a POST request to create a new group with the given name.
export const createGroup = async (name, color) => { // Add color as parameter
    try {
        const reqUrl = `${link}/createGroup`;
        const response = await axios.post(reqUrl, { name, color }); // Send color
        return response.data;
    } catch (error) {
        console.error('Failed to create group:', error);
        throw error;
    }
};


// Get all groups
// This function sends a GET request to retrieve all groups from the server.
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
// This function sends a POST request to add a new note to the specified group.
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
// This function sends a GET request to retrieve all notes within the specified group.
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

// Get a specific note by ID within a group
// This function sends a GET request to retrieve a specific note by its ID within the specified group.
// export const getNoteById = async (groupId, noteId) => {
//     try {
//         console.log(noteId)
//         const reqUrl = `${link}/${groupId}/notes/${noteId}`;
//         const response = await axios.get(reqUrl);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to get note by ID:', error);
//         throw error;
//     }
// };


export const getNoteById = async (noteId) => {
    try {
        console.log('Fetching note with ID:', noteId);
        const reqUrl = `${link}/note/${noteId}`; // Updated URL to match new backend endpoint
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to get note by ID:', error);
        throw error;
    }
};

