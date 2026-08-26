import React from "react";
import "../styles/Loader.css";
import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="admin-loader flex min-h-[220px] items-center justify-center">
      <div className="admin-loader-content flex items-center gap-2 text-sm text-gray-500">
        <Loader2 className="animate-spin" size={18} />
        {label}
      </div>
    </div>
  );
}
