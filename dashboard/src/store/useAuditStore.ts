import { create } from 'zustand';
import { CODE_TEMPLATES, SIMULATOR_DATA } from './constants';
import type { TerminalLog, SimulatorReport } from './constants';

interface AuditState {
  activeView: 'blueprint' | 'simulator';
  selectedTemplate: 'vault' | 'borrower' | 'staking';
  code: string;
  selectedLayer: string | null;
  
  // Simulator State
  simStatus: 'IDLE' | 'RUNNING' | 'COMPLETED';
  currentStep: number;
  connectorWidth: number;
  terminalLogs: TerminalLog[];
  report: SimulatorReport | null;
  
  // Controls
  setView: (view: 'blueprint' | 'simulator') => void;
  setTemplate: (template: 'vault' | 'borrower' | 'staking') => void;
  setCode: (code: string) => void;
  setSelectedLayer: (layer: string | null) => void;
  resetSimulator: () => void;
  startSimulation: (
    onLogTick: (type: 'system' | 'success' | 'warning' | 'error', text: string) => void,
    onComplete: (report: SimulatorReport) => void
  ) => void;
}

export const useAuditStore = create<AuditState>((set, get) => ({
  activeView: 'blueprint',
  selectedTemplate: 'vault',
  code: CODE_TEMPLATES['vault'],
  selectedLayer: null,
  
  simStatus: 'IDLE',
  currentStep: -1,
  connectorWidth: 0,
  terminalLogs: [
    { type: 'system', text: 'System IDLE. Select template and click \'Run Secure Audit\'.' }
  ],
  report: null,

  setView: (view) => set({ activeView: view }),
  
  setTemplate: (template) => set({
    selectedTemplate: template,
    code: CODE_TEMPLATES[template],
    simStatus: 'IDLE',
    currentStep: -1,
    connectorWidth: 0,
    terminalLogs: [
      { type: 'system', text: `System IDLE. Loaded template '${template}'. Ready to run secure audit.` }
    ],
    report: null
  }),

  setCode: (code) => set({ code }),

  setSelectedLayer: (layer) => set({ selectedLayer: layer }),

  resetSimulator: () => set({
    simStatus: 'IDLE',
    currentStep: -1,
    connectorWidth: 0,
    terminalLogs: [
      { type: 'system', text: 'System IDLE. Select template and click \'Run Secure Audit\'.' }
    ],
    report: null
  }),

  startSimulation: (onLogTick, onComplete) => {
    const template = get().selectedTemplate;
    const reportData = SIMULATOR_DATA[template];

    set({
      simStatus: 'RUNNING',
      currentStep: 0,
      connectorWidth: 0,
      terminalLogs: [],
      report: null
    });

    const totalSteps = 4;
    const stepDuration = 2200; // time per phase in ms
    let step = 0;

    const streamStageLogs = (_stageIdx: number, bounds: [number, number]) => {
      const stageLogs = reportData.terminal.slice(bounds[0], bounds[1]);
      let index = 0;

      const appendLog = () => {
        // Double check simulation is still running before adding log
        if (get().simStatus !== 'RUNNING') return;

        if (index < stageLogs.length) {
          const item = stageLogs[index];
          set((state) => ({
            terminalLogs: [...state.terminalLogs, item]
          }));
          onLogTick(item.type, item.text);
          index++;
          setTimeout(appendLog, 180);
        }
      };

      appendLog();
    };

    const logSlices: [number, number][] = [
      [0, 3],   // Compiling
      [3, 8],   // Scanning (Slither/Mythril)
      [8, 11],  // Consensus AI
      [11, 17]  // Attestation & sealing
    ];

    // Initial logs for compile
    streamStageLogs(0, logSlices[0]);

    const pipelineInterval = setInterval(() => {
      // Check if simulation was cancelled/reset
      if (get().simStatus !== 'RUNNING') {
        clearInterval(pipelineInterval);
        return;
      }

      step++;
      if (step < totalSteps) {
        set({
          currentStep: step,
          connectorWidth: (step / (totalSteps - 1)) * 100
        });
        streamStageLogs(step, logSlices[step]);
      } else {
        clearInterval(pipelineInterval);
        set({
          simStatus: 'COMPLETED',
          currentStep: 3,
          report: reportData
        });
        onComplete(reportData);
      }
    }, stepDuration);
  }
}));
