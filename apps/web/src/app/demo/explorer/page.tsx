'use client'

import { Search, Filter, Plus, FileText, ArrowRight, Truck, Clock, AlertCircle, MapPin, CheckCircle2, ShieldCheck, Box } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShipmentExplorer() {
  const { data: apiShipments, isLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/shipments/');
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      } catch (err) {
        return [];
      }
    }
  });

  const staticShipments = [
    { id: 'FD-8201', reference_number: 'FD-8201', origin: 'Pune', destination: 'Mumbai', status: 'In Transit', driver: 'Rahul S.', vehicle: 'MH-12-AB-1234', time: 'Expected 14:30', exception: null, progress: 66 },
    { id: 'FD-8202', reference_number: 'FD-8202', origin: 'Nashik', destination: 'Pune', status: 'Picked Up', driver: 'Amit K.', vehicle: 'MH-15-XY-9876', time: 'Expected 18:00', exception: null, progress: 15 },
    { id: 'FD-8203', reference_number: 'FD-8203', origin: 'Surat', destination: 'Mumbai', status: 'Assigned', driver: 'Sanjay M.', vehicle: 'GJ-05-CD-4567', time: 'Tomorrow 10:00', exception: 'Delay reported', progress: 0 },
    { id: 'FD-8204', reference_number: 'FD-8204', origin: 'Bengaluru', destination: 'Hyderabad', status: 'Delivered', driver: 'Vikram P.', vehicle: 'KA-01-EF-4455', time: 'Delivered 09:15', exception: null, progress: 100 },
  ];

  const shipments = apiShipments?.length ? apiShipments.map((s: any) => ({...s, progress: s.status === 'Delivered' ? 100 : s.status === 'In Transit' ? 66 : s.status === 'Picked Up' ? 25 : 0})) : staticShipments;
  const [selectedShipment, setSelectedShipment] = useState(shipments[0]);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // High-tech background grid pattern
  const BackgroundGrid = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#081321]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#0F766E]/20 to-transparent opacity-50" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#081321] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      <BackgroundGrid />
      
      {/* Header - Glassmorphism */}
      <header className="relative z-20 bg-[#081321]/60 backdrop-blur-xl border-b border-white/10 px-8 py-5 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0F766E] to-[#5EEAD4] rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#112235] to-[#081321] border border-white/10 flex items-center justify-center">
              <Box className="w-5 h-5 text-[#5EEAD4]" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight text-white tracking-tight">FleetDesk <span className="font-light text-[#5EEAD4]">Nexus</span></h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EEAD4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EEAD4]"></span>
              </span>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Global Operations Live</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Track shipment ID..." 
              className="pl-10 pr-4 py-2.5 bg-[#112235]/80 border border-white/10 focus:bg-[#112235] focus:border-[#5EEAD4]/50 focus:ring-1 focus:ring-[#5EEAD4]/50 rounded-lg text-sm outline-none transition-all w-72 text-white placeholder:text-slate-500 shadow-inner"
            />
          </div>
          <button 
            onClick={() => alert('Filter panel coming soon!')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#112235]/80 border border-white/10 hover:bg-white/5 hover:border-white/20 rounded-lg text-sm font-medium transition-all shadow-sm"
          >
            <Filter className="w-4 h-4 text-[#5EEAD4]" />
            Filters
          </button>
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(15,118,110,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0F766E] to-[#0d635c] text-white rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(15,118,110,0.3)] border border-[#5EEAD4]/20"
          >
            <Plus className="w-4 h-4" />
            New Dispatch
          </motion.button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left: List Panel - 3D Glass Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-[45%] flex flex-col bg-[#112235]/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h2 className="font-semibold text-white tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#5EEAD4]" />
              Active Network
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#0F766E]/20 text-[#5EEAD4] text-xs font-bold border border-[#0F766E]/30 shadow-[0_0_10px_rgba(15,118,110,0.2)]">
              {shipments.length} Active
            </span>
          </div>
          
          <div className="overflow-y-auto flex-1 p-4 space-y-3 custom-scrollbar">
            {shipments.map((shipment: any, i: number) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={shipment.id} 
                className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  selectedShipment?.id === shipment.id 
                    ? 'border-[#5EEAD4]/50 bg-gradient-to-br from-[#0F766E]/20 to-transparent shadow-[0_8px_30px_rgba(15,118,110,0.15)] transform scale-[1.02]' 
                    : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
                onClick={() => setSelectedShipment(shipment)}
              >
                {/* Active Indicator Glow */}
                {selectedShipment?.id === shipment.id && (
                  <div className="absolute -left-1 top-0 bottom-0 w-1.5 bg-[#5EEAD4] shadow-[0_0_15px_#5EEAD4]" />
                )}

                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white tracking-wider">{shipment.id}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    shipment.status === 'In Transit' ? 'bg-[#0F766E]/20 text-[#5EEAD4] border border-[#5EEAD4]/30' :
                    shipment.status === 'Picked Up' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    shipment.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    'bg-white/5 text-slate-300 border border-white/10'
                  }`}>
                    {shipment.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-sm font-medium text-slate-300 mb-5 bg-black/20 p-2.5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{shipment.origin}</span>
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-500/50 to-transparent relative">
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#5EEAD4] shadow-[0_0_8px_#5EEAD4]"
                      animate={{ x: [ -20, 20, -20 ] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{shipment.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2 bg-[#081321]/50 px-2.5 py-1.5 rounded-md border border-white/5">
                    <Truck className="w-3.5 h-3.5 text-[#5EEAD4]" />
                    <span className="font-medium text-slate-300">{shipment.driver || 'Unassigned'}</span>
                  </div>
                  {shipment.exception ? (
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-400/10 px-2 py-1 rounded-md">
                      <AlertCircle className="w-3.5 h-3.5" /> Exception
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" /> {shipment.time || 'N/A'}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Detail Panel - 3D Presentation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-[55%] relative flex flex-col"
        >
          {selectedShipment ? (
          <div className="absolute inset-0 bg-[#112235]/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-y-auto custom-scrollbar">
            <div className="p-8 max-w-3xl mx-auto h-full">
              
              {/* Top Title & Actions */}
              <div className="mb-8 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-3xl font-black font-mono tracking-tight text-white drop-shadow-md">
                      {selectedShipment.reference_number || selectedShipment.id}
                    </h2>
                    <span className="px-3 py-1 rounded-md bg-gradient-to-r from-[#0F766E]/40 to-[#0F766E]/10 text-[#5EEAD4] text-xs font-black uppercase tracking-widest border border-[#5EEAD4]/20 shadow-[0_0_15px_rgba(15,118,110,0.3)]">
                      {selectedShipment.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0F766E]" /> Managed by Central Dispatch
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 rounded-lg text-sm font-semibold transition-colors shadow-lg"
                  >
                    Configure
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(`Tracking link for ${selectedShipment.id} copied to clipboard!`)}
                    className="px-4 py-2 bg-gradient-to-r from-[#081321] to-[#112235] border border-[#5EEAD4]/30 hover:border-[#5EEAD4] text-[#5EEAD4] rounded-lg text-sm font-semibold transition-all shadow-[0_0_10px_rgba(94,234,212,0.1)]"
                  >
                    Share Telemetry
                  </motion.button>
                </div>
              </div>

              {/* 3D Route Map Visualization */}
              <div className="relative bg-gradient-to-br from-[#081321] to-[#112235] rounded-2xl shadow-inner border border-white/5 p-8 mb-8 overflow-hidden group">
                {/* Decorative Map Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F766E]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5EEAD4]/5 rounded-full blur-2xl" />
                
                <h3 className="text-xs font-bold text-slate-400 mb-10 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" /> Live Telemetry
                </h3>
                
                <div className="relative max-w-xl mx-auto px-4 mb-4">
                  {/* Track Background */}
                  <div className="absolute top-4 left-6 right-6 h-1.5 bg-[#1E293B] rounded-full overflow-hidden border border-black/50 shadow-inner">
                    {/* Active Track with Glow */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedShipment.progress || 0}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#0F766E] via-[#2DD4BF] to-[#5EEAD4] rounded-full relative"
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white/50 to-transparent" />
                    </motion.div>
                  </div>
                  
                  {/* Nodes */}
                  <div className="relative flex justify-between">
                    {/* Origin Node */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#081321] border-2 border-[#5EEAD4] shadow-[0_0_15px_rgba(94,234,212,0.4)] flex items-center justify-center z-10 relative">
                        <CheckCircle2 className="w-5 h-5 text-[#5EEAD4]" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-sm text-white drop-shadow-md">{selectedShipment.origin}</p>
                        <p className="text-xs text-slate-400 font-mono">DEP: 10:00</p>
                      </div>
                    </div>
                    
                    {/* Current Vehicle Node */}
                    <div className="flex flex-col items-center gap-3 absolute top-0 -translate-x-1/2" style={{ left: `${selectedShipment.progress || 50}%` }}>
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#042F2E] border border-[#5EEAD4]/50 shadow-[0_10px_25px_rgba(15,118,110,0.6)] flex items-center justify-center z-20 relative backdrop-blur-sm"
                      >
                        <Truck className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="text-center bg-[#081321]/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md shadow-xl">
                        <p className="font-bold text-xs text-[#5EEAD4] uppercase tracking-wider">{selectedShipment.status}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">SPD: 64km/h</p>
                      </div>
                    </div>

                    {/* Destination Node */}
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-[#081321] border-2 ${selectedShipment.progress === 100 ? 'border-[#5EEAD4] shadow-[0_0_15px_rgba(94,234,212,0.4)]' : 'border-slate-600'} flex items-center justify-center z-10 relative`}>
                        {selectedShipment.progress === 100 ? <CheckCircle2 className="w-5 h-5 text-[#5EEAD4]" /> : <MapPin className="w-4 h-4 text-slate-500" />}
                      </div>
                      <div className="text-center">
                        <p className={`font-bold text-sm ${selectedShipment.progress === 100 ? 'text-white' : 'text-slate-400'} drop-shadow-md`}>{selectedShipment.destination}</p>
                        <p className="text-xs text-slate-500 font-mono">ETA: 14:30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Cards Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Assignment Card */}
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl shadow-lg border border-white/10 p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Truck className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">Asset Assignment</h3>
                  <div className="space-y-5 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 flex items-center justify-center shadow-inner">
                        <span className="text-sm font-black text-white">
                          {selectedShipment.driver ? selectedShipment.driver.substring(0, 2).toUpperCase() : 'UA'}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">Operative</p>
                        <p className="text-base font-bold text-white">{selectedShipment.driver || 'Pending Assignment'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 flex items-center justify-center shadow-inner">
                        <ShieldCheck className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">Transport Unit</p>
                        <p className="text-base font-mono font-bold text-[#5EEAD4] bg-[#0F766E]/10 px-2 py-0.5 rounded border border-[#0F766E]/30 inline-block">{selectedShipment.vehicle || 'TBD'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Customer Card */}
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl shadow-lg border border-white/10 p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Box className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">Client Manifest</h3>
                  <div className="space-y-5 relative z-10">
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">Corporate Entity</p>
                      <p className="text-base font-bold text-white flex items-center gap-2">
                        TechLogistics Global <CheckCircle2 className="w-4 h-4 text-[#5EEAD4]" />
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">Authorization Code</p>
                      <p className="text-base font-mono font-bold text-slate-300">AUTH-992831-X</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Documents Dropzone */}
              <div className="bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl shadow-lg border border-white/10 p-6">
                <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Secure Documents</h3>
                <label className="relative overflow-hidden border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 hover:border-[#5EEAD4]/50 transition-all cursor-pointer group shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F766E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        alert(`Encrypted upload initiated for: ${e.target.files[0].name}`);
                      }
                    }}
                  />
                  <div className="w-14 h-14 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(94,234,212,0.2)] transition-all">
                    <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#5EEAD4] transition-colors" />
                  </div>
                  <p className="text-base font-bold text-white mb-1 group-hover:text-[#5EEAD4] transition-colors drop-shadow-sm">Initialize File Transfer</p>
                  <p className="text-xs text-slate-500 font-medium">Encrypted PDF, JPG, PNG (Max 50MB)</p>
                </label>
              </div>

            </div>
          </div>
          ) : (
            <div className="absolute inset-0 bg-[#112235]/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-slate-500">
              <ShieldCheck className="w-16 h-16 mb-4 text-slate-600/50" />
              <p className="font-medium text-lg">Awaiting Terminal Selection</p>
              <p className="text-sm">Select a node from the active network to view telemetry.</p>
            </div>
          )}
        </motion.div>
      </main>

      {/* 3D Modals */}
      <AnimatePresence>
        {(isNewModalOpen || isEditModalOpen) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-[#081321]/80 backdrop-blur-xl" onClick={() => { setIsNewModalOpen(false); setIsEditModalOpen(false); }} />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-gradient-to-br from-[#112235] to-[#081321] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-lg overflow-hidden relative z-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F766E] via-[#5EEAD4] to-[#0F766E]" />
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="font-black text-xl text-white tracking-tight flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0F766E]/20 flex items-center justify-center border border-[#0F766E]/50">
                    {isNewModalOpen ? <Plus className="w-4 h-4 text-[#5EEAD4]" /> : <Box className="w-4 h-4 text-[#5EEAD4]" />}
                  </div>
                  {isNewModalOpen ? 'Initialize Deployment' : 'Configure Parameters'}
                </h2>
                <button 
                  onClick={() => { setIsNewModalOpen(false); setIsEditModalOpen(false); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Origin Point</label>
                    <input type="text" className="w-full px-4 py-3 bg-[#081321] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5EEAD4]/50 focus:border-[#5EEAD4] shadow-inner transition-all" placeholder="e.g. Pune Base" defaultValue={isEditModalOpen ? selectedShipment?.origin : ''} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Destination Node</label>
                    <input type="text" className="w-full px-4 py-3 bg-[#081321] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5EEAD4]/50 focus:border-[#5EEAD4] shadow-inner transition-all" placeholder="e.g. Mumbai Hub" defaultValue={isEditModalOpen ? selectedShipment?.destination : ''} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operational Status</label>
                  <select className="w-full px-4 py-3 bg-[#081321] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5EEAD4]/50 focus:border-[#5EEAD4] shadow-inner transition-all appearance-none cursor-pointer">
                    <option>Draft / Planning</option>
                    <option>Assigned to Asset</option>
                    <option>Picked Up</option>
                    <option>In Transit (Live)</option>
                    <option>Delivered & Verified</option>
                  </select>
                </div>

                <div className="bg-[#0F766E]/10 border border-[#0F766E]/20 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#5EEAD4] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5EEAD4]/80 leading-relaxed">
                    <strong>System Note:</strong> Modifying deployment parameters will automatically broadcast updates to assigned operatives via the mobile terminal.
                  </p>
                </div>
              </div>
              
              <div className="px-8 py-5 border-t border-white/5 flex justify-end gap-3 bg-black/20">
                <button 
                  onClick={() => { setIsNewModalOpen(false); setIsEditModalOpen(false); }}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Abort
                </button>
                <button 
                  onClick={() => { setIsNewModalOpen(false); setIsEditModalOpen(false); alert('System Override: Configuration saved.'); }}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0F766E] to-[#0d635c] hover:from-[#115e59] hover:to-[#0f514d] border border-[#5EEAD4]/30 text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(15,118,110,0.4)]"
                >
                  {isNewModalOpen ? 'Execute Deployment' : 'Commit Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
