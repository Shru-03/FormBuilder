// src/components/ui/CreateTemplateModal.jsx
import React, { useState } from "react";
import { useTemplateContext } from "../../context/TemplateContext";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

export default function CreateTemplateModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const { addTemplate } = useTemplateContext();

  const handleCreate = () => {
    if (!name.trim()) return;

    const success = addTemplate(name.trim());
    if (success) {
      setName("");
      toast.success("Template created successfully!");
      onClose();
    } else {
      toast.error("Max 5 templates allowed.");
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="dialog-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                    <Check style={{ color: "green" }} />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-base font-semibold text-gray-900">
                      New Template
                    </h3>
                    <div className="mt-2 w-full">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter template name"
                        className="border border-gray-300 focus:outline-none  text-black w-full md:w-[450px] p-2 rounded mb-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  id="dialog-title"
                  onClick={handleCreate}
                  className="inline-flex w-full justify-center rounded bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-600 sm:ml-3 sm:w-auto"
                >
                  Create
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
