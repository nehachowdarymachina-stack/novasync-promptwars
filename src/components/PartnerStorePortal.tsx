import React, { useState } from 'react';
import { InventoryItem, SampleInvoice } from '../types';
import { INITIAL_DETECTED_ITEMS, SAMPLE_INVOICES } from '../data/mockData';
import { InvoiceUploader } from './InvoiceUploader';
import { DetectedItemsTable } from './DetectedItemsTable';
import {
  Store,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Bike,
  ShoppingBag,
} from 'lucide-react';

interface PartnerStorePortalProps {
  stockSyncStatus: string;
  setStockSyncStatus: (status: string) => void;
  marginSavedInr: number;
  setMarginSavedInr: React.Dispatch<React.SetStateAction<number>>;
  todayOrdersCount: number;
  setTodayOrdersCount: React.Dispatch<React.SetStateAction<number>>;
  playAudioChime: (type: 'scan' | 'success') => void;
}

export const PartnerStorePortal: React.FC<PartnerStorePortalProps> = ({
  stockSyncStatus,
  setStockSyncStatus,
  marginSavedInr,
  setMarginSavedInr,
  todayOrdersCount,
  setTodayOrdersCount,
  playAudioChime,
}) => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_DETECTED_ITEMS);
  const [isScanning, setIsScanning] = useState(false);
  const [isPushingLive, setIsPushingLive] = useState(false);
  const [hasPushedLive, setHasPushedLive] = useState(false);
  const [activeInvoiceTitle, setActiveInvoiceTitle] = useState('Metro Cash & Carry Wholesale Bill #4920');
  const [distributorName, setDistributorName] = useState('Metro Cash & Carry Hub #04');
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const isOutOfSync = stockSyncStatus.includes('2 days ago');

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, detectedQuantity: newQty } : item))
    );
  };

  const handleToggleSelect = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleSelectAll = (select: boolean) => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  const handleScanComplete = (invoice: SampleInvoice) => {
    setActiveInvoiceTitle(invoice.title);
    setDistributorName(invoice.distributor);
    setItems(invoice.items.map((i) => ({ ...i, status: 'verified', selected: true })));
    setNotificationBanner(
      `Scanned ${invoice.itemCount} line items from ${invoice.title}. Ready for stock sync confirmation.`
    );
  };

  const handleConfirmPushLive = () => {
    setIsPushingLive(true);
    playAudioChime('scan');

    setTimeout(() => {
      setIsPushingLive(false);
      setHasPushedLive(true);
      setStockSyncStatus('Synced Just Now · 100% verified');
      setMarginSavedInr((prev) => prev + 1600); // Margin saved increases from ₹1,250 to ₹2,850
      setTodayOrdersCount((prev) => prev + 7); // Additional orders unlocked now that stock is live
      playAudioChime('success');
      setNotificationBanner(
        'Inventory broadcast successful! Amul Butter, Britannia Bread and 4 other SKUs are now live for rider pickup.'
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Dynamic Success / Alert Banner */}
      {isOutOfSync && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-900/60 border border-rose-700/80 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                Operational Warning: Stale Inventory Detected
                <span className="text-xs font-mono font-normal text-rose-300">
                  (Stock Sync: Out of sync - 2 days ago)
                </span>
              </p>
              <p className="text-xs text-rose-200/80 mt-0.5">
                Britannia Bread and Amul Butter are listed as 0 on customer storefront. 39% of stores cite manual entry effort as the roadblock. Use one-click invoice sync below to publish instantly.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('uploader-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-lg bg-rose-800 hover:bg-rose-700 text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Resolve Sync Now
          </button>
        </div>
      )}

      {notificationBanner && !isOutOfSync && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notificationBanner}</span>
          </div>
          <button
            onClick={() => setNotificationBanner(null)}
            className="text-emerald-400 hover:text-emerald-200 text-xs font-semibold px-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Quick Metrics Matching Case Study */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Today's Orders (24) */}
        <div className="bg-[#111827] rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-400">
              Order Volume
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {todayOrdersCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              orders fulfilled today
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>21 Completed</span>
            <span aria-hidden="true">·</span>
            <span>3 In-Transit</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">0 Cancelled</span>
          </div>
        </div>

        {/* Metric 2: Stock Sync Status ("Out of sync - 2 days ago") */}
        <div
          className={`rounded-2xl border p-5 shadow-lg relative overflow-hidden transition-all ${
            isOutOfSync
              ? 'bg-[#191216] border-rose-800/70'
              : 'bg-[#111827] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-400">
              Stock Sync Status
            </span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isOutOfSync
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {isOutOfSync ? (
                <AlertTriangle className="w-4 h-4 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className={`text-lg font-bold font-mono tracking-tight ${
                isOutOfSync ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {stockSyncStatus}
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              {isOutOfSync
                ? 'Store inventory stale: 39% pain point'
                : 'Real-time ATP verified across dark-store routing'}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">POS Hook: Active</span>
            <span
              className={`font-semibold ${
                isOutOfSync ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {isOutOfSync ? 'Action Required' : 'Synchronized'}
            </span>
          </div>
        </div>

        {/* Metric 3: Est. Margin Saved (₹1,250) */}
        <div className="bg-[#111827] rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-400">
              Merchant Profit Saved
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              ₹{marginSavedInr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              +{hasPushedLive ? '128%' : 'baseline'}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Avoided Stockouts: 14</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Surge Margin: 12%</span>
          </div>
        </div>
      </div>

      {/* Interactive Tool: One-Click Invoice & Shelf Image Sync */}
      <section id="uploader-section" className="space-y-4">
        <InvoiceUploader
          onScanComplete={handleScanComplete}
          isScanning={isScanning}
          setIsScanning={setIsScanning}
          playAudioChime={playAudioChime}
        />
      </section>

      {/* Interactive Data Table Mapping Out Detected Items */}
      <section className="space-y-4">
        <DetectedItemsTable
          items={items}
          onUpdateQuantity={handleUpdateQuantity}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onConfirmPushLive={handleConfirmPushLive}
          isPushingLive={isPushingLive}
          hasPushedLive={hasPushedLive}
          sourceDocTitle={activeInvoiceTitle}
          distributorName={distributorName}
        />
      </section>

      {/* Quick Active Store Order Flow / Live Dispatch Feed */}
      <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bike className="w-4 h-4 text-amber-400" />
              Live Nova Cart Hyperlocal Dispatch Queue
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Riders arriving at Hub #104 based on verified live shelf inventory
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60">
            3 Active Pickups
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-slate-200 font-semibold">#NC-8921</span>
              <span className="text-[11px] font-mono text-amber-400">Arriving in 2m</span>
            </div>
            <p className="text-slate-300 font-medium truncate">
              Amul Butter (500g) × 1, Britannia Bread × 1
            </p>
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span>Rider: Ramesh K.</span>
              <span className="text-emerald-400 font-mono">Stock Ready</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-slate-200 font-semibold">#NC-8922</span>
              <span className="text-[11px] font-mono text-slate-400">Packing Now</span>
            </div>
            <p className="text-slate-300 font-medium truncate">
              Nandini Milk 500ml × 2, Tata Salt 1kg × 1
            </p>
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span>Rider: Sunil V.</span>
              <span className="text-emerald-400 font-mono">Stock Ready</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-slate-200 font-semibold">#NC-8923</span>
              <span className="text-[11px] font-mono text-emerald-400">Bagged & Sealed</span>
            </div>
            <p className="text-slate-300 font-medium truncate">
              Maggi Noodles 4-Pack × 2, Fortune Oil 1L × 1
            </p>
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span>Rider: Deepa M.</span>
              <span className="text-emerald-400 font-mono">Dispatched</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
