interface AnnotationProps {
  number: number;
  label: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function Annotation({ number, label, position = "top-right" }: AnnotationProps) {
  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-10 group`}>
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-[#1E3A8A] dark:bg-[#06B6D4] text-white flex items-center justify-center text-xs font-semibold shadow-md cursor-help">
          {number}
        </div>
        <div className="hidden group-hover:block absolute left-8 top-0 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap max-w-xs">
          {label}
          <div className="absolute top-2 -left-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
        </div>
      </div>
    </div>
  );
}
