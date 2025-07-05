import { Plus } from "lucide-react";
import { useTemplateContext } from "../../context/TemplateContext";
import SectionEditor from "./SectionEditor";

function Builder({ onCreateClick }) {
  const { templates, selectedTemplate, updateTemplate } = useTemplateContext();

  const handleAddSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      title: `Untitled Section`,
      fields: [],
    };
    updateTemplate({
      ...selectedTemplate,
      sections: [...selectedTemplate.sections, newSection],
    });
  };

  if (!selectedTemplate) {
    return (
      <main className="flex-1 p-6">
        <p className="text-gray-500 italic">
          Select a template to start building.
        </p>
        <button
          onClick={onCreateClick}
          disabled={templates.length >= 5}
          className="mt-4 flex items-center gap-1 px-4 py-1 bg-black text-[16px] text-white rounded-sm hover:bg-gray-800 transition cursor-pointer"
        >
          <Plus size={16} /> Create
        </button>
      </main>
    );
  }

  return (
    <main className="flex-1 p-2 md:p-6 overflow-y-auto bg-[#fdfdf9]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {selectedTemplate.name}
      </h2>

      {selectedTemplate.sections.map((section) => (
        <SectionEditor key={section.id} section={section} />
      ))}

      <button
        onClick={handleAddSection}
        className="flex items-center gap-2 px-4 py-2 text-[16px] bg-black text-white rounded hover:bg-gray-700 cursor-pointer"
      >
        <Plus size={18} /> Add Section
      </button>
    </main>
  );
}

export default Builder;
