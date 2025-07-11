import { useState } from "react";
import Builder from "../components/builder/Builder";
import Toolbox from "../components/ui/Toolbox";
import CreateTemplateModal from "../components/ui/CreateTemplateModal";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import SavedTemplates from "./SavedTemplates";
import FormSubmissions from "./FormSubmissions";

const MainSection = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isSavedTemplates = location.pathname.includes("saved-templates");
  const isFormSubmissions = location.pathname.includes("form-submissions");
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar navigate={navigate} onCreateClick={() => setShowModal(true)} />
        <div className="w-full">
          <Navbar navigate={navigate} />
          <div className="flex h-screen bg-[#fafafa]">
            {isSavedTemplates ? (
              <SavedTemplates
                navigate={navigate}
                onCreateClick={() => setShowModal(true)}
              />
            ) : isFormSubmissions ? (
              <FormSubmissions />
            ) : (
              <Builder onCreateClick={() => setShowModal(true)} />
            )}
            {isSavedTemplates ? "" : isFormSubmissions ? "" : <Toolbox />}
          </div>
        </div>

        <CreateTemplateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default MainSection;
