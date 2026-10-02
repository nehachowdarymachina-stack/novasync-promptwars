import React from 'react';
import { ActiveView } from '../types';
import { RefreshCw, Bell, HelpCircle, Store, Cpu } from 'lucide-react';

interface HeaderProps {
  activeView: ActiveView;
  syncStatus: string;
  onQuickRefresh?: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  syncStatus,
  onQuickRefresh,
  isSyncing,
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0d131f]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Zone 1: Breadcrumb & View context */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Novasync
        </span>
        <span className="text-slate-400">/</span>
        <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          {activeView === 'partner-store' ? (
            <>
              <Store className="w-4 h-4 text-amber-400" />
              <span>Partner store portal</span>
            </>
          ) : (
            <>
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Executive command centre</span>
            </>
          )}
        </h1>
        <span className="text-slate-400 hidden sm:inline">·</span>
        <span className="text-xs text-slate-400 hidden sm:inline">
          {activeView === 'partner-store'
            ? 'Hyperlocal Kirana & Micro Dark Store Fulfillment'
            : 'Supply-Demand Rebalancing & SLA Rescue Engine'}
        </span>
      </div>

      {/* Zone 2: Navigation Meta / Live Indicator */}
      <div className="hidden lg:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
          <span className="text-slate-400">Stock Sync Health:</span>
          <span
            className={`font-semibold font-mono ${
              syncStatus.includes('Just Now')
                ? 'text-emerald-400'
                : 'text-rose-400'
            }`}
          >
            {syncStatus}
          </span>
        </div>
      </div>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-3">
        {onQuickRefresh && (
          <button
            onClick={onQuickRefresh}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all disabled:opacity-50"
            title="Refresh Store Telemetry"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : ''}`}
            />
            <span className="hidden sm:inline">Live Refresh</span>
          </button>
        )}

        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500"></span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs shadow-inner">
            SK
          </div>
          <div className="hidden xl:block text-left text-xs leading-tight">
            <p className="font-semibold text-slate-200">S.K. Store #104</p>
            <p className="text-[10px] text-slate-400">Verified Partner</p>
          </div>
        </div>
      </div>
    </header>
  );
};
