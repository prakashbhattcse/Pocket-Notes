import React, { useState } from "react";
import { addNoteToGroup } from "../../apis/groups";
import { FaArrowCircleRight } from "react-icons/fa";
import moment from "moment";
import { BsShareFill } from "react-icons/bs";
import ShareModal from "../shareModal";
import { IoSearch } from "react-icons/io5";
import styles from "./Notes.module.css";

const Notes = ({ groupId, groupName, initials, notesData = [], setNotesData, color }) => {
  const [note, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = moment().format("D MMM YYYY h:mm A");
    const newNote = {
      content: note,
      dateTime: currentDateTime,
    };

    try {
      const response = await addNoteToGroup(groupId, newNote.content);
      const addedNote = response.notes[response.notes.length - 1]; // Extract the newly added note
      setNotesData([...notesData, { ...addedNote, dateTime: currentDateTime }]);
      console.log(addedNote)
      setNote("");
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleShareClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = notesData.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.notesSection}>
      <div className={styles.noteTopsBar}>
        <div className={styles.spaceBtwn}>
          <span className={styles.initials} style={{ backgroundColor: color }}>
            {initials}
          </span>
          <h1 style={{ textTransform: "capitalize", fontSize: "1.2rem" }}>
            {groupName}
          </h1>
        </div>
        <div className={styles.searchBarTab}>
          <input
            type="search"
            placeholder="Search for notes..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IoSearch className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.notesData}>
        {filteredNotes.map((note, index) => (
          <div key={index} className={styles.note}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
              <p>{note.content}</p>
              <p className={styles.noteDateTime}>
                {moment(note.dateTime).format("D MMM YYYY h:mm A")}
              </p>
            </div>
            <div
              style={{
                height: "3rem",
                width: "3rem",
                background: "black",
                color: "white",
                padding: "1rem",
                borderRadius: "50%",
                display: 'flex',
                justifyContent: "center",
                alignItems: "center"
              }}
              onClick={() => handleShareClick(note)}
            >
              <BsShareFill style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        ))}
      </div>

      <form className={styles.inputSection} onSubmit={handleSubmit}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your text here..........."
        />
        <button type="submit" className={styles.sentButton} disabled={!note.trim()}>
          <FaArrowCircleRight />
        </button>
      </form>

      {isModalOpen && selectedNote && (
        <ShareModal
          link={`https://pocketnote013.netlify.app/share/note/${selectedNote._id}`}
          closeModal={handleCloseModal}
          type="note"
        />
      )}
    </div>
  );
};

export default Notes;
