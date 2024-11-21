import React from "react";
import { Info, XCircle, CheckCircle, AlertCircle } from "lucide-react";

export default function InfoMessage({
  type = "info",
  title,
  message,
  className = "",
}) {
  const styles = {
    info: {
      icon: Info,
      containerClass: "bg-blue-50 border-blue-200",
      textClass: "text-blue-800",
      iconClass: "text-blue-500",
    },
    error: {
      icon: XCircle,
      containerClass: "bg-red-50 border-red-200",
      textClass: "text-red-800",
      iconClass: "text-red-500",
    },
    success: {
      icon: CheckCircle,
      containerClass: "bg-green-50 border-green-200",
      textClass: "text-green-800",
      iconClass: "text-green-500",
    },
    warning: {
      icon: AlertCircle,
      containerClass: "bg-yellow-50 border-yellow-200",
      textClass: "text-yellow-800",
      iconClass: "text-yellow-500",
    },
  };

  const style = styles[type] || styles.info;
  const IconComponent = style.icon;

  return (
    <div
      className={`flex justify-center items-center p-4 border rounded-lg ${style.containerClass} ${className}`}
    >
      <div className="flex-shrink-0">
        <IconComponent className={`w-5 h-5 ${style.iconClass}`} />
      </div>
      <div className="ml-3 ">
        {title && (
          <h3
            className={`text-sm font-muktaVaani font-medium ${style.textClass}`}
          >
            {title}
          </h3>
        )}
        {message && (
          <div className={`text-sm font-imprima mt-1 ${style.textClass} `}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
