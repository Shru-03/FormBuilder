import { Route, Routes } from "react-router-dom";
import MainSection from "./pages/MainSection";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/saved-templates" element={<MainSection />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </div>
  );
}

export default App;
