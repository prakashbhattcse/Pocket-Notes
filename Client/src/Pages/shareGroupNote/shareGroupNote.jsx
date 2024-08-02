import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getNotesByGroup } from "../../apis/groups";
import styles from "./shareGroupNote.module.css"
import { GiPin } from "react-icons/gi";





const ShareGroupNote = () => {
    const { groupId } = useParams();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notesData = await getNotesByGroup(groupId);
                setNotes(notesData);
                console.log(notes);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };

        fetchNotes();
    }, [groupId]);

    const formatDateTime = (dateTimeString) => {
        return moment(dateTimeString).format("D MMM YYYY , h:mm A");
    };

    return (
        <div className={styles.shareView}>

            <div className={styles.sharedNoteViewSection}>
          
                <div style={{display: "flex", flexDirection: "row",justifyContent:"center", textAlign: "center",alignItems:"center",gap:'.8rem' }}> <GiPin id={styles.pin} /> <p style={{ textAlign: "center",fontSize:"2rem",margin:".5rem",fontWeight:"700" }}>NOTES</p></div>
                <ul>
                    {notes.map(note => (
                        <div key={note._id} className={styles.note}>
                            <p>{note.content}</p>
                            <p style={{ color: "grey", textAlign: "end" }}>
                                {formatDateTime(note.dateTime)}
                            </p>
                        </div>
                    ))}
                </ul>

      
            </div>
        </div>
    );
};

export default ShareGroupNote;
