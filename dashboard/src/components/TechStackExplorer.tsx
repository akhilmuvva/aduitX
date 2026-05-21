import React from 'react';
import { useAuditStore } from '../store/useAuditStore';
import { STACK_DETAILS } from '../store/constants';
import { useCyberSynth } from '../hooks/useCyberSynth';
import { Terminal, Cpu, Database, Award, Activity, Flame, ShieldCheck } from 'lucide-react';

export const TechStackExplorer: React.FC = () => {
  const { selectedLayer, setSelectedLayer } = useAuditStore();
  const { playHover, playClick } = useCyberSynth();

  const handleCardClick = (layerKey: string) => {
    playClick();
    setSelectedLayer(selectedLayer === layerKey ? null : layerKey);
  };

  const getLayerIcon = (layerKey: string) => {
    const props = { className: "w-5 h-5 transition-transform duration-300 group-hover:scale-110" };
    switch (layerKey) {
      case 'frontend': return <Terminal {...props} className={`${props.className} text-cyan-400`} />;
      case 'animation': return <Activity {...props} className={`${props.className} text-purple-400`} />;
      case 'wallet': return <ShieldCheck {...props} className={`${props.className} text-indigo-400`} />;
      case 'analysis': return <Flame {...props} className={`${props.className} text-rose-400`} />;
      case 'compute': return <Cpu {...props} className={`${props.className} text-amber-400`} />;
      case 'storage': return <Database {...props} className={`${props.className} text-sky-400`} />;
      case 'trust': return <Award {...props} className={`${props.className} text-emerald-400`} />;
      default: return <Terminal {...props} />;
    }
  };

  const getLayerBorderClass = (layerKey: string) => {
    switch (layerKey) {
      case 'frontend': return 'border-l-4 border-cyan-400';
      case 'animation': return 'border-l-4 border-purple-400';
      case 'wallet': return 'border-l-4 border-indigo-400';
      case 'analysis': return 'border-l-4 border-rose-500';
      case 'compute': return 'border-l-4 border-amber-500';
      case 'storage': return 'border-l-4 border-sky-400';
      case 'trust': return 'border-l-4 border-emerald-400';
      default: return 'border-l-4 border-cyber-indigo';
    }
  };

  const selectedData = selectedLayer ? STACK_DETAILS[selectedLayer] : null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-4 animate-[fadeIn_0.4s_ease-out]">
      {/* Left Columns: Blueprint Layer Cards */}
      <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Client & Interface Column */}
        <div className="flex flex-col gap-6">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2 border-l border-cyan-400">
            Client & Interface Layers
          </div>

          <div
            className={`group bg-cyber-card border border-white/5 rounded-xl p-5 cursor-pointer relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-cyber-cardHover hover:border-cyan-400/30 hover:-translate-y-1 hover:shadow-glow-cyan ${
              selectedLayer === 'frontend' ? 'border-cyan-400 shadow-glow-cyan bg-cyber-cardHover' : ''
            } ${getLayerBorderClass('frontend')}`}
            onClick={() => handleCardClick('frontend')}
            onMouseEnter={playHover}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/25">
                {getLayerIcon('frontend')}
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-fira">
                WEB WIDGET
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1 font-outfit">React Dashboard</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-outfit">
              Vite-powered single-page application orchestrating local scans and Web Audio HUD interactions.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React 18", "Vite 5", "Zustand", "TailwindCSS"].map((t) => (
                <span key={t} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded font-fira">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`group bg-cyber-card border border-white/5 rounded-xl p-5 cursor-pointer relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-cyber-cardHover hover:border-purple-400/30 hover:-translate-y-1 hover:shadow-glow-pink ${
              selectedLayer === 'animation' ? 'border-purple-400 shadow-glow-pink bg-cyber-cardHover' : ''
            } ${getLayerBorderClass('animation')}`}
            onClick={() => handleCardClick('animation')}
            onMouseEnter={playHover}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:bg-purple-400/10 group-hover:border-purple-400/25">
                {getLayerIcon('animation')}
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-fira">
                KINETIC LAYER
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1 font-outfit">Animation & Audio Synth</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-outfit">
              Self-contained Web Audio synthesis nodes linked with HTML5 canvas physics graph representations.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Web Audio", "Canvas 2D", "Spring Physics", "Micro-HUD"].map((t) => (
                <span key={t} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded font-fira">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`group bg-cyber-card border border-white/5 rounded-xl p-5 cursor-pointer relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-cyber-cardHover hover:border-indigo-400/30 hover:-translate-y-1 hover:shadow-glow-indigo ${
              selectedLayer === 'wallet' ? 'border-indigo-400 shadow-glow-indigo bg-cyber-cardHover' : ''
            } ${getLayerBorderClass('wallet')}`}
            onClick={() => handleCardClick('wallet')}
            onMouseEnter={playHover}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:bg-indigo-400/10 group-hover:border-indigo-400/25">
                {getLayerIcon('wallet')}
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-fira">
                IDENTITY
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1 font-outfit">Web3 Cryptographic Gate</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-outfit">
              Secure authentication via SIWE, resolving ENS handles, and targeting on-chain badge delivery addresses.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["SIWE", "Ethers v6", "ENS Mappings", "ECDSA Sign"].map((t) => (
                <span key={t} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded font-fira">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Backend Engine Column */}
        <div className="flex flex-col gap-6">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2 border-l border-rose-500">
            Decentralized Pipeline & Ledger
          </div>

          <div
            className={`group bg-cyber-card border border-white/5 rounded-xl p-5 cursor-pointer relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-cyber-cardHover hover:border-rose-500/30 hover:-translate-y-1 hover:shadow-glow-rose ${
              selectedLayer === 'analysis' ? 'border-rose-500 shadow-glow-rose bg-cyber-cardHover' : ''
            } ${getLayerBorderClass('analysis')}`}
            onClick={() => handleCardClick('analysis')}
            onMouseEnter={playHover}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:bg-rose-500/10 group-hover:border-rose-500/25">
                {getLayerIcon('analysis')}
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-fira">
                SCANNERS
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1 font-outfit">Security Analyzers Layer</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-outfit">
              Compiler verification, static analysis via Slither, and SWC constraint checks using Mythril.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Slither", "Mythril Z3", "Surya AST", "Solc"].map((t) => (
                <span key={t} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded font-fira">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`group bg-cyber-card border border-white/5 rounded-xl p-5 cursor-pointer relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-cyber-cardHover hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-glow-amber ${
              selectedLayer === 'compute' ? 'border-amber-500 shadow-glow-amber bg-cyber-cardHover' : ''
            } ${getLayerBorderClass('compute')}`}
            onClick={() => handleCardClick('compute')}
            onMouseEnter={playHover}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:bg-amber-500/10 group-hover:border-amber-500/25">
                {getLayerIcon('compute')}
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-fira">
                COMPUTE
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1 font-outfit">Decentralized P2P Compute</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-outfit">
              Distributing heavy symbolic executor jobs inside sandboxed Docker containers via Bacalhau P2P nodes.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Bacalhau", "Docker CLI", "Chainlink Functions", "P2P Compute"].map((t) => (
                <span key={t} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded font-fira">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`group bg-cyber-card border border-white/5 rounded-xl p-5 cursor-pointer relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-cyber-cardHover hover:border-sky-400/30 hover:-translate-y-1 hover:shadow-glow-cyan ${
              selectedLayer === 'storage' ? 'border-sky-400 shadow-glow-cyan bg-cyber-cardHover' : ''
            } ${getLayerBorderClass('storage')}`}
            onClick={() => handleCardClick('storage')}
            onMouseEnter={playHover}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:bg-sky-400/10 group-hover:border-sky-400/25">
                {getLayerIcon('storage')}
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-fira">
                STORAGE
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1 font-outfit">Immutable Storage Network</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-outfit">
              Hashing data vectors into IPFS blocks, creating permanent CIDs, and storing historical assets on Arweave.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["IPFS", "Arweave", "Ceramic SDK", "Content CIDs"].map((t) => (
                <span key={t} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded font-fira">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`group bg-cyber-card border border-white/5 rounded-xl p-5 cursor-pointer relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:bg-cyber-cardHover hover:border-emerald-400/30 hover:-translate-y-1 hover:shadow-glow-emerald ${
              selectedLayer === 'trust' ? 'border-emerald-400 shadow-glow-emerald bg-cyber-cardHover' : ''
            } ${getLayerBorderClass('trust')}`}
            onClick={() => handleCardClick('trust')}
            onMouseEnter={playHover}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:bg-emerald-400/10 group-hover:border-emerald-400/25">
                {getLayerIcon('trust')}
              </div>
              <div className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-fira">
                REGISTRY & TRUST
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-200 mb-1 font-outfit">On-Chain Attestation & Mint</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-outfit">
              Sealing cryptographic claims via EAS contracts and minting on-chain dynamic SVG security badges.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["EAS Schema", "Arbitrum One", "ERC-721", "Dynamic SVG"].map((t) => (
                <span key={t} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded font-fira">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Telemetry Specs Side Panel */}
      <div className="xl:col-span-1">
        <div className="sticky top-24 bg-cyber-card border border-cyber-border rounded-2xl p-6 backdrop-blur-lg shadow-2xl h-fit border-white/5">
          {!selectedData ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Activity className="w-12 h-12 text-gray-600 mb-4 stroke-[1.5] opacity-50 animate-pulse" />
              <h3 className="text-sm font-bold text-gray-400 font-outfit">Node Telemetry Inactive</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed font-outfit">
                Hover or click any network layer card to scan its functional interface and flow pipeline.
              </p>
            </div>
          ) : (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/5">
                <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 text-purple-400 shadow-inner">
                  {getLayerIcon(selectedLayer || '')}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-100 font-outfit">{selectedData.title}</h2>
                  <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider font-fira">
                    {selectedData.subtitle}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-400 leading-relaxed font-outfit">{selectedData.desc}</p>
                </div>

                <div>
                  <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3 font-fira">
                    DECENTRALIZED BENEFITS
                  </h4>
                  <ul className="space-y-3">
                    {selectedData.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-400 font-outfit">
                        <span className="text-emerald-400 font-bold text-sm leading-none mt-0.5">✓</span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3 font-fira">
                    DATA PIPELINE WORKFLOW
                  </h4>
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3.5 flex flex-col gap-3 font-fira">
                    {selectedData.steps.map((s, idx) => (
                      <div key={idx} className="flex gap-2.5 text-xs text-gray-400 font-outfit">
                        <span className="text-indigo-400 font-bold">»</span>
                        <div className="leading-relaxed">
                          <strong className="text-gray-300 font-medium">Phase {idx + 1}:</strong> {s}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
