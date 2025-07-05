import { useState } from "react";
import { useTemplateContext } from "../../context/TemplateContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TemplatePreview = ({ formBgColor, formTextColor }) => {
  const navigate = useNavigate();
  const { selectedTemplate } = useTemplateContext();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  if (!selectedTemplate) {
    return (
      <div className="p-6">
        <p className="text-gray-500 italic">
          No template selected for preview.
        </p>
      </div>
    );
  }

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };

  const validateField = (field, value) => {
    switch (field.type) {
      case "short_answer":
      case "paragraph":
        return value?.trim() ? "" : "This field is required.";
      case "number":
        return value && !isNaN(value) ? "" : "Enter a valid number.";
      case "yes_no":
        return value === "yes" || value === "no"
          ? ""
          : "Please select Yes or No.";
      case "dropdown":
      case "radio":
        return value ? "" : "Please make a selection.";
      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    selectedTemplate.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = formData[field.id];
        const error = validateField(field, value);
        if (error) {
          newErrors[field.id] = error;
        }
      });
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const submissionsKey = `form_submissions_${selectedTemplate.id}`;
      const existingSubmissions =
        JSON.parse(localStorage.getItem(submissionsKey)) || [];

      const newSubmission = {
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        data: formData,
      };

      localStorage.setItem(
        submissionsKey,
        JSON.stringify([...existingSubmissions, newSubmission])
      );

      toast.success("Form submitted successfully!");
      setFormData({});
    }
  };

  const renderField = (field) => {
    const baseStyle = `w-full px-4 py-2 text-[${formTextColor}] border border-gray-200 rounded text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black`;
    const errorStyle = errors[field.id]
      ? "border-red-500 focus:ring-red-500"
      : "";

    switch (field.type) {
      case "heading1":
        return (
          <h1
            className="text-xl font-bold my-4"
            style={{ color: formTextColor }}
          >
            {field.label}
          </h1>
        );
      case "heading2":
        return (
          <h2
            className="text-l font-semibold my-3"
            style={{ color: formTextColor }}
          >
            {field.label}
          </h2>
        );
      case "heading3":
        return (
          <h3
            className="text-md font-medium my-2"
            style={{ color: formTextColor }}
          >
            {field.label}
          </h3>
        );
      case "short_answer":
        return (
          <input
            type="text"
            className={`${baseStyle} ${errorStyle}`}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "paragraph":
        return (
          <textarea
            rows={4}
            className={`${baseStyle} ${errorStyle}`}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            className={`${baseStyle} ${errorStyle}`}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "yes_no":
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm">No</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData[field.id] === "yes"}
                onChange={(e) =>
                  handleChange(field.id, e.target.checked ? "yes" : "no")
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-300 peer-checked:bg-green-500 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
            </label>
            <span className="text-sm">Yes</span>
          </div>
        );
      case "dropdown":
        return (
          <select
            className={`${baseStyle} ${errorStyle}`}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select...</option>
            {field.options?.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="flex flex-col gap-2">
            {field.options?.map((opt, index) => (
              <label
                key={index}
                className="inline-flex items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={formData[field.id] === opt}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-white bg-black px-4 py-1 rounded text-[16px] hover:underline"
        >
          ← Back
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-1 p-6 md:max-w-3xl max-w-full border border-gray-300 mx-auto my-4 shadow-xl rounded"
        style={{ backgroundColor: formBgColor, color: formTextColor }}
      >
        <h2
          className="text-3xl text-center font-semibold mb-4 border-b pb-2"
          style={{ color: formTextColor }}
        >
          {selectedTemplate.name}
        </h2>

        {selectedTemplate.sections.map((section) => (
          <div key={section.id} className="mb-6 border-b border-gray-400 pb-6">
            <h3
              className="text-xl font-medium mb-4"
              style={{ color: formTextColor }}
            >
              {section.title}
            </h3>
            <div className="grid gap-6">
              {section.fields.map((field) => (
                <div key={field.id}>
                  {/* Only show label and error if it's not a heading */}
                  {!["heading1", "heading2", "heading3"].includes(
                    field.type
                  ) && (
                    <label
                      className="block mb-1 text-sm font-medium"
                      style={{ color: formTextColor }}
                    >
                      {field.label}
                    </label>
                  )}

                  {renderField(field)}

                  {/* Show error only if not heading */}
                  {!["heading1", "heading2", "heading3"].includes(field.type) &&
                    errors[field.id] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.id]}
                      </p>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="p-2 px-6 w-[300px] shadow rounded"
            style={{ backgroundColor: formTextColor, color: formBgColor }}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplatePreview;
