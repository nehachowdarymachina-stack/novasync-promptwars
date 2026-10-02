/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveView } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PartnerStorePortal } from './components/PartnerStorePortal';
import { ExecutiveCommandCentre } from './components/ExecutiveCommandCentre';
import { playChime } from './utils/sound';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('partner-store');
  const [stockSyncStatus, setStockSyncStatus] = useState<string>('Out of sync - 2 days ago');
  const [marginSavedInr, setMarginSavedInr] = useState<number>(1250);
  const [todayOrdersCount, setTodayOrdersCount] = useState<number>(24);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  const handleAudioChime = (type: 'scan' | 'success' | 'optimize' | 'click' = 'success') => {
    if (isAudioEnabled) {
      playChime(type);
    }
  };

  const handleQuickRefresh = () => {
    setIsRefreshing(true);
    handleAudioChime('scan');
    setTimeout(() => {
      setIsRefreshing(false);
      handleAudioChime('success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0d131f] border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white text-base tracking-tight">
            NOVASYNC
          </span>
          <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 font-mono">
            Nova Cart
          </span>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0d131f] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-bold text-lg text-white">Novasync Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => {
                  setActiveView('partner-store');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full p-4 rounded-xl text-left font-medium ${
                  activeView === 'partner-store'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-300'
                }`}
              >
                <span className="block font-bold">Partner store portal</span>
                <span className="text-xs text-slate-400">
                  Today orders: {todayOrdersCount} · Stock status: {stockSyncStatus}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveView('executive-centre');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full p-4 rounded-xl text-left font-medium ${
                  activeView === 'executive-centre'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'bg-slate-900 text-slate-300'
                }`}
              >
                <span className="block font-bold">Executive command centre</span>
                <span className="text-xs text-slate-400">
                  Predictive route & buffer optimizer · ₹2.4 Lakhs saved
                </span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                toggleAudio();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-slate-400"
            >
              Sound FX: {isAudioEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          syncStatus={stockSyncStatus}
          isAudioEnabled={isAudioEnabled}
          toggleAudio={toggleAudio}
          todayOrdersCount={todayOrdersCount}
        />
      </div>

      {/* Main Viewport Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeView={activeView}
          syncStatus={stockSyncStatus}
          onQuickRefresh={handleQuickRefresh}
          isSyncing={isRefreshing}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeView === 'partner-store' ? (
            <PartnerStorePortal
              stockSyncStatus={stockSyncStatus}
              setStockSyncStatus={setStockSyncStatus}
              marginSavedInr={marginSavedInr}
              setMarginSavedInr={setMarginSavedInr}
              todayOrdersCount={todayOrdersCount}
              setTodayOrdersCount={setTodayOrdersCount}
              playAudioChime={handleAudioChime}
            />
          ) : (
            <ExecutiveCommandCentre playAudioChime={handleAudioChime} />
          )}
        </main>
      </div>
    </div>
  );
}
