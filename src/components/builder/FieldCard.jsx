import { useState, useRef } from "react";
import { useTemplateContext } from "../../context/TemplateContext";
import { X, Trash2, Plus, Move } from "lucide-react";
import toast from "react-hot-toast";

const fieldTypes = ["text", "email", "password"];
function FieldCard({ field, sectionId }) {
  const { selectedTemplate, updateTemplate } = useTemplateContext();

  const [label, setLabel] = useState(field.label || "");
  const [placeholder, setPlaceholder] = useState(field.placeholder);
  const [options, setOptions] = useState(field.options || []);
  const dragHandleRef = useRef(null);
  const [fieldType, setFieldType] = useState(field.fieldType);
  const [required, setRequired] = useState(field.required || false);

  const handleSave = () => {
    const updatedSections = selectedTemplate.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.map((f) =>
              f.id === field.id
                ? {
                    ...f,
                    label,
                    placeholder,
                    options,
                    fieldType,
                    required,
                  }
                : f
            ),
          }
        : section
    );

    updateTemplate({ ...selectedTemplate, sections: updatedSections });
    toast.success("Field Saved");
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
      case "Short Answer":
        return (
          <section className="my-2">
            <input
              type="text"
              placeholder="Add field label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              autoFocus
            />
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Add help text"
            />
          </section>
        );

      case "Number":
        return (
          <section className="my-2">
            <input
              type="text"
              placeholder="Add field label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              autoFocus
            />
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Add help text"
            />
          </section>
        );

      case "Yes/No":
        return (
          <section className="my-2">
            <input
              type="text"
              placeholder="Add field label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              autoFocus
            />

            <label className="flex items-center mt-1 gap-3">
              <span className="text-sm">No</span>
              <div className="relative inline-block w-10 h-5">
                <input
                  type="checkbox"
                  className="peer bg-white opacity-0 w-10 h-5"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-black rounded-full transition-all" />
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
              </div>
              <span className="text-sm">Yes</span>
            </label>
          </section>
        );

      case "Dropdown":
      case "Radio":
        return (
          <div className="flex flex-col gap-2">
            <section className="my-2">
              <input
                type="text"
                placeholder="Add field label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
                autoFocus
              />
            </section>
            {options.map((opt, index) => (
              <div key={index} className="flex items-center gap-2">
                {field.type === "radio" && <input type="radio" />}
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="focus:outline-none bg-white shadow-sm  border-gray-300 px-2 py-1 rounded text-sm w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveOption(index);
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
              }}
              className="flex items-center  w-[120px] text-blue-600 text-sm mt-2 hover:underline"
            >
              <Plus size={14} className="mr-1" /> Add Option
            </button>
          </div>
        );

      case "Paragraph":
        return (
          <section className="my-2">
            <input
              type="text"
              placeholder="Add field label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              autoFocus
            />
            <textarea
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Add help text"
            />
          </section>
        );
      case "heading1":
      case "heading2":
      case "heading3":
        return (
          <section className="my-2">
            <input
              type="text"
              placeholder="Add heading"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-white mb-2 focus:outline-none shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
              autoFocus
            />
          </section>
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

      {/* Label */}
      <div className="flex justify-between align-center my-2">
        <label className="block font-bold  mb-1 cursor-pointer pl-6">
          {field.type}
        </label>

        {!["heading1", "heading2", "heading3"].includes(field.type) && (
          <label className="flex items-center mt-1 gap-3">
            <span className="text-[15px] font-semibold">Make as required</span>
            <div className="relative inline-block w-10 h-5 cursor-pointer">
              <input
                checked={required}
                value={required}
                onChange={(e) => setRequired(e.target.checked)}
                type="checkbox"
                className="peer opacity-0 w-10 h-5"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 peer-checked:bg-black rounded-full transition-all" />
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
            </div>
          </label>
        )}
      </div>
      <section className="bg-[#F6F6F6] rounded p-4">
        <span className="text-sm font-bold">Label</span>

        <div>{renderField()}</div>
      </section>
      <section className="bg-[#F6F6F6] rounded p-4">
        {field.type === "Short Answer" ? (
          <>
            <span className="text-sm font-bold">Field Type</span>
            <select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              className="w-full focus:outline-none bg-white my-2 shadow-sm px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option>Select option</option>
              {fieldTypes?.map((f, index) => (
                <option key={index} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </>
        ) : (
          ""
        )}

        <div className="flex align-center gap-2 mt-2">
          <div className="relative inline-block w-10 h-5 cursor-pointer">
            <input type="checkbox" className="peer opacity-0 w-10 h-5" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 peer-checked:bg-blue-500 rounded-full transition-all" />
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
          </div>
          <span className="text-[15px] ">
            Only show fields when conditions are met
          </span>
        </div>
      </section>
      <div className="flex justify-between my-3">
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="p-2 bg-gray-50 shadow-sm border-gray-200 text-red-500 hover:text-red-700"
          title="Delete field"
        >
          <Trash2 size={16} />
        </button>
        <button
          onClick={handleSave}
          className="bg-black text-white text-[15px] py-1 px-2 rounded"
        >
          Done
        </button>
      </div>
      {/* Input Field */}
    </div>
  );
}

export default FieldCard;
