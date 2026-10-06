import { CheckCircle, MapPin, Truck, AlertTriangle, FileText, ChevronRight, Navigation } from "lucide-react";

export default function DriverMobileScreen() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#081321] font-sans flex justify-center items-center py-10">
      {/* Mobile Device Mockup */}
      <div className="w-full max-w-[375px] h-[812px] bg-white shadow-2xl rounded-[3rem] border-[14px] border-[#081321] overflow-hidden relative flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-40 h-6 bg-[#081321] rounded-b-3xl"></div>
        </div>

        {/* Header */}
        <header className="bg-[#0F766E] text-white pt-12 pb-6 px-6 shadow-md relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs text-teal-100 font-medium">Hello, Rahul S.</p>
              <h1 className="text-xl font-bold">Your Assignments</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-800 border-2 border-white flex items-center justify-center font-bold">
              RS
            </div>
          </div>
          
          {/* Vehicle Status */}
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
            <Truck className="w-5 h-5" />
            <div>
              <p className="text-xs text-teal-100">Active Vehicle</p>
              <p className="text-sm font-bold font-mono">MH-12-AB-1234</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-[#F5F7FA] overflow-y-auto px-5 py-6">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Current Delivery</h2>
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="bg-[#081321] text-white px-5 py-3 flex justify-between items-center">
              <span className="font-mono font-bold">FD-8201</span>
              <span className="px-2 py-1 rounded bg-[#0F766E] text-xs font-bold uppercase tracking-wider">
                In Transit
              </span>
            </div>
            
            <div className="p-5">
              <div className="relative pl-6 pb-6 border-l-2 border-[#0F766E] space-y-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0F766E] border-4 border-white shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Picked up at 10:00 AM</p>
                  <p className="font-bold text-slate-800">TechLogistics Pune Warehouse</p>
                  <p className="text-sm text-slate-500 line-clamp-1">MIDC Bhosari, Pune, MH 411026</p>
                </div>
              </div>
              
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-[4px] border-[#081321] shadow-sm flex items-center justify-center">
                </div>
                <div>
                  <p className="text-xs text-[#0F766E] font-bold uppercase tracking-wider mb-1">Expected 14:30</p>
                  <p className="font-bold text-slate-800">Global Tech Park</p>
                  <p className="text-sm text-slate-500 line-clamp-1">Andheri East, Mumbai, MH 400059</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 p-4 bg-slate-50 flex gap-3">
              <button className="flex-1 flex justify-center items-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold shadow-sm text-sm active:bg-slate-100">
                <Navigation className="w-4 h-4 text-[#0F766E]" />
                Navigate
              </button>
              <button className="flex-1 flex justify-center items-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold shadow-sm text-sm active:bg-slate-100">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Report Issue
              </button>
            </div>
          </div>

          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Next Action</h2>
          
          <button className="w-full bg-[#0F766E] active:bg-[#0d645e] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#0F766E]/20 flex justify-center items-center gap-2 mb-4 transition-transform active:scale-[0.98]">
            <CheckCircle className="w-5 h-5" />
            Mark as Delivered
          </button>
          
          <button className="w-full bg-white border border-slate-200 active:bg-slate-50 text-slate-700 py-4 rounded-2xl font-bold shadow-sm flex justify-between items-center px-6 transition-transform active:scale-[0.98]">
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" />
              Upload Delivery Proof
            </span>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
          
        </main>
        
        {/* Bottom Nav */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-around items-center">
          <div className="flex flex-col items-center text-[#0F766E]">
            <Truck className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Current</span>
          </div>
          <div className="flex flex-col items-center text-slate-400">
            <Package className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">History</span>
          </div>
          <div className="flex flex-col items-center text-slate-400">
            <div className="w-6 h-6 rounded-full bg-slate-200 mb-1 flex items-center justify-center text-xs">
              RS
            </div>
            <span className="text-[10px] font-bold">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
