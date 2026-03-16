import Card from "../_components/Card";

export default function Loading() {
  return (
    <div className="mx-auto mt-6 max-w-6xl px-6">
      <Card className="flex min-h-[220px] flex-col items-center justify-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-400 border-t-blue-300" />
        <p className="text-2xl font-semibold text-white">Fetching Data...</p>
      </Card>
    </div>
  );
}
