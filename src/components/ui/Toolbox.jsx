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
} from "lucide-react";
import { useState } from "react";

const boxClass =
  "flex items-center mb-4 gap-3 p-3 px-6 bg-gray-50 rounded shadow-sm cursor-grab transition-transform transform hover:bg-gray-100 hover:shadow-md hover:scale-105 text-sm font-medium";
const groupTitleClass = "text-xs font-semibold text-gray-500 mb-2 uppercase";

export default function Toolbox() {
  const [showHeadings, setShowHeadings] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        className={`fixed md:relative top-0 right-0 h-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)] rounded space-y-6 p-4 px-8 z-10 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 w-[auto]`}
      >
        <div>
          <h3 className={groupTitleClass}>Text Elements</h3>

          <div
            className={boxClass}
            draggable
            onDragStart={handleDrag({
              type: "short_answer",
              label: "Short Answer",
            })}
          >
            <Text size={18} />
            Short Answer
          </div>

          <div
            className={boxClass}
            draggable
            onDragStart={handleDrag({ type: "paragraph", label: "Paragraph" })}
          >
            <AlignLeft size={18} />
            Paragraph
          </div>

          <div className="mt-3">
            <div
              className={`${boxClass} justify-between`}
              onClick={() => setShowHeadings(!showHeadings)}
            >
              <div className="flex items-center gap-2">
                <Type size={18} />
                Headings
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showHeadings ? "rotate-180" : ""
                }`}
              />
            </div>

            {showHeadings && (
              <div className="pl-6 mt-2 space-y-2">
                <div
                  className={boxClass}
                  draggable
                  onDragStart={handleDrag({
                    type: "heading1",
                    label: "Heading 1",
                  })}
                >
                  <Heading1 size={16} />
                  Heading 1
                </div>
                <div
                  className={boxClass}
                  draggable
                  onDragStart={handleDrag({
                    type: "heading2",
                    label: "Heading 2",
                  })}
                >
                  <Heading2 size={16} />
                  Heading 2
                </div>
                <div
                  className={boxClass}
                  draggable
                  onDragStart={handleDrag({
                    type: "heading3",
                    label: "Heading 3",
                  })}
                >
                  <Heading3 size={16} />
                  Heading 3
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className={groupTitleClass}>Multiple Choice</h3>

          <div
            className={boxClass}
            draggable
            onDragStart={handleDrag({ type: "dropdown", label: "Dropdown" })}
          >
            <List size={18} />
            Dropdown
          </div>

          <div
            className={boxClass}
            draggable
            onDragStart={handleDrag({ type: "radio", label: "Radio" })}
          >
            <Radio size={18} />
            Radio
          </div>

          <div
            className={boxClass}
            draggable
            onDragStart={handleDrag({ type: "yes_no", label: "Yes / No" })}
          >
            <ToggleLeft size={18} />
            Yes / No
          </div>

          <div
            className={boxClass}
            draggable
            onDragStart={handleDrag({ type: "number", label: "Number Input" })}
          >
            <Hash size={18} />
            Number Input
          </div>
        </div>
      </aside>
    </>
  );
}
