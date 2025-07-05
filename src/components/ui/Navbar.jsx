import { EyeIcon, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useTemplateContext } from "../../context/TemplateContext";

const Navbar = ({ navigate, onPreview }) => {
  const { templates, selectedTemplateId } = useTemplateContext();

  const location = useLocation();
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
    <header className="w-full px-1 sm:px-6 py-3 flex justify-between items-center shadow-md bg-white sticky top-0 z-50">
      <h1 className="text-l sm:text-xl font-bold text-gray-800 flex items-center">
        <span
          onClick={() => navigate("/")}
          className="logo ml-2 font-serif tracking-wide  cursor-pointer"
        >
          FormBuilder
        </span>
      </h1>

      {!isSavedTemplatesPage && (
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
    </header>
  );
};

export default Navbar;
