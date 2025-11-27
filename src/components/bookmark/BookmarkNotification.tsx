import React from "react";
import { Bookmark, X } from "lucide-react";

interface BookmarkNotificationProps {
  show: boolean;
  onClose: () => void;
  onNavigate?: () => void;
}

const BookmarkNotification: React.FC<BookmarkNotificationProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <>
      {/* Mobile Toast Notification */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Bookmark className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="font-medium">Added to bookmarks</p>
              <p className="text-sm text-gray-500">Recipe saved successfully</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar Notification */}
      <aside className="hidden md:block fixed top-4 right-4 w-80 bg-white p-6 border border-gray-200 rounded-lg shadow-lg z-40 ">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="text-emerald-600" size={32} />
          </div>
          <p className="text-gray-600 mb-1">You have a new</p>
          <p className="text-gray-900 font-semibold mb-4">
            recipe in your bookmarks
          </p>
        </div>
      </aside>
    </>
  );
};

export default BookmarkNotification;
