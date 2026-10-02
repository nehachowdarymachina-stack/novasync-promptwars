import React, { useState } from 'react';
import { InventoryItem } from '../types';
import {
  Check,
  CheckCircle,
  AlertTriangle,
  Send,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  Barcode,
  ExternalLink,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DetectedItemsTableProps {
  items: InventoryItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: (select: boolean) => void;
  onConfirmPushLive: () => void;
  isPushingLive: boolean;
  hasPushedLive: boolean;
  sourceDocTitle?: string;
  distributorName?: string;
}

export const DetectedItemsTable: React.FC<DetectedItemsTableProps> = ({
  items,
  onUpdateQuantity,
  onToggleSelect,
  onSelectAll,
  onConfirmPushLive,
  isPushingLive,
  hasPushedLive,
  sourceDocTitle,
  distributorName,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showConfidenceDetail, setShowConfidenceDetail] = useState(false);

  const selectedCount = items.filter((i) => i.selected).length;
  const totalUnits = items
    .filter((i) => i.selected)
    .reduce((sum, item) => sum + item.detectedQuantity, 0);
  const totalInventoryValue = items
    .filter((i) => i.selected)
    .reduce((sum, item) => sum + item.detectedQuantity * item.sellingPrice, 0);

  const handlePushLiveWithAnimation = () => {
    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#6366f1', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
    onConfirmPushLive();
  };

  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))];
  const filteredItems =
    filterCategory === 'all'
      ? items
      : items.filter((i) => i.category === filterCategory);

  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
      {/* Header and Summary Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              OCR Vision Extraction Complete
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-400">
              {sourceDocTitle || 'Distributor Wholesale Invoice'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            Detected Items & Auto-Matched SKUs
            <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              {items.length} SKUs Identified
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Review detected quantities from{' '}
            <span className="text-slate-300 font-medium">{distributorName || 'Wholesale Distributor'}</span>.
            Click below to publish directly into the Nova Cart Rider dispatch network.
          </p>
        </div>

        {/* Live Calculation Pill Cards (Interactive Control Style) */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <p className="text-[11px] text-slate-400 uppercase font-medium">
              Incoming Restock
            </p>
            <p className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
              +{totalUnits} Units
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <p className="text-[11px] text-slate-400 uppercase font-medium">
              Gross Catalog Value
            </p>
            <p className="text-sm font-bold font-mono text-white tabular-nums">
              ₹{totalInventoryValue.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter & Table Options */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 mr-1 shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs">
          <button
            onClick={() => onSelectAll(selectedCount !== items.length)}
            className="text-slate-400 hover:text-slate-200 transition-colors text-xs font-medium"
          >
            {selectedCount === items.length ? 'Deselect All' : 'Select All'}
          </button>
          <span className="text-slate-400">·</span>
          <button
            onClick={() => setShowConfidenceDetail(!showConfidenceDetail)}
            className="text-amber-400 hover:text-amber-300 text-xs font-medium flex items-center gap-1"
          >
            <span>{showConfidenceDetail ? 'Hide Confidence' : 'Inspect AI Confidence'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Detected Items Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedCount === items.length && items.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-800 w-3.5 h-3.5 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Item & Brand</th>
              <th className="py-3 px-4">SKU Code</th>
              <th className="py-3 px-4 text-center">Current Shelf</th>
              <th className="py-3 px-4 text-center">Detected Restock</th>
              <th className="py-3 px-4 text-center">New Total</th>
              <th className="py-3 px-4 text-right">Cost / MRP</th>
              {showConfidenceDetail && <th className="py-3 px-4 text-center">AI Confidence</th>}
              <th className="py-3 px-4 text-right">Batch / Expiry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredItems.map((item) => {
              const isHeroCaseStudyItem =
                item.name.includes('Amul Butter') || item.name.includes('Britannia Bread');

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    item.selected ? 'bg-slate-900/30' : 'opacity-60'
                  } ${isHeroCaseStudyItem ? 'border-l-2 border-l-amber-500' : ''}`}
                >
                  {/* Select Checkbox */}
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => onToggleSelect(item.id)}
                      className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-800 w-3.5 h-3.5 cursor-pointer"
                    />
                  </td>

                  {/* Item Name & Details */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-100 text-xs">
                            {item.name}
                          </span>
                          {isHeroCaseStudyItem && (
                            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">
                              Core Case Item
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{item.brand}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SKU / Barcode */}
                  <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px] tabular-nums">
                    <div className="flex items-center gap-1">
                      <Barcode className="w-3 h-3 text-slate-400" />
                      <span>{item.sku}</span>
                    </div>
                  </td>

                  {/* Current Shelf Stock */}
                  <td className="py-3.5 px-4 text-center font-mono tabular-nums">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        item.currentStock === 0
                          ? 'text-rose-400 bg-rose-950/60 border border-rose-800/40 font-bold'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.currentStock} units
                    </span>
                    {item.currentStock === 0 && (
                      <span className="block text-[10px] text-rose-400 font-sans mt-0.5 font-medium">
                        Out of stock!
                      </span>
                    )}
                  </td>

                  {/* Detected Quantity (Interactive counter) */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(1, item.detectedQuantity - 5)
                          )
                        }
                        className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
                        title="Reduce 5 units"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <input
                        type="number"
                        value={item.detectedQuantity}
                        onChange={(e) =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(0, parseInt(e.target.value) || 0)
                          )
                        }
                        className="w-12 text-center bg-transparent text-emerald-400 font-bold font-mono tabular-nums text-xs focus:outline-none"
                      />

                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.detectedQuantity + 5)
                        }
                        className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
                        title="Add 5 units"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* New Combined Total */}
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-white text-xs tabular-nums">
                    <span>{item.currentStock + item.detectedQuantity}</span>
                    <span className="text-[10px] text-slate-400 ml-1 font-normal">units</span>
                  </td>

                  {/* Unit Cost vs MRP */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                    <div className="text-white font-medium">
                      ₹{item.sellingPrice}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Cost: ₹{item.unitCost} ({item.marginPercent}% margin)
                    </div>
                  </td>

                  {/* Optional AI Confidence */}
                  {showConfidenceDetail && (
                    <td className="py-3.5 px-4 text-center font-mono text-[11px] tabular-nums">
                      <span className="text-emerald-400 font-semibold">
                        {item.confidence}%
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        Exact Barcode Match
                      </span>
                    </td>
                  )}

                  {/* Batch / Expiry */}
                  <td className="py-3.5 px-4 text-right text-[11px] font-mono text-slate-300 tabular-nums">
                    <div>{item.batchNumber}</div>
                    <div className="text-[10px] text-slate-400">
                      Exp: {item.expiryDate}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Push Live Action Bar */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#1e1e38] border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Instant Available-To-Promise (ATP) Sync
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Confirming pushes {totalUnits} units directly to Nova Cart customer app & dark-store dispatch. Prevents out-of-stock cancellations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {hasPushedLive && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-2 rounded-lg bg-emerald-950/80 border border-emerald-800">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Catalog Pushed Live to Nova Cart!</span>
            </div>
          )}

          <button
            onClick={handlePushLiveWithAnimation}
            disabled={isPushingLive || selectedCount === 0}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg whitespace-nowrap ${
              hasPushedLive
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/25 active:scale-95'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPushingLive ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Broadcasting to Riders...</span>
              </>
            ) : hasPushedLive ? (
              <>
                <Check className="w-4 h-4" />
                <span>Re-Push Updated Stock</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Confirm push live</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
