import React, { useState } from "react";
import ColorPallete from "../components/preview/ColorPallete";
import TemplatePreview from "../components/preview/TemplatePreview";

function PreviewPage() {
  const [formBgColor, setFormBgColor] = useState("#ffffff");
  const [formTextColor, setFormTextColor] = useState("#000000");

  const presetBgColors = [
    "#ffffff",
    "#fef3c7",
    "#e0f2fe",
    "#ede9fe",
    "#f3f4f6",
    "#fef2f2",
    "#ecfccb",
  ];
  const presetTextColors = [
    "#000000",
    "#1f2937",
    "#4b5563",
    "#9ca3af",
    "#dc2626",
    "#10b981",
    "#2563eb",
  ];
  return (
    <div className="flex flex-col bg-[#fdfdf9] md:flex-row min-h-screen">
      <ColorPallete
        formBgColor={formBgColor}
        formTextColor={formTextColor}
        setFormBgColor={setFormBgColor}
        setFormTextColor={setFormTextColor}
        presetBgColors={presetBgColors}
        presetTextColors={presetTextColors}
      />
      <TemplatePreview
        formBgColor={formBgColor}
        formTextColor={formTextColor}
      />
    </div>
  );
}

export default PreviewPage;
