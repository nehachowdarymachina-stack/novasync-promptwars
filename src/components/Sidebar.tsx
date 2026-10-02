import React from 'react';
import { ActiveView } from '../types';
import { Store, BarChart3, Zap, ShieldCheck, HelpCircle, Layers, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  syncStatus: string;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  todayOrdersCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  syncStatus,
  isAudioEnabled,
  toggleAudio,
  todayOrdersCount,
}) => {
  return (
    <aside className="w-72 bg-[#0d131f] border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              <Zap className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  NOVASYNC
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Nova Cart Inventory Engine
              </p>
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="mt-4 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-medium text-slate-400">Current Hub</span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active SLA
              </span>
            </div>
            <p className="font-semibold text-slate-200 truncate">
              #104 · S.K. Grocers & Daily Needs
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              Kalyan Nagar, Bengaluru South
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-4">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Operations Workspace
          </p>

          <nav className="space-y-1.5">
            {/* View 1: Partner Store Portal */}
            <button
              onClick={() => setActiveView('partner-store')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeView === 'partner-store'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Store
                  className={`w-4 h-4 ${
                    activeView === 'partner-store'
                      ? 'text-amber-400'
                      : 'text-slate-400'
                  }`}
                />
                <div>
                  <span className="block font-semibold">Partner store portal</span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    Invoice OCR & Shelf Vision
                  </span>
                </div>
              </div>
              <span
                className={`text-xs font-mono font-medium px-2 py-0.5 rounded-md ${
                  syncStatus.includes('Just Now')
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                    : 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                }`}
              >
                {todayOrdersCount} orders
              </span>
            </button>

            {/* View 2: Executive Command Centre */}
            <button
              onClick={() => setActiveView('executive-centre')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeView === 'executive-centre'
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3
                  className={`w-4 h-4 ${
                    activeView === 'executive-centre'
                      ? 'text-indigo-400'
                      : 'text-slate-400'
                  }`}
                />
                <div>
                  <span className="block font-semibold">Executive command centre</span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    Predictive buffer & SLA metrics
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-indigo-950/80 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800/40">
                HQ
              </span>
            </button>
          </nav>

          {/* Quick Problem Context Box */}
          <div className="mt-6 mx-1 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-slate-200">
                  Case Study Mission
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                  Rescuing Nova Cart by fixing the 39% merchant stock-sync bottleneck & cutting the 35% item unavailability rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>320 Kiranas Linked</span>
          </span>
          <span className="font-mono text-slate-400">48 Dark Stores</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
            title="Toggle tactical UI chimes"
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px]">Audio Muted</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-slate-400 font-mono">
            Nova Cart OS
          </span>
        </div>
      </div>
    </aside>
  );
};
