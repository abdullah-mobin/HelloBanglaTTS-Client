import { Link } from "react-router-dom";
import { Mic } from "lucide-react";

interface BrandProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  className?: string;
}

export default function Brand({
  size = "md",
  withText = true,
  className = "",
}: BrandProps) {
  const sizeMap = {
    sm: { box: "h-8 w-8", icon: 16, text: "text-base" },
    md: { box: "h-10 w-10", icon: 20, text: "text-xl" },
    lg: { box: "h-14 w-14", icon: 28, text: "text-3xl" },
  };

  const c = sizeMap[size];

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div
        className={`${c.box} rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        flex items-center justify-center shadow-lg shadow-indigo-200
        group-hover:scale-105 transition-transform duration-300`}
      >
        <Mic className="text-white" size={c.icon} />
      </div>
      {withText && (
        <span
          className={`${c.text} font-extrabold tracking-tight
          bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600`}
        >
          HelloBanglaTTS
        </span>
      )}
    </Link>
  );
}
