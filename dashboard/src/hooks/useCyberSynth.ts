import { useState, useCallback } from 'react';

// Singleton AudioContext to prevent duplicate initializations
let audioCtx: AudioContext | null = null;
let activeScanOscillator: OscillatorNode | null = null;
let activeScanFilter: BiquadFilterNode | null = null;
let isGloballyMuted = false;

export const useCyberSynth = () => {
  const [muted, setMuted] = useState(isGloballyMuted);

  const initContext = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  };

  const toggleMute = useCallback(() => {
    isGloballyMuted = !isGloballyMuted;
    setMuted(isGloballyMuted);
    if (isGloballyMuted && activeScanOscillator) {
      // Stop dynamic hum if muted mid-scan
      try {
        activeScanOscillator.stop();
        activeScanOscillator.disconnect();
      } catch (e) {}
      activeScanOscillator = null;
    }
  }, []);

  const playHover = useCallback(() => {
    if (isGloballyMuted) return;
    try {
      const ctx = initContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {}
  }, []);

  const playClick = useCallback(() => {
    if (isGloballyMuted) return;
    try {
      const ctx = initContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(600, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.09);
      osc2.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  }, []);

  const startScanHum = useCallback(() => {
    if (isGloballyMuted) return;
    try {
      const ctx = initContext();
      if (activeScanOscillator) return; // Already running

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(75, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);
      // Sweep filter cutoff to simulate scanner activity
      filter.frequency.linearRampToValueAtTime(350, ctx.currentTime + 0.8);
      filter.frequency.linearRampToValueAtTime(150, ctx.currentTime + 1.6);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      activeScanOscillator = osc;
      activeScanFilter = filter;

      // Maintain a pulsing sweep cycle via dynamic filter modulation
      const pulseInterval = setInterval(() => {
        if (!activeScanOscillator || isGloballyMuted || !audioCtx) {
          clearInterval(pulseInterval);
          return;
        }
        const now = audioCtx.currentTime;
        filter.frequency.cancelScheduledValues(now);
        filter.frequency.setValueAtTime(filter.frequency.value, now);
        filter.frequency.linearRampToValueAtTime(350, now + 0.8);
        filter.frequency.linearRampToValueAtTime(150, now + 1.6);
      }, 1600);

    } catch (e) {}
  }, []);

  const stopScanHum = useCallback(() => {
    try {
      if (activeScanOscillator) {
        activeScanOscillator.stop();
        activeScanOscillator.disconnect();
        activeScanOscillator = null;
      }
      if (activeScanFilter) {
        activeScanFilter.disconnect();
        activeScanFilter = null;
      }
    } catch (e) {}
  }, []);

  const playAlertChime = useCallback((severity: 'safe' | 'warning' | 'danger') => {
    if (isGloballyMuted) return;
    try {
      const ctx = initContext();
      const now = ctx.currentTime;

      if (severity === 'safe') {
        // High ascending major chord (chime)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0, now + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.02, now + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.5);
        });
      } else if (severity === 'warning') {
        // Medium discordant synth sound
        const notes = [293.66, 349.23, 440.00]; // D4, F4, A4
        notes.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.025, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.7);
        });
      } else {
        // Danger: alarm pulsing notes
        const notes = [220.00, 233.08]; // A3, A#3 low hazard pulses
        [0, 0.25, 0.5].forEach((delay) => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(notes[0], now + delay);
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(notes[1], now + delay);

          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.03, now + delay + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.2);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now + delay);
          osc2.start(now + delay);
          osc1.stop(now + delay + 0.22);
          osc2.stop(now + delay + 0.22);
        });
      }
    } catch (e) {}
  }, []);

  return {
    muted,
    toggleMute,
    playHover,
    playClick,
    startScanHum,
    stopScanHum,
    playAlertChime,
  };
};
