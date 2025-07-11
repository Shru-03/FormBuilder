import {
  Hash,
  ToggleLeft,
  List,
  Heading1,
  Heading2,
  Heading3,
  ChevronDown,
  Text,
  Type,
  Image as ImageIcon,
  Upload,
  AlignLeft,
  Radio,
  Menu,
  X,
  Search,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

const boxClass =
  "flex flex-col w-[180px] h-[130px] justify-center items-center mb-4 gap-3 p-3 px-6 bg-[#F6F6F6] rounded-md shadow-sm cursor-grab transition-transform transform hover:bg-gray-200 hover:shadow-md hover:scale-105 text-[17px] font-medium";

const subboxClass =
  " mb-4 p-3 px-6 bg-gray-50 rounded-md shadow-sm cursor-grab transition-transform transform hover:bg-gray-200 hover:shadow-md hover:scale-105 text-[17px] font-medium";
const groupTitleClass = "text-xs font-semibold text-gray-500 mb-4 uppercase";

const fields = {
  textElements: [
    { label: "Short Answer", icon: <Type size={18} /> },
    { label: "Paragraph", icon: <FileText size={18} /> },
    { label: "Headings", icon: <ChevronDown size={18} /> },
    { label: "Number", icon: <Hash size={18} /> },
  ],
  multiChoiceElements: [
    { label: "Dropdown", icon: <List size={18} /> },
    { label: "Radio", icon: <Radio size={18} /> },
    { label: "Yes/No", icon: <ToggleLeft size={18} /> },
  ],
};
export default function Toolbox() {
  const [showHeadings, setShowHeadings] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [tempInput, setTempInput] = useState("");

  const filteredTextElements = fields.textElements.filter((f) =>
    f.label.toLowerCase().includes(searchInput.toLowerCase())
  );
  const filteredMultiChoiceElements = fields.multiChoiceElements.filter((f) =>
    f.label.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchInput(tempInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [tempInput]);

  const handleDrag = (item) => (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  return (
    <>
      {/* Toggle Button for res mode */}
      <button
        className="fixed text-white z-50 top-14 right-4 md:hidden p-2 bg-black shadow-md rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Toolbox  */}
      <aside
        className={`fixed m-4 overflow-auto no-scrollbar md:relative top-0 right-0 h-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)] rounded-md space-y-6 p-4 px-8 z-10 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 w-[auto]`}
      >
        <section className="flex justify-between gap-3">
          <button className="bg-white w-full shadow-sm py-1 px-3 text-[14px] font-semibold rounded">
            Fields
          </button>
          <button className="bg-white w-full  py-1 px-3 text-[14px] font-semibold rounded">
            Workflow
          </button>
          <button className="bg-white w-full  py-1 px-3 text-[14px] font-semibold rounded">
            Permissions
          </button>
        </section>
        <div className="flex items-center ">
          <input
            type="text"
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
            className=" relative border border-gray-200 w-full rounded p-2 px-8 text-[16px]"
            placeholder="Search Elements"
          />
          <Search className="absolute left-10 text-gray-400" />
        </div>
        {filteredTextElements.length > 0 ? (
          <h3 className={groupTitleClass}>Text Elements</h3>
        ) : (
          ""
        )}
        <div className="grid grid-cols-2 gap-4">
          {filteredTextElements.map((t, index) =>
            t.label !== "Headings" ? (
              <div
                className={boxClass}
                key={index}
                draggable
                onDragStart={handleDrag({
                  type: t.label,
                })}
              >
                {t.icon}
                {t.label}
              </div>
            ) : (
              <div
                key={index}
                className={`${boxClass} justify-between`}
                onClick={() => setShowHeadings(!showHeadings)}
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    showHeadings ? "rotate-180" : ""
                  }`}
                />
                <div className="flex items-center gap-2">Headings</div>
              </div>
            )
          )}

          <div className="mt-3">
            {showHeadings && (
              <div className="pl-6 mt-2 space-y-2">
                <div
                  className={subboxClass}
                  draggable
                  onDragStart={handleDrag({
                    type: "heading1",
                  })}
                >
                  <Heading1 size={16} />
                  Heading 1
                </div>
                <div
                  className={subboxClass}
                  draggable
                  onDragStart={handleDrag({
                    type: "heading2",
                  })}
                >
                  <Heading2 size={16} />
                  Heading 2
                </div>
                <div
                  className={subboxClass}
                  draggable
                  onDragStart={handleDrag({
                    type: "heading3",
                  })}
                >
                  <Heading3 size={16} />
                  Heading 3
                </div>
              </div>
            )}
          </div>
        </div>
        {filteredMultiChoiceElements.length > 0 ? (
          <h3 className={groupTitleClass}>Multiple Choice</h3>
        ) : (
          ""
        )}

        <div className="grid grid-cols-2 gap-4">
          {filteredMultiChoiceElements.map((t, index) => (
            <div
              key={index}
              className={boxClass}
              draggable
              onDragStart={handleDrag({ type: t.label })}
            >
              {t.icon}
              {t.label}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
