export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#0A0A0A] p-10">
      <div className="h-10 w-48 rounded bg-white/10" />
      <div className="mt-10 h-24 w-full rounded bg-white/10" />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="h-48 rounded bg-white/10" />
        <div className="h-48 rounded bg-white/10" />
        <div className="h-48 rounded bg-white/10" />
      </div>
    </main>
  );
}
