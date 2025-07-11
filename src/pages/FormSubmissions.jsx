import { EyeIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTemplateContext } from "../context/TemplateContext";
import ViewDetailsModal from "../components/ui/ViewDetailsModal";
import toast from "react-hot-toast";

function FormSubmissions() {
  const { templates } = useTemplateContext();
  const [submissions, setSubmissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const data = templates
      .map((t) => {
        const raw = localStorage.getItem(`form_submissions_${t.id}`);
        return raw ? JSON.parse(raw) : [];
      })
      .flat();

    setSubmissions(data);
  }, [templates]);

  const handleDelete = (id) => {
    const filtered = submissions.filter((f) => f.id !== id);
    setSubmissions(filtered);

    templates.forEach((template) => {
      const key = `form_submissions_${template.id}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        const filtered = parsed.filter((entry) => entry.id !== id);
        localStorage.setItem(key, JSON.stringify(filtered));
      }
    });

    toast.success("Form data deleted!");
  };

  return (
    <section className="ml-18 w-full p-2 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <h2 className="text-md md:text-xl font-bold text-gray-800">
          Form Submissions
        </h2>
      </div>

      {submissions.length === 0 ? (
        <p className="text-gray-500 italic">No submissions received yet.</p>
      ) : (
        <div className="flex flex-col    gap-4">
          {submissions.map((submission) => {
            const fullDate = submission.submittedAt;
            const date = new Date(fullDate).toLocaleString();
            return (
              <div
                key={submission.id}
                className="flex justify-between  border border-gray-200 rounded p-4 hover:shadow-md transition"
              >
                <div className=" mb-2">
                  <h3 className="text-lg font-semibold text-gray-700 truncate">
                    {submission.data["Full Name"]}
                  </h3>
                  <p className="text-[16px] text-gray-500">
                    Submitted on {date}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setShowModal(true);
                    }}
                    className="flex items-center text-[16px] rounded gap-2 border border-green-600 text-green-600 px-3 py-1"
                  >
                    <EyeIcon
                      size={16}
                      className=" cursor-pointer"
                      title="View"
                    />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(submission.id)}
                    className="flex items-center text-[16px] rounded gap-2 border border-red-600 text-red-600 px-3 py-1"
                  >
                    <Trash2
                      size={16}
                      className=" cursor-pointer"
                      title="Delete"
                    />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedSubmission && (
        <ViewDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          submission={selectedSubmission}
        />
      )}
    </section>
  );
}

export default FormSubmissions;
