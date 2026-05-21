import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuditStore } from './store/useAuditStore';
import { useCyberSynth } from './hooks/useCyberSynth';
import { TechStackExplorer } from './components/TechStackExplorer';
import { LiveAuditSimulator } from './components/LiveAuditSimulator';
import { Volume2, VolumeX, Shield, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { activeView, setView } = useAuditStore();
  const { muted, toggleMute, playHover, playClick } = useCyberSynth();

  // Canvas background stars particle simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const count = Math.floor(window.innerWidth / 16);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.2 - 0.1,
        speedY: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
        if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;

        ctx.fillStyle = `rgba(129, 140, 248, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Sync React Router history with store state
  useEffect(() => {
    if (location.pathname === '/audit') {
      setView('simulator');
    } else {
      setView('blueprint');
    }
  }, [location.pathname, setView]);

  const handleTabChange = (view: 'blueprint' | 'simulator') => {
    playClick();
    if (view === 'blueprint') {
      navigate('/');
    } else {
      navigate('/audit');
    }
  };

  return (
    <div className="min-height-screen relative overflow-hidden text-gray-100 font-outfit select-none">
      
      {/* Cyber Grid Backdrop */}
      <div className="cyber-grid-bg" />
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10" />

      {/* ── HEADER HUD PANEL ── */}
      <header className="sticky top-0 z-50 bg-[#050508]/90 border-b border-white/5 backdrop-blur-xl px-10 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleTabChange('blueprint')}>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-extrabold text-lg w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 font-fira relative overflow-hidden">
            X
            {/* Glossy light effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent">
              AuditX
            </h1>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-fira block">
              Autonomous Cyber Security
            </span>
          </div>
        </div>

        {/* Dynamic Route Switching Tabs */}
        <div className="bg-white/[0.03] border border-white/5 rounded-full p-1 flex gap-1.5 backdrop-blur-md">
          <button
            onClick={() => handleTabChange('blueprint')}
            onMouseEnter={playHover}
            className={`flex items-center gap-2 text-xs font-bold px-6 py-2 rounded-full transition-all duration-300 ${
              activeView === 'blueprint'
                ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-400/30 text-white shadow-glow-indigo'
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Tech Stack Explorer</span>
          </button>

          <button
            onClick={() => handleTabChange('simulator')}
            onMouseEnter={playHover}
            className={`flex items-center gap-2 text-xs font-bold px-6 py-2 rounded-full transition-all duration-300 ${
              activeView === 'simulator'
                ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-400/30 text-white shadow-glow-indigo'
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Live Audit Simulator</span>
          </button>
        </div>

        {/* Dynamic Telemetry Metrics & Mute */}
        <div className="flex items-center gap-6 font-fira text-right">
          <div className="hidden sm:block">
            <span className="text-[9px] text-gray-500 font-bold uppercase block tracking-wider">EAS TELEMETRY</span>
            <strong className="text-xs text-emerald-400 font-medium">EAS V1 ACTIVE</strong>
          </div>

          <div className="hidden sm:block border-l border-white/5 pl-6">
            <span className="text-[9px] text-gray-500 font-bold uppercase block tracking-wider">COMPUTE NETWORK</span>
            <strong className="text-xs text-indigo-400 font-medium">BACALHAU ONLINE</strong>
          </div>

          {/* Futuristic Audio Mute Toggler */}
          <button
            onClick={toggleMute}
            onMouseEnter={playHover}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
              muted
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 shadow-glow-rose'
                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-[1500px] mx-auto px-10 py-8 min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<TechStackExplorer />} />
          <Route path="/audit" element={<LiveAuditSimulator />} />
        </Routes>
      </main>

      {/* ── HUD FOOTER SYSTEM ── */}
      <footer className="text-center py-8 border-t border-white/5 mt-16 font-fira text-[10px] text-gray-600">
        AUDITX AGENT · DECENTRALIZED COMPILING tele_ver_5.2 · <span className="text-indigo-400">SEALED ON-CHAIN</span>
      </footer>
    </div>
  );
};

export default App;
