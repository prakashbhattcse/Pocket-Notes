import React, { useState, useEffect, useCallback } from 'react';
import { BsShareFill } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import Modal from '../../Components/Modal';
import ShareModal from '../../Components/shareModal';
import Notes from '../../Components/NotesSection/Notes';
import { getAllGroups, getNotesByGroup } from '../../apis/groups';
import home from "../../assets/body.png";



const Home = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState({
    groupId: null,
    group: '',
    initials: '',
    color: '',
  });
  const [isSharingNote, setIsSharingNote] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [notesData, setNotesData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const openShareModal = useCallback(() => {
    setShareModalOpen(true);
  }, []);

  const closeShareModal = useCallback(() => {
    setShareModalOpen(false);
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await getAllGroups();
        setGroups(groupsData);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchNotesData = async (groupId) => {
      try {
        const notes = await getNotesByGroup(groupId);
        setNotesData(prevNotesData => ({
          ...prevNotesData,
          [groupId]: notes,
        }));
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };

    if (selectedGroupInfo.groupId) {
      fetchNotesData(selectedGroupInfo.groupId);
    }
  }, [selectedGroupInfo.groupId]);

  const handleGroupClick = useCallback((group) => {
    const initials = group.name
      .split(' ')
      .map(word => word[0])
      .join('');
    setSelectedGroupInfo({
      groupId: group._id,
      group: group.name,
      initials: initials,
      color: group.color,
    });
    setIsMobileNavVisible(false);
  }, []);

  const handleShareClick = useCallback((id = null) => {
    if (id) {
      setNoteId(id);
      setIsSharingNote(true);
    } else {
      setIsSharingNote(false);
    }
    openShareModal();
  }, [openShareModal]);

  const shareLink = isSharingNote
    ? `http://localhost:5173/share/note/${selectedGroupInfo.groupId}/${noteId}`
    : `http://localhost:5173/share/group/${selectedGroupInfo.groupId}`;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`Section flexbetween ${isMobileNavVisible ? 'mobile-nav-visible' : ''}`}>
      {/* SIDEBAR START */}
      <div className="tabSection">
        {open && (
          <Modal
            className="modalPosition"
            setGroups={setGroups}
            closeModal={closeModal}
          />
        )}
        {shareModalOpen && (
          <ShareModal
            link={shareLink}
            closeModal={closeShareModal}
          />
        )}
        <div className="heading title">Pocket Notes</div>

        {/* TAB CARDS START */}
        <div className="searchBarTab">
          <input
            type="search"
            placeholder="Search for groups..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IoSearch className="searchIcon" />
        </div>

        <div className="dataCards">
          {Array.isArray(filteredGroups) && filteredGroups.map((group, index) => (
            <div
              key={index}
              className={`dataTabWrap ${selectedGroupInfo.groupId === group._id ? 'active' : ''}`}
              onClick={() => handleGroupClick(group)}
            >
              <div
                className="initials"
                style={{ backgroundColor: group.color }}
              >
                {group.name
                  .split(' ')
                  .map(word => word[0])
                  .join('')}
              </div>
              <div className="dataCard">{group.name}</div>
              <div onClick={(e) => { e.stopPropagation(); handleShareClick(); }}>
                <BsShareFill />
              </div>
            </div>
          ))}
        </div>
        {/* TAB CARDS END */}

        <button className="plusBtn" onClick={openModal}>
          +
        </button>
      </div>
      {/* SIDEBAR END */}

      <div className="tabDataOutline">
        {selectedGroupInfo.groupId ? (
          <Notes
            groupId={selectedGroupInfo.groupId}
            groupName={selectedGroupInfo.group}
            initials={selectedGroupInfo.initials}
            color={selectedGroupInfo.color}
            notesData={notesData[selectedGroupInfo.groupId] || []}
            setNotesData={(newNotes) =>
              setNotesData(prevNotesData => ({
                ...prevNotesData,
                [selectedGroupInfo.groupId]: newNotes,
              }))
            }
            handleShareClick={handleShareClick} // Pass the handleShareClick function to Notes
          />
        ) : (
          <div className="tabDataSection">
            <img src={home} alt="Home" />
            <div className="mainHeading">Pocket Notes</div>
            <p style={{ fontSize: '20px', textAlign: 'center' }}>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
