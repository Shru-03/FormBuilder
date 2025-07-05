import { createContext, useContext, useState, useEffect } from "react";

const TemplateContext = createContext();

export function useTemplateContext() {
  return useContext(TemplateContext);
}

export function TemplateProvider({ children }) {
  const getTemplates = (() => {
    try {
      const templates = localStorage.getItem("templates");
      return templates ? JSON.parse(templates) : [];
    } catch (error) {
      console.error("Failed to get templates", error);
      return [];
    }
  })();

  const initialSelectedId = localStorage.getItem("selectedTemplateId") || null;

  const [templates, setTemplates] = useState(getTemplates);
  const [selectedTemplateId, setSelectedTemplateId] =
    useState(initialSelectedId);

  // function to set current template id to localstorge
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const selectTemplate = (id) => {
    setSelectedTemplateId(id);
    localStorage.setItem("selectedTemplateId", id);
  };

  const updateTemplate = (updatedTemplate) => {
    const neData = templates.map((t) =>
      t.id === updatedTemplate.id ? updatedTemplate : t
    );
    setTemplates(neData);
  };

  const addTemplate = (name) => {
    if (templates.length >= 5) return false;

    const newTemplate = {
      id: crypto.randomUUID(),
      name,
      sections: [],
    };

    const newList = [...templates, newTemplate];
    setTemplates(newList);

    // setting current template id to localstorgae
    setSelectedTemplateId(newTemplate.id);
    localStorage.setItem("selectedTemplateId", newTemplate.id);
    return true;
  };

  const deleteTemplate = (id) => {
    const filtered = templates.filter((t) => t.id !== id);
    setTemplates(filtered);
  };

  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem("templates", JSON.stringify(templates));
    }
  }, [templates]);

  const value = {
    templates,
    selectedTemplate,
    selectedTemplateId,
    setSelectedTemplateId,
    selectTemplate,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}
