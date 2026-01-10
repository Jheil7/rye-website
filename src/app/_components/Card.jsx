export default function Card({ children }) {
  return (
    <div className="px-6">
      <div className="mx-auto my-6 max-w-xl rounded-lg bg-gray-700 p-6">
        {children}
      </div>
    </div>
  );
}
