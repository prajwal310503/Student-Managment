import { Dialog } from '@headlessui/react';
import { Trash2, X } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  loading = false
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-3xl shadow-2xl w-full max-w-sm animate-fade-in overflow-hidden">
          {/* Red accent top bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-500 to-rose-500" />

          <div className="p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 bg-red-100 rounded-2xl flex-shrink-0">
                <Trash2 className="text-red-600" size={22} />
              </div>
              <div>
                <Dialog.Title className="text-base font-bold text-gray-900 leading-snug">{title}</Dialog.Title>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{message}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <X size={15} /> Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-lg shadow-red-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <LoadingSpinner size="sm" /> : <Trash2 size={15} />}
                {loading ? 'Deleting...' : confirmLabel}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
