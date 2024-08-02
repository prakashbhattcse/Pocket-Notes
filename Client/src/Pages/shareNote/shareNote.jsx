import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styles from "./shareNote.module.css"; // Import the CSS Module
import { getNoteById } from "../../apis/groups";
import { GiPin } from "react-icons/gi";



const ShareNote = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                console.log("Fetching note with ID:", noteId);
                const noteData = await getNoteById(noteId);
                setNote(noteData);
                console.log(noteData);
            } catch (error) {
                console.error("Failed to fetch note:", error);
            }
        };

        fetchNote();
    }, [noteId]);

    const formatDateTime = (dateTimeString) => {
        return moment(dateTimeString).format("D MMM YYYY    ,   h:mm A");
    };

    return (
        <div className={styles.shareNoteView}>
       

            <div className={styles.sharedNoteViewSection}>
                {note ? (
                    <div className={styles.note}>
                    <div style={{ display: "flex", flexDirection: "row",justifyContent:"center", textAlign: "center",alignItems:"center",gap:'.8rem' }}> <GiPin id={styles.pin} /> <p style={{ textAlign: "center",fontSize:"2rem",margin:".5rem",fontWeight:"700" }}>NOTE</p></div>
                        <p style={{borderBottom:"1px solid silver",paddingBottom:"1.5rem"}}>{note.content}</p>
                        <p style={{color:"grey"}}>
                            {formatDateTime(note.dateTime)}
                        </p>
                    </div>
                ) : (
                    <p>Loading note...</p>
                )}
            </div>
        </div>
    );
};

export default ShareNote;
