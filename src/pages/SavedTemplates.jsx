import { useTemplateContext } from "../context/TemplateContext";
import { Plus, Edit, Trash2, EyeIcon } from "lucide-react";

function SavedTemplates({ onCreateClick, navigate }) {
  const {
    templates,
    selectTemplate,
    selectedTemplateId,
    setSelectedTemplateId,
    deleteTemplate,
  } = useTemplateContext();

  return (
    <section className="w-full p-2 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <h2 className="text-md md:text-xl font-bold text-gray-800">
          Saved Templates
        </h2>

        {templates.length === 5 ? (
          ""
        ) : (
          <button
            onClick={onCreateClick}
            disabled={templates.length >= 5}
            className="flex items-center gap-2 px-3 py-1.5 bg-black text-white text-[16px] md:text-sm rounded hover:bg-gray-800 disabled:opacity-50"
          >
            <Plus size={16} /> New Template
          </button>
        )}
      </div>
      {templates.length === 5 ? (
        <p className="text-sm mb-3 text-red-400 italic">
          Limit reached: You can only have 5 templates. Delete one to create a
          new template.
        </p>
      ) : (
        ""
      )}
      {templates.length === 0 ? (
        <p className="text-gray-500 italic">No templates saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded p-4 cursor-pointer transition hover:shadow-md ${
                selectedTemplateId === template.id
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => selectTemplate(template.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {template.name}
                </h3>
                <div className="flex gap-2">
                  {selectedTemplateId === template.id && (
                    <EyeIcon
                      onClick={() => {
                        navigate("/preview");
                      }}
                      size={18}
                      className="text-gray-500"
                    />
                  )}
                  {selectedTemplateId === template.id && (
                    <Edit
                      onClick={() => {
                        setSelectedTemplateId(template.id);
                        navigate("/");
                      }}
                      size={16}
                      className="text-green-500"
                    />
                  )}
                  {selectedTemplateId === template.id && (
                    <Trash2
                      onClick={() => {
                        deleteTemplate(template.id);
                      }}
                      size={16}
                      className="text-red-500"
                    />
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {template.sections.length} Section
                {template.sections.length !== 1 ? "s" : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedTemplates;
