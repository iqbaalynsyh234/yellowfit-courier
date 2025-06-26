export default function KeyboardPage({ onKeyPress }: { onKeyPress: (key: string | number) => void }) {
  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-3 gap-3 mx-auto w-64">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((key, idx) => (
          <button
            key={idx}
            className={`h-14 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-150 active:scale-95 ${
              key === "" 
                ? "bg-transparent" 
                : "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600"
            }`}
            disabled={key === ""}
            onClick={() => key !== "" && onKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
