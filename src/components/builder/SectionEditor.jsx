import { Edit2, Check, Trash2 } from "lucide-react";
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
        label: droppedField.label || "Untitled Field",
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
    <div className="border border-gray-300 bg-white p-2 md:p-5 rounded-lg shadow mb-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        {editing ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full sm:flex-1 text-base text-gray-800"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto flex items-center justify-center"
            >
              <Check size={18} />
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-sm md:text-lg font-semibold text-gray-700">
              {section.title}
            </h3>
            <div className="flex gap-3 items-center self-end sm:self-auto">
              <button
                onClick={() => setEditing(true)}
                className="text-green-600 hover:text-green-800"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="space-y-3 min-h-[40px]">
        {section.fields.length === 0 ? (
          <div
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, 0)}
            className="min-h-[40px] p-3 bg-gray-50 text-sm italic text-gray-500 text-center rounded"
          >
            Drag a field from the toolbox into this section.
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
    </div>
  );
}

export default SectionEditor;
