interface PopupPreviewProps {
  title: string;
  message: string;
  imageUrl?: string;
  time?: string;
}

const PopupPreview = ({
  title,
  message,
  imageUrl,
  time = "1m",
}: PopupPreviewProps) => {
  return (
    <div className="animate-slide-in-right">
      <div className="bg-[#f5f0e8] rounded-2xl p-4 shadow-lg border border-[#e5ddd0] max-w-[320px] flex items-start gap-3">
        {/* Avatar/Logo */}
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#e5ddd0]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">
              📷
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-[#1a1a1a] truncate text-sm">
              {title || "Your Title"}
            </h4>
            <span className="text-xs text-[#8b8680] flex-shrink-0">{time}</span>
          </div>
          <p className="text-sm text-[#4a4a4a] mt-0.5 line-clamp-2">
            {message || "Your message here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupPreview;
