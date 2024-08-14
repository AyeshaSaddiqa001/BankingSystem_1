export default function Toast({ message, func = () => {} }) {
  return (
    <div
      className={`absolute min-w-52 px-4 py-2 z-10 top-10 right-10 border-2 border-red-500 rounded bg-white `}
    >
      {message}
    </div>
  );
}
