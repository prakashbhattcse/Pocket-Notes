import React, { useState } from "react";
import { createGroup } from "../apis/groups"; // Import the API service function
import { AiOutlineClose } from "react-icons/ai";



const Modal = ({ className, setGroups, closeModal }) => {
  const [group, setGroup] = useState({ name: "", color: "" });

  const handleModal = async () => {
    if (!group.name.trim() || !group.color) {
        return; // Exit if groupName is empty or no color is selected
    }

    try {
        const newGroup = await createGroup(group.name, group.color); // Pass color
        setGroups((prevGroups) => [...prevGroups, newGroup]);
        setGroup({ name: "", color: "" });
        closeModal();
    } catch (error) {
        console.error("Failed to create group:", error);
    }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup((prevGroup) => ({
      ...prevGroup,
      [name]: value,
    }));
  };

  const handleColorSelect = (color) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      color,
    }));
  };

  return (
    <div className="modalOverlay">
    <div className="modalOutline">
    <div onClick={closeModal} className="cross"><AiOutlineClose/></div>
      <h3>Create New Group</h3>
      <div className="flexbetween">
        <h3>Group Name</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter Group name..."
          value={group.name}
          onChange={handleChange}
        />
      </div>
      <div className="flexbetween">
        <h3>Choose Colour</h3>
        <div className="btnGroup">
          {["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"].map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            ></button>
          ))}
        </div>
      </div>
      <button onClick={handleModal}>Create</button>
    </div>
    </div>
  );
};

export default Modal;
