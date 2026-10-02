import React, { useState } from 'react';
import {
  CANCELLATION_REASONS,
  EXECUTIVE_METRICS_COMPARISON,
  MONTHLY_SAVINGS_BREAKDOWN,
} from '../data/mockData';
import { CancellationReason, MetricComparison } from '../types';
import {
  Zap,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  IndianRupee,
  ShieldCheck,
  RefreshCw,
  Sliders,
  ChevronRight,
  Sparkles,
  BarChart2,
  Flame,
  CloudRain,
  Sun,
  PieChart,
  ArrowDown,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExecutiveCommandCentreProps {
  playAudioChime: (type: 'optimize' | 'success') => void;
}

export const ExecutiveCommandCentre: React.FC<ExecutiveCommandCentreProps> = ({
  playAudioChime,
}) => {
  const [hasRunOptimizer, setHasRunOptimizer] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'standard' | 'rain' | 'breakfast'>('standard');
  const [optimizerStep, setOptimizerStep] = useState<string>('');
  const [optimizerProgress, setOptimizerProgress] = useState<number>(0);
  const [selectedReasonModal, setSelectedReasonModal] = useState<CancellationReason | null>(null);

  const handleRunOptimizer = () => {
    setIsOptimizing(true);
    setOptimizerProgress(10);
    setOptimizerStep('Ingesting demand curves from 320 partner kiranas & 48 dark stores...');
    playAudioChime('optimize');

    setTimeout(() => {
      setOptimizerProgress(38);
      setOptimizerStep('Recalibrating dynamic buffer stock for high-velocity SKUs (Amul, Britannia)...');
    }, 700);

    setTimeout(() => {
      setOptimizerProgress(68);
      setOptimizerStep('Optimizing rider fleet routing radii & multi-hub inventory allocation...');
    }, 1400);

    setTimeout(() => {
      setOptimizerProgress(92);
      setOptimizerStep('Throttling SLA delivery commitments based on hyperlocal rain & traffic index...');
    }, 2100);

    setTimeout(() => {
      setOptimizerProgress(100);
      setOptimizerStep('Optimization complete! Projected monthly loss reduced by ₹2.4 Lakhs.');
      setIsOptimizing(false);
      setHasRunOptimizer(true);
      playAudioChime('success');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#6366f1', '#10b981', '#f59e0b'],
        });
      } catch {
        // safe fallback
      }
    }, 2800);
  };

  const handleResetOptimizer = () => {
    setHasRunOptimizer(false);
    setOptimizerProgress(0);
    setOptimizerStep('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Hero Briefing Card */}
      <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5" />
                Nova Cart Executive Turnaround Brief
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-400">
                Bengaluru Quick-Commerce Cluster
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Nova Cart Executive Command Centre
            </h2>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Tracking the operational turnaround from the <strong className="text-rose-400 font-semibold">11% cancellation crisis</strong> 6 months ago down to 6%, with predictive stock buffer automation recovering <strong className="text-emerald-400 font-semibold">₹2.4 Lakhs in monthly lost revenue</strong>.
            </p>
          </div>

          {/* Interactive Trigger Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {hasRunOptimizer && (
              <button
                onClick={handleResetOptimizer}
                disabled={isOptimizing}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Reset to Current
              </button>
            )}

            <button
              onClick={handleRunOptimizer}
              disabled={isOptimizing}
              className={`px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl whitespace-nowrap ${
                hasRunOptimizer
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-amber-500 hover:from-indigo-400 hover:to-amber-400 text-white shadow-indigo-500/25 active:scale-95'
              } disabled:opacity-50`}
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Processing Predictive Engine...</span>
                </>
              ) : hasRunOptimizer ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Optimizer Active (Re-run Engine)</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Run predictive route & buffer optimizer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Optimizer Processing Progress Bar */}
        {isOptimizing && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-mono text-indigo-300 font-medium">
                {optimizerStep}
              </span>
              <span className="font-mono text-slate-400 font-bold">
                {optimizerProgress}%
              </span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-indigo-500 via-amber-400 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${optimizerProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Financial Recovery Proof Callout: ₹2.4 Lakhs Saved */}
      <div className="bg-gradient-to-br from-[#121927] to-[#171f33] rounded-2xl border border-indigo-500/30 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-5 border-b border-slate-800/80">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Financial Impact Model
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Monthly Lost Revenue Recovered:
              <span className="font-mono text-emerald-400 text-2xl font-extrabold tabular-nums">
                ₹2.4 Lakhs
              </span>
              <span className="text-xs font-normal text-slate-400">
                (₹2,40,000 / month)
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Direct mathematical proof from eliminating out-of-sync store inventory and deadhead rider wait times across 48 dark stores.
            </p>
          </div>

          {/* Scenario Sandbox Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveScenario('standard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeScenario === 'standard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Standard Operations</span>
            </button>
            <button
              onClick={() => setActiveScenario('rain')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeScenario === 'rain'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
              <span>Monsoon Surge</span>
            </button>
            <button
              onClick={() => setActiveScenario('breakfast')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeScenario === 'breakfast'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Breakfast Milk Rush</span>
            </button>
          </div>
        </div>

        {/* 3 Pillar Financial Proof Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Pillar 1 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Prevented "Out-Of-Stock" Dropouts</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">59.2%</span>
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              ₹1,42,000
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Auto-updating merchant inventory eliminates the 35% "Product unavailable" order cancellations for Amul, Britannia, and high-velocity staples.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Saved Rider Wait & Re-Dispatch</span>
              <span className="text-xs font-mono text-amber-400 font-bold">28.3%</span>
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
              ₹68,000
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Predictive route routing stops riders from idling 14+ minutes at kirana stores with missing inventory, cutting secondary dispatch penalties.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Reduced Ticket Refunds & Credits</span>
              <span className="text-xs font-mono text-indigo-400 font-bold">12.5%</span>
            </div>
            <div className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">
              ₹30,000
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tickets dropped from 5,900 to 3,100, saving customer appeasement coupons, refund payment gateway charges, and customer churn.
            </p>
          </div>
        </div>
      </div>

      {/* Core Case Metrics: 6 Months Ago vs Now vs Optimized */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Core Case Study Metrics: 6 Months Ago vs Now
            </h3>
            <p className="text-xs text-slate-400">
              Red highlights represent critical operational danger zones before Novasync deployment.
            </p>
          </div>

          {hasRunOptimizer && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic Buffer & Routing Engine Applied
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXECUTIVE_METRICS_COMPARISON.map((metric, idx) => {
            const isCancellation = metric.label.includes('Cancellation');
            const isDelivery = metric.label.includes('Delivery');
            const isRepeat = metric.label.includes('Repeat');
            const isTickets = metric.label.includes('Tickets');

            return (
              <div
                key={idx}
                className="bg-[#111827] rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold text-slate-300">
                      {metric.label}
                    </span>
                    {isCancellation && (
                      <span className="text-[10px] font-mono uppercase bg-rose-950/80 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800/40">
                        Primary SLA
                      </span>
                    )}
                  </div>

                  {/* The Critical Comparison Values */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800/80 my-2">
                    {/* 6 Months Ago (Color-coded in red for danger!) */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block font-medium">
                        6 Mos Ago (Crisis)
                      </span>
                      <span className="text-2xl font-extrabold font-mono text-rose-400 tabular-nums block">
                        {metric.sixMonthsAgo}
                      </span>
                      <span className="text-[10px] text-rose-400 font-medium block">
                        Operational Danger
                      </span>
                    </div>

                    {/* Current / Optimized */}
                    <div className="space-y-0.5 pl-3 border-l border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block font-medium">
                        {hasRunOptimizer ? 'Optimized' : 'Now'}
                      </span>
                      <span
                        className={`text-2xl font-extrabold font-mono tabular-nums block ${
                          hasRunOptimizer ? 'text-emerald-400' : 'text-emerald-300'
                        }`}
                      >
                        {hasRunOptimizer ? metric.optimizedValue : metric.currentValue}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3 inline" />
                        {metric.improvementDirection === 'lower' ? 'Significant drop' : 'Substantial gain'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Table of Cancellation Reasons Exactly From the Brief */}
      <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Order Cancellation Reasons Breakdown
              </h3>
              <span className="text-xs font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                Direct Case Study Data
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Exact distribution of cancelled carts across Nova Cart network before and after buffer optimization.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            <span>Total Baseline Loss: </span>
            <span className="text-rose-400 font-bold">11% Cancellation Rate</span>
          </div>
        </div>

        {/* Reasons Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 text-[11px] font-semibold tracking-wider uppercase">
                <th className="py-3.5 px-4">Cancellation Reason</th>
                <th className="py-3.5 px-4 text-center">Baseline Share</th>
                <th className="py-3.5 px-4 text-center">
                  {hasRunOptimizer ? 'Optimized Share' : 'Current Share'}
                </th>
                <th className="py-3.5 px-4 text-right">Lost Orders / Mo</th>
                <th className="py-3.5 px-4 text-right">Revenue Loss / Mo</th>
                <th className="py-3.5 px-4">Novasync Architectural Remedy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {CANCELLATION_REASONS.map((item) => {
                const isHeroReason = item.reason === 'Product unavailable';
                const shareDisplay = hasRunOptimizer
                  ? item.percentageAfter
                  : item.reason === 'Product unavailable'
                  ? 14.5
                  : item.percentageBefore * 0.7;

                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedReasonModal(item)}
                    className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      isHeroReason ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    {/* Reason Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-100 text-xs">
                          {item.reason}
                        </span>
                        {isHeroReason && (
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20 font-bold">
                            #1 Root Cause (35%)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {item.rootCause}
                      </div>
                    </td>

                    {/* Baseline Percentage (Color coded red!) */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-rose-400 tabular-nums text-sm">
                      {item.percentageBefore}%
                    </td>

                    {/* Optimized / Current Share */}
                    <td className="py-3.5 px-4 text-center font-mono tabular-nums">
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={`font-bold text-sm ${
                            hasRunOptimizer ? 'text-emerald-400' : 'text-slate-200'
                          }`}
                        >
                          {shareDisplay.toFixed(1)}%
                        </span>
                        {hasRunOptimizer && (
                          <span className="text-[10px] text-emerald-400 font-sans">
                            (-{(item.percentageBefore - item.percentageAfter).toFixed(1)}%)
                          </span>
                        )}
                      </div>
                      {/* Visual progress bar */}
                      <div className="w-24 mx-auto bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className={`h-full ${
                            hasRunOptimizer ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                          style={{
                            width: `${(shareDisplay / item.percentageBefore) * 100}%`,
                          }}
                        />
                      </div>
                    </td>

                    {/* Lost Orders / Mo */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums">
                      {hasRunOptimizer
                        ? Math.round(item.monthlyLostOrders * 0.25).toLocaleString('en-IN')
                        : item.monthlyLostOrders.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-slate-400">orders</span>
                    </td>

                    {/* Revenue Loss */}
                    <td className="py-3.5 px-4 text-right font-mono text-rose-300 font-semibold tabular-nums">
                      ₹
                      {hasRunOptimizer
                        ? Math.round(item.monthlyLostRevenueInr * 0.22).toLocaleString('en-IN')
                        : item.monthlyLostRevenueInr.toLocaleString('en-IN')}
                    </td>

                    {/* Remedy */}
                    <td className="py-3.5 px-4 text-[11px] text-slate-300 max-w-xs">
                      <p className="line-clamp-2 leading-relaxed">
                        {item.mitigationStrategy}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal for Selected Reason */}
      {selectedReasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111827] rounded-2xl border border-slate-700 max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  Cancellation Deep Dive
                </span>
                <h4 className="text-lg font-bold text-white">
                  {selectedReasonModal.reason} ({selectedReasonModal.percentageBefore}% baseline)
                </h4>
              </div>
              <button
                onClick={() => setSelectedReasonModal(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-medium block mb-1">
                  Root Cause from Merchant Field Research:
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedReasonModal.rootCause}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                <span className="text-emerald-400 font-medium block mb-1">
                  Novasync Architectural Remedy:
                </span>
                <p className="text-emerald-200 leading-relaxed">
                  {selectedReasonModal.mitigationStrategy}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 text-center">
                  <p className="text-slate-400 text-[11px]">Monthly Lost Volume</p>
                  <p className="text-base font-bold font-mono text-rose-400">
                    {selectedReasonModal.monthlyLostOrders} Carts Aborted
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-center">
                  <p className="text-slate-400 text-[11px]">Monthly Revenue Lost</p>
                  <p className="text-base font-bold font-mono text-rose-400">
                    ₹{selectedReasonModal.monthlyLostRevenueInr.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedReasonModal(null)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
            >
              Back to Command Centre
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
