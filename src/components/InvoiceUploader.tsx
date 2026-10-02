import React, { useState, useRef } from 'react';
import { Upload, FileText, Camera, CheckCircle2, Sparkles, AlertCircle, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { SampleInvoice } from '../types';
import { SAMPLE_INVOICES } from '../data/mockData';

interface InvoiceUploaderProps {
  onScanComplete: (invoice: SampleInvoice) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
  playAudioChime: (type: 'scan' | 'success') => void;
}

export const InvoiceUploader: React.FC<InvoiceUploaderProps> = ({
  onScanComplete,
  isScanning,
  setIsScanning,
  playAudioChime,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSimulateScan = (sample: SampleInvoice, customName?: string) => {
    setSelectedFileName(customName || sample.title);
    setIsScanning(true);
    setScanProgress(15);
    setScanStep('Preprocessing high-resolution optics & barcode zones...');
    playAudioChime('scan');

    setTimeout(() => {
      setScanProgress(45);
      setScanStep('Running Novasync OCR Vision on distributor line items...');
    }, 600);

    setTimeout(() => {
      setScanProgress(80);
      setScanStep('Matching SKUs to Nova Cart Master Catalog (Amul, Britannia, Nandini)...');
    }, 1200);

    setTimeout(() => {
      setScanProgress(100);
      setScanStep('Extraction complete! Verified price bands and batch quantities.');
      setIsScanning(false);
      onScanComplete(sample);
      playAudioChime('success');
    }, 1800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSimulateScan(SAMPLE_INVOICES[0], file.name);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSimulateScan(SAMPLE_INVOICES[0], e.dataTransfer.files[0].name);
    }
  };

  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Case Study Callout */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Automated Inventory Ingestion
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            One-click invoice & shelf image sync
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Solves the core case study bottleneck where <strong className="text-amber-300 font-semibold">39% of partner stores</strong> find manual POS entry too high-effort. Simply photograph the distributor bill or your refrigerated shelf to update quantities in seconds.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Test Challans:</span>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_INVOICES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSimulateScan(sample)}
                disabled={isScanning}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {sample.type === 'invoice' ? (
                  <FileText className="w-3 h-3 text-amber-400" />
                ) : (
                  <Camera className="w-3 h-3 text-cyan-400" />
                )}
                <span>{sample.id === 'inv-metro' ? 'Metro Bill (Amul/Bread)' : sample.id === 'inv-shelf' ? 'Shelf Photo' : 'HUL Challan'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Drop Zone & Laser Scanner */}
      <div className="mt-5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isScanning && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative overflow-hidden ${
            dragActive
              ? 'border-amber-400 bg-amber-500/10'
              : 'border-slate-700/80 hover:border-amber-500/50 bg-slate-900/50 hover:bg-slate-900/80'
          }`}
        >
          {/* Laser scanning animation bar when active */}
          {isScanning && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6">
              {/* Animated laser line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse shadow-[0_0_15px_#f59e0b]" />
              
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 animate-bounce">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>

              <div className="max-w-md w-full text-center">
                <p className="text-sm font-bold text-white mb-1">
                  Parsing {selectedFileName || 'Distributor Invoice'}
                </p>
                <p className="text-xs text-amber-300 font-mono mb-3">
                  {scanStep}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-mono">
                  <span>OCR Line Extraction</span>
                  <span>{scanProgress}%</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-inner">
              <Upload className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-200">
                Drag and drop your Distributor Challan, Invoice PDF, or Shelf Photo here
              </p>
              <p className="text-xs text-slate-400">
                Supports JPG, PNG, PDF receipts up to 25MB · Instant SKU detection
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20">
                Select File from Device
              </span>
              <span className="text-xs text-slate-400 font-medium">or</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSimulateScan(SAMPLE_INVOICES[1]);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>Shelf Camera Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">99.2% Accuracy</strong> on Amul, Britannia, FMCG
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">Zero Manual Typing</strong> saves 45 mins/day
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">Live ATP Sync</strong> avoids customer checkout dropouts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
