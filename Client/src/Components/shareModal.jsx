import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from "react-icons/ai";
import { FaLink } from "react-icons/fa";



const ShareModal = ({ link, closeModal, type }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success(`${type === 'note' ? 'Note' : 'Group'} link copied!`, {
          position: "top-right",
          autoClose: 1000,
          onClose: closeModal,
        });
      })
      .catch(err => {
        toast.error('Failed to copy link!', {
          position: "top-right",
          autoClose: 2000
        });
      });
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <ToastContainer />
        <button onClick={closeModal} className="closeButton">
          <AiOutlineClose />
        </button>
        <h2 style={{borderBottom:"1px solid silver",paddingBottom:"8px",marginTop:"0"}}>SHARE</h2>
     
        <p> {type === 'note' ? 'Note' : 'Group'} link</p>
        <div style={{ width: "100%",border:"1px solid silver",padding:"5px 5px 5px 12px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <FaLink/>
          <input type="text" readOnly value={link} style={{ width: "80%", padding: "4px 15px",border:"none",textAlign:"start" }} />
          <button onClick={handleCopy} style={{  padding: "7px 15px",backgroundColor:"#7C2BE8",color:"white",border:"none",fontSize:"1rem" }}>Copy</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
