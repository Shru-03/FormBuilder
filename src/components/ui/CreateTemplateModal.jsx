// src/components/ui/CreateTemplateModal.jsx
import React, { useState } from "react";
import { useTemplateContext } from "../../context/TemplateContext";

export default function CreateTemplateModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const { addTemplate } = useTemplateContext();

  const handleCreate = () => {
    if (!name.trim()) return;

    const success = addTemplate(name.trim());
    if (success) {
      setName("");
      onClose();
    } else {
      alert("Max 5 templates allowed.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <h2 className="text-lg text-black font-semibold mb-4">New Template</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter template name"
          className="border text-black  w-full p-2 rounded mb-4"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-gray-600 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="bg-black text-white px-4 py-1 rounded cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
