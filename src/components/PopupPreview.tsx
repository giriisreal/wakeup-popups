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
      <div className="bg-white rounded-2xl px-4 py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] max-w-[320px] flex items-start gap-3">
        {/* Avatar/Logo */}
        <div className="w-11 h-11 rounded-[10px] overflow-hidden flex-shrink-0 bg-[#f0f0f0]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl bg-[#e8e8e8]">
              📷
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4 className="font-semibold text-[#1a1a1a] truncate text-[15px]">
              {title || "Your Title"}
            </h4>
            <span className="text-[13px] text-[#999] flex-shrink-0">{time}</span>
          </div>
          <p className="text-sm text-[#666] line-clamp-2">
            {message || "Your message here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupPreview;
