export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-6 pb-24 sm:pt-8">
      <div className="arcane-panel flex min-h-[220px] flex-col items-center justify-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-400 border-t-[#c77dff]" />
        <p className="font-cinzel text-2xl font-semibold text-white">
          Fetching Data...
        </p>
      </div>
    </div>
  );
}
