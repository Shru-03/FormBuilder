import { ArrowBigLeftIcon, ArrowLeft, EyeIcon, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useTemplateContext } from "../../context/TemplateContext";

const Navbar = ({ navigate, onPreview }) => {
  const { templates, selectedTemplateId, selectedTemplate } =
    useTemplateContext();

  const location = useLocation();
  const isFormSubmissions = location.pathname === "/form-submissions";
  const isSavedTemplatesPage = location.pathname === "/saved-templates";

  const handleSaveDraft = () => {
    if (!selectedTemplateId || templates.length === 0) {
      toast.error("No template selected to save.");
      return;
    }
    toast.success("Draft saved successfully!");
    navigate("/saved-templates");
  };

  const handlePreview = () => {
    if (!selectedTemplateId || templates.length === 0) {
      toast.error("No template selected to preview.");
      return;
    }
    navigate("/preview");
  };

  return (
    <section className="w-full px-1 sm:px-6 py-3 flex justify-between items-center bg-white top-0 ">
      <div className="flex justify-center ml-14 items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white shadow-md border border-gray-200 rounded"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-[16px]">Back</span>
      </div>
      {selectedTemplate ? (
        <h2 className="text-l font-semibold text-gray-800">
          {selectedTemplate.name}
        </h2>
      ) : (
        ""
      )}

      {!isSavedTemplatesPage && !isFormSubmissions && (
        <div className="flex gap-4">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1 px-2 sm:px-4 py-1 text-[16px] border border-black text-gray-800 rounded-sm transition cursor-pointer"
          >
            <Save size={16} /> <span className="sm:block hidden">Save </span>
          </button>

          <button
            onClick={handlePreview}
            className="flex items-center gap-1 px-2 sm:px-4 bg-black text-[16px] text-white rounded-sm hover:bg-gray-800 transition cursor-pointer"
          >
            <EyeIcon size={16} />{" "}
            <span className="sm:block hidden">Preview</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Navbar;
