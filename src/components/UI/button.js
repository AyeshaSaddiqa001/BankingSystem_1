export default function Button({ text, func = () => {} }) {
  return (
    <>
      <button
        onClick={func}
        type="submit"
        className="border min-w-20 border-transparent bg-black text-white rounded px-2 py-1"
      >
        {text}
      </button>
    </>
  );
}
