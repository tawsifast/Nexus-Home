import FilterablePropertyGrid from "@/components/FilterablePropertyGrid";
import { getProperty } from "@/lib/api/property";

export default async function AllPropertyPage({ searchParams }) {
  const sParams = await searchParams;
  console.log(sParams, "sparams");
  const search = sParams.search || "";
  const type = sParams.type || "";
  const order = sParams.order || "";
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }
  if (type) {
    params.set("type", type);
  }
  if (order) {
    params.set("order", order);
  }
  console.log(params, "params");
  const properties = (await getProperty(params)) || [];
  const approvedProperties = properties.filter((p) => p.status === "Approved");

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 pt-28 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Cyber Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Header Block */}
        <div className="border-b border-white/5 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400 tracking-tight">
              All Listed Properties
            </h1>
            <p className="text-slate-400 font-light text-sm md:text-base">
              Discover verified hyper-modern apartments and premium suites
              globally.
            </p>
          </div>
        </div>

        {/* Handing over raw structural approved data down to the Interactive Layer */}
        <FilterablePropertyGrid approvedProperties={approvedProperties} />
      </div>
    </main>
  );
}
