export default function Toast({ message, func = () => {}, type = "normal" }) {
  return (
    <div
      className={`absolute min-w-52 px-4 py-2 z-10 top-10 right-10 border border-black rounded ${
        type === "normal"
          ? ""
          : type === "danger"
          ? "bg-red-400 text-white"
          : ""
      }`}
    >
      {message}
    </div>
  );
}
