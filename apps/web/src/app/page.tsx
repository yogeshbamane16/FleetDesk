import Link from "next/link";
import { ArrowRight, Package, Truck, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#081321] text-slate-50 font-sans selection:bg-[#5EEAD4] selection:text-[#081321]">
      <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#0F766E] flex items-center justify-center shadow-lg shadow-[#0F766E]/20">
            <Truck className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">FleetDesk</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="#workflow" className="text-slate-300 hover:text-white transition-colors">
            Workflow
          </Link>
          <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link 
            href="/demo" 
            className="bg-[#0F766E] hover:bg-[#0d645e] text-white px-4 py-2 rounded-md transition-all shadow-lg shadow-[#0F766E]/20"
          >
            Explore Demo
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-20 pb-32 relative">
        {/* Background grid */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)',
              backgroundSize: '4rem 4rem'
            }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112235] border border-slate-800 text-[#5EEAD4] text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EEAD4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EEAD4]"></span>
              </span>
              v1.0 is live
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Every shipment. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EEAD4] to-[#0F766E]">
                One clear picture.
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
              Precision in motion. FleetDesk is the command center for transport operations, built to coordinate dispatch, track deliveries, and manage your fleet seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/demo" 
                className="inline-flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0d645e] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-[#0F766E]/25 group"
              >
                Explore Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#workflow" 
                className="inline-flex items-center justify-center gap-2 bg-[#112235] hover:bg-[#1e324a] text-white border border-slate-800 px-8 py-4 rounded-lg font-semibold transition-all"
              >
                See the Workflow
              </Link>
            </div>
            
            <p className="mt-8 text-xs text-slate-500 font-medium tracking-wide uppercase">
              Built by Yogeshwar Bamane — Full-Stack Portfolio
            </p>
          </div>

          <div className="relative">
            {/* Illustrative App Preview */}
            <div className="rounded-xl border border-slate-800 bg-[#112235] shadow-2xl p-4 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0F766E] to-[#5EEAD4]" />
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-semibold">Active Shipments</h3>
                  <p className="text-sm text-slate-400">Live operational view</p>
                </div>
                <div className="px-2 py-1 rounded bg-[#081321] text-xs font-mono text-slate-300">
                  Illustrative Preview
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'FD-8201', origin: 'Pune', dest: 'Mumbai', status: 'In Transit', driver: 'Rahul S.', time: 'Expected 14:30' },
                  { id: 'FD-8202', origin: 'Nashik', dest: 'Pune', status: 'Picked Up', driver: 'Amit K.', time: 'Expected 18:00' },
                  { id: 'FD-8203', origin: 'Surat', dest: 'Mumbai', status: 'Assigned', driver: 'Waiting', time: 'Tomorrow' },
                ].map((shipment, i) => (
                  <div key={shipment.id} className="p-4 rounded-lg bg-[#081321] border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-slate-400" />
                        <span className="font-mono text-sm font-semibold">{shipment.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className={`px-2 py-1 rounded-full ${
                          i === 0 ? 'bg-[#0F766E]/20 text-[#5EEAD4]' : 
                          i === 1 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {shipment.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-white font-medium">{shipment.origin}</span>
                        <div className="flex-1 w-16 h-px bg-slate-700 relative">
                          <div className={`absolute top-0 left-0 h-full bg-[#5EEAD4] transition-all duration-1000 ${
                            i === 0 ? 'w-2/3' : i === 1 ? 'w-1/4' : 'w-0'
                          }`} />
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-300">{shipment.dest}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        {shipment.driver}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {shipment.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Glow effect behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0F766E] opacity-10 blur-[100px] pointer-events-none -z-10" />
          </div>
        </div>
      </main>
    </div>
  );
}
