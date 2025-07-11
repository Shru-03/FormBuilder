import { X } from "lucide-react";

function ViewDetailsModal({ isOpen, onClose, submission }) {
  if (!isOpen || !submission) return null;

  const { data } = submission;

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      {/* Modal */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto no-scrollbar  ">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
            <div className="bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Submission Details
              </h3>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {Object.entries(data).map(([label, value]) => (
                  <div key={label}>
                    {value ? (
                      <p className="text-sm font-medium text-gray-600">
                        {label}
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="text-sm text-gray-900">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                >
                  <X size={16} />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsModal;
