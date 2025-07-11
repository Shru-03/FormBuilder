import { Edit2, Check, Trash2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useTemplateContext } from "../../context/TemplateContext";
import FieldCard from "./FieldCard";

function SectionEditor({ section }) {
  const { selectedTemplate, updateTemplate } = useTemplateContext();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(section.title);

  const handleSave = () => {
    const updated = selectedTemplate.sections.map((s) =>
      s.id === section.id ? { ...s, title } : s
    );
    updateTemplate({ ...selectedTemplate, sections: updated });
    setEditing(false);
  };

  const handleDelete = () => {
    const updated = selectedTemplate.sections.filter(
      (s) => s.id !== section.id
    );
    updateTemplate({ ...selectedTemplate, sections: updated });
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    const fieldId = e.dataTransfer.getData("field-id");
    const rawNewField = e.dataTransfer.getData("application/json");

    if (fieldId) {
      // Handle reordering existing field
      const updatedSections = selectedTemplate.sections.map((s) => {
        if (s.id !== section.id) return s;

        const oldIndex = s.fields.findIndex((f) => f.id === fieldId);
        if (oldIndex === -1 || oldIndex === index) return s;

        const fields = [...s.fields];
        const [movedField] = fields.splice(oldIndex, 1);
        fields.splice(index > oldIndex ? index - 1 : index, 0, movedField);

        return { ...s, fields };
      });

      updateTemplate({ ...selectedTemplate, sections: updatedSections });
    } else if (rawNewField) {
      const droppedField = JSON.parse(rawNewField);
      const newField = {
        id: crypto.randomUUID(),
        type: droppedField.type,
      };

      const updatedSections = selectedTemplate.sections.map((s) => {
        if (s.id === section.id) {
          const updatedFields = [...s.fields];
          updatedFields.splice(index, 0, newField);
          return { ...s, fields: updatedFields };
        }
        return s;
      });

      updateTemplate({ ...selectedTemplate, sections: updatedSections });
    }
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="mx-auto rounded-lg bg-gray-100 my-3 px-4 py-3 mb-1 w-[700px]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
        {editing ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white  focus:outline-none p-2 rounded w-full sm:flex-1 text-base text-gray-600 text-sm"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 w-full sm:w-auto flex items-center justify-center"
            >
              <Check size={18} />
            </button>
          </div>
        ) : (
          <div
            className="text-gray-600 text-sm"
            onClick={() => setEditing(true)}
          >
            {title}
          </div>
        )}

        <X
          size={16}
          onClick={handleDelete}
          className=" text-black cursor-pointer"
        />
      </div>

      {section.fields.length === 0 ? (
        <div
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 0)}
          className=" min-h-[40px] p-3 bg-white shadow-md text-[16px] text-black text-center rounded"
        >
          <div className="flex justify-center align-center py-4 gap-2 border rounded border-gray-200 w-full">
            <Plus className="text-gray-400" /> <span>Add field</span>
          </div>
        </div>
      ) : (
        section.fields.map((field, index) => (
          <div key={field.id}>
            <div
              onDragOver={allowDrop}
              onDrop={(e) => handleDrop(e, index)}
              className="min-h-[10px]"
            />

            <FieldCard field={field} sectionId={section.id} />
          </div>
        ))
      )}

      {section.fields.length > 0 && (
        <div
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, section.fields.length)}
          className="min-h-[10px]"
        />
      )}
    </div>
  );
}

export default SectionEditor;
