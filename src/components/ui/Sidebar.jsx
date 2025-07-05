import { useState } from "react";
import { useTemplateContext } from "../../context/TemplateContext";

import { X, Menu, Folder, SquarePlus } from "lucide-react";
import toast from "react-hot-toast";

function Sidebar({ onCreateClick, navigate }) {
  const { templates, selectedTemplateId, selectTemplate } =
    useTemplateContext();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <aside
      className={`transition-all duration-300 h-full bg-gradient-to-br from-neutral-900 via-gray-900 to-black text-white shadow-[0_1px_4px_rgba(0,0,0,0.16)] p-4 ${
        isOpen ? "w-1/6 min-w-[300px]" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        {isOpen && <h2 className="text-lg font-semibold">Form Templates</h2>}
        <button
          onClick={toggleSidebar}
          className="text-white px-2 py-2  hover:text-gray-300 transition-transform duration-300 cursor-pointer"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      <button
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          }
          navigate("/saved-templates");
        }}
        className={`flex items-center mb-4 text-white hover:text-gray-300 rounded  transition-all duration-200 cursor-pointer ${
          isOpen ? "gap-2 px-2 py-2" : "w-8 h-8 mx-auto justify-center p-0"
        }`}
        title="Saved Template"
      >
        <Folder size={25} />
        {isOpen && <span>My Templates </span>}
      </button>

      <button
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            if (templates.length >= 5) {
              toast.error("You already have 5 templates.");
              return;
            }
            onCreateClick();
          }
        }}
        className={`flex items-center mb-4 text-white hover:text-gray-300 rounded   transition-all duration-200 cursor-pointer ${
          isOpen ? "gap-2 px-2 py-2" : "w-8 h-8 mx-auto justify-center p-0"
        }`}
        title="Create Template"
      >
        <SquarePlus size={25} />
        {isOpen && <span>Create </span>}
      </button>
    </aside>
  );
}

export default Sidebar;
