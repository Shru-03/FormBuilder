import { useState, useRef } from "react";
import { useTemplateContext } from "../../context/TemplateContext";
import { X, Plus, Move } from "lucide-react";

function FieldCard({ field, sectionId }) {
  const { selectedTemplate, updateTemplate } = useTemplateContext();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(field.label);
  const [options, setOptions] = useState(field.options || []);
  const dragHandleRef = useRef(null);

  const handleSave = () => {
    const updatedSections = selectedTemplate.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.map((f) =>
              f.id === field.id ? { ...f, label, options } : f
            ),
          }
        : section
    );

    updateTemplate({ ...selectedTemplate, sections: updatedSections });
    setEditing(false);
  };

  const handleDelete = () => {
    const updatedSections = selectedTemplate.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.filter((f) => f.id !== field.id),
          }
        : section
    );

    updateTemplate({ ...selectedTemplate, sections: updatedSections });
  };

  const handleOptionChange = (index, newValue) => {
    const updated = [...options];
    updated[index] = newValue;
    setOptions(updated);
  };

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const handleRemoveOption = (index) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  const renderField = () => {
    switch (field.type) {
      case "short_answer":
        return (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder=""
            disabled
          />
        );

      case "number":
        return (
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder=""
            disabled
          />
        );

      case "yes_no":
        return (
          <label className="flex items-center mt-1 gap-3">
            <span className="text-sm">No</span>
            <div className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                disabled
                className="peer opacity-0 w-10 h-5"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition-all" />
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
            </div>
            <span className="text-sm">Yes</span>
          </label>
        );

      case "dropdown":
      case "radio":
        return (
          <div className="flex flex-col gap-2">
            {options.map((opt, index) => (
              <div key={index} className="flex items-center gap-2">
                {field.type === "radio" && <input type="radio" disabled />}
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  onBlur={handleSave}
                  className="border border-gray-300 px-2 py-1 rounded text-sm w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveOption(index);
                    handleSave();
                  }}
                  className="text-gray-500 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                handleAddOption();
                handleSave();
              }}
              className="flex items-center text-blue-600 text-sm mt-2 hover:underline"
            >
              <Plus size={14} className="mr-1" /> Add Option
            </button>
          </div>
        );

      case "paragraph":
        return (
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Write here..."
            disabled
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="relative p-3 shadow-md bg-white rounded text-gray-700 group"
      data-draggable-card
    >
      {/* Drag Handle */}
      <button
        ref={dragHandleRef}
        onMouseDown={(e) => {
          const card = e.currentTarget.closest("[data-draggable-card]");
          if (card) {
            card.setAttribute("draggable", "true");
            card.ondragstart = (dragEvent) => {
              dragEvent.dataTransfer.setData("field-id", field.id);
              dragEvent.dataTransfer.effectAllowed = "move";
            };
          }
        }}
        onMouseUp={() => {
          const card = dragHandleRef.current?.closest("[data-draggable-card]");
          if (card) {
            card.removeAttribute("draggable");
            card.ondragstart = null;
          }
        }}
        className="absolute left-2 top-2 text-gray-400 hover:text-gray-600 cursor-move"
        title="Drag to reorder"
      >
        <Move size={16} />
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-700"
        title="Delete field"
      >
        <X size={16} />
      </button>

      {/* Label */}
      {editing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleSave}
          className="border px-2 py-1 rounded w-full mb-2"
          autoFocus
        />
      ) : (
        <label
          className="block font-medium mb-1 cursor-pointer pl-6"
          onClick={() => setEditing(true)}
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <div className="pl-6">{renderField()}</div>
    </div>
  );
}

export default FieldCard;
