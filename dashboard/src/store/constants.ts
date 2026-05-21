export interface StackItem {
  title: string;
  subtitle: string;
  desc: string;
  benefits: string[];
  steps: string[];
}

export const STACK_DETAILS: Record<string, StackItem> = {
  frontend: {
    title: "Frontend Layer",
    subtitle: "Component Architecture & Interface State",
    desc: "A premium, modular client-side framework written in React 18 + Vite 5 designed to parse smart contract directories and render fully detailed dashboards.",
    benefits: [
      "Zero layout shifting under heavy parsing operations.",
      "Centralized client-side audit state management using highly responsive Zustand stores.",
      "Rapid reactive assets building utilizing Vite compile modules."
    ],
    steps: [
      "Developer loads workspace directories via Vite dynamic asset bundler.",
      "Solidity code streams live into internal state using React hooks.",
      "Visual components structure layout with Tailwind styling classes."
    ]
  },
  animation: {
    title: "Animation & Motion",
    subtitle: "Interactive Kinetic Presentation Systems",
    desc: "An immersive animation pipeline that transforms static telemetry analysis data into highly engaging visual representations, micro-interactions, and reactive interfaces.",
    benefits: [
      "Real-time call paths tracing utilizing canvas physics engines.",
      "3D Audit NFT Badge renders utilizing pure hardware-accelerated transforms.",
      "Fast typewriter effects streaming Slither outputs securely through Skyper libraries."
    ],
    steps: [
      "Page loads triggering staggered animations on structural cards.",
      "Active scans trigger terminal output generation through asynchronous log stream events.",
      "Risk scores mapped to metallic light-shifts and 3D rotation properties."
    ]
  },
  wallet: {
    title: "Wallet & Identity Layer",
    subtitle: "Decentralized Access Gates & Address Registry",
    desc: "Authenticates client nodes, maps Ethereum Names (ENS), signs payload hashes securely via Ethereum transactions, and sets targets for NFT mints.",
    benefits: [
      "Seamless Web3 wallet connect interfaces mapping all mainstream EVM providers.",
      "Ensures cryptographically signed secure workspace checks using Sign-In with Ethereum (SIWE).",
      "Resolves and displays custom Web3 handles via ENS records directly."
    ],
    steps: [
      "Client connects wallet mapping keys to active secure session.",
      "Attestation structures bind to client wallet directly to ensure authority.",
      "SIWE payload verified peer-to-peer to establish trusted workspace."
    ]
  },
  analysis: {
    title: "Security Scanners Layer",
    subtitle: "Static Parsers, Symbolic Solvers & Call Graphs",
    desc: "The critical logic core executing multi-dimensional inspections on Solidity files. It builds complete Abstract Syntax Trees (AST) and searches for high-risk vulnerabilities.",
    benefits: [
      "Builds visual flow trees and maps function scopes cleanly using Surya describe commands.",
      "Traces reentrancy vulnerabilities and access controls with Slither static parsing.",
      "Solves difficult branch constraints and assertions utilizing Mythril Z3 solver systems."
    ],
    steps: [
      "Solidity code is compiled to AST structures using solc.",
      "Slither maps data vectors and highlights access gaps or pattern flaws.",
      "Mythril executes symbolic paths to prove logical attack constraints."
    ]
  },
  compute: {
    title: "Decentralized Compute",
    subtitle: "Serverless P2P Docker Scanners",
    desc: "Executes computationally intensive security scans within sandboxed peer-to-peer nodes, removing any reliance on centralized web servers.",
    benefits: [
      "Zero centralized system vulnerability — compute tasks are distributed peer-to-peer.",
      "Bacalhau processes secure jobs directly inside isolated Docker configurations on-chain.",
      "Chainlink functions pull AI responses directly, validating consensus proof metrics."
    ],
    steps: [
      "Contract code hashes are published to P2P relay networks.",
      "Akash network clusters pull secure Docker containers containing compilers.",
      "Scanners execute isolated checks and return structured JSON summaries."
    ]
  },
  storage: {
    title: "Decentralized Storage",
    subtitle: "Immutable File Hashing & Relays",
    desc: "Guarantees permanent, tamper-proof availability of smart contracts, AST properties, and raw security report audits.",
    benefits: [
      "Cryptographically hashed storage paths verify file integrity.",
      "Arweave permanently archives critical data, protecting against loss.",
      "Ceramic maintains dynamic user identities and audit metrics."
    ],
    steps: [
      "Audit report bundle is generated as a structured JSON object.",
      "IPFS splits data into blocks, generating a unique Content Identifier (CID).",
      "Metadata schemas upload to nft.storage to prepare the NFT badge mint."
    ]
  },
  trust: {
    title: "Trust & Attestation Layer",
    subtitle: "Ethereum Attestation Service & Badging",
    desc: "The on-chain registry documenting audit claims, sealing severe security reports using EAS, and minting permanent visual ERC-721 badges.",
    benefits: [
      "Standardized attestation schemas verify audit credibility.",
      "Minimizes transaction costs using low-fee L2 execution networks (Arbitrum/Base).",
      "ERC-721 tokens grant visual badges directly to audited wallet interfaces."
    ],
    steps: [
      "EAS registry parses CID outputs, severity scores, and targets.",
      "L2 contract executes and returns an immutable transaction hash.",
      "ERC-721 contract mints a dynamic security badge NFT based on score."
    ]
  }
};

export const CODE_TEMPLATES: Record<string, string> = {
  vault: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract VulnerableVault {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 bal = balances[msg.sender];
        require(bal > 0, "Insufficient balance");

        // VULNERABILITY: External call before state update (Reentrancy)
        (bool success, ) = msg.sender.call{value: bal}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0;
    }
}`,
  borrower: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract FlashLoanReceiver {
    address public owner;
    address public pool;

    constructor(address _pool) {
        owner = msg.sender;
        pool = _pool;
    }

    // VULNERABILITY: Unprotected critical callback function
    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata params
    ) external returns (bool) {
        // Missing modifier to verify caller is indeed the verified pool
        // An attacker can call this directly to bypass loan payment rules
        
        // Critical custom operations here...
        return true;
    }
}`,
  staking: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SecureStaking is ReentrancyGuard, Ownable {
    mapping(address => uint256) public stakedBalances;

    constructor() Ownable(msg.sender) {}

    function stake() external payable nonReentrant {
        require(msg.value > 0, "Cannot stake 0");
        stakedBalances[msg.sender] += msg.value;
    }

    function withdraw() external nonReentrant {
        uint256 amount = stakedBalances[msg.sender];
        require(amount > 0, "No active stakes");

        // SECURE: Checks-Effects-Interactions followed perfectly
        stakedBalances[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdraw failed");
    }
}`
};

export interface Finding {
  title: string;
  severity: 'critical' | 'high' | 'medium';
  tool: string;
  loc: string;
  desc: string;
  vulnCode: string;
  fixCode: string;
}

export interface GraphNode {
  name: string;
  type: 'entry' | 'internal' | 'danger';
  x: number;
  y: number;
}

export interface GraphEdge {
  from: number;
  to: number;
  type: 'internal' | 'danger';
}

export interface TerminalLog {
  type: 'system' | 'success' | 'warning' | 'error';
  text: string;
}

export interface SimulatorReport {
  score: string;
  status: 'safe' | 'warning' | 'danger';
  badgeTitle: string;
  badgeRisk: string;
  badgeIcon: string;
  critical: number;
  high: number;
  medium: number;
  ipfs: string;
  easTx: string;
  network: string;
  findings: Finding[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  terminal: TerminalLog[];
}

export const SIMULATOR_DATA: Record<string, SimulatorReport> = {
  vault: {
    score: "8.8",
    status: "danger",
    badgeTitle: "CRIMSON GUARD",
    badgeRisk: "CRITICAL REENTRANCY EXPLOIT",
    badgeIcon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>`,
    critical: 1,
    high: 1,
    medium: 0,
    ipfs: "QmSFk3tRyPzoA7Y3Z4mKkQrTeG18Uo7GjYwT2fV8P7XzY",
    easTx: "0xa38c7f9999812ea2c7e6e5a6b0c2420f1883c84f6d4d42b91866ff31998f4df2",
    network: "Arbitrum One (L2)",
    findings: [
      {
        title: "Reentrancy Vulnerability (External Call Before Balance Cleared)",
        severity: "critical",
        tool: "Slither check-reentrancy",
        loc: "VulnerableVault.sol: L13-17",
        desc: "The contract calls 'msg.sender.call' to withdraw funds before updating the internal mapping 'balances[msg.sender] = 0'. A malicious user can write a recursive contract that calls 'withdraw()' again inside their callback, draining the entire vault balance.",
        vulnCode: `(bool success, ) = msg.sender.call{value: bal}("");\nbalances[msg.sender] = 0;`,
        fixCode: `balances[msg.sender] = 0;\n(bool success, ) = msg.sender.call{value: bal}("");`
      },
      {
        title: "Missing Zero Check on Deposit address",
        severity: "high",
        tool: "Mythril SWC-105",
        loc: "VulnerableVault.sol: L8-10",
        desc: "Depositing addresses are not checked. Though depositors are tracked via msg.sender, raw address queries might cause state lockups if interfaces pass unverified data streams.",
        vulnCode: `function deposit() external payable {`,
        fixCode: `function deposit() external payable {\n    require(msg.sender != address(0), "No zero address");`
      }
    ],
    graphNodes: [
      { name: "deposit()", type: "entry", x: 100, y: 160 },
      { name: "withdraw()", type: "danger", x: 300, y: 160 },
      { name: "msg.sender.call", type: "danger", x: 500, y: 160 },
    ],
    graphEdges: [
      { from: 0, to: 1, type: "internal" },
      { from: 1, to: 2, type: "danger" }
    ],
    terminal: [
      { type: "system", text: "Initializing solc compiler v0.8.20..." },
      { type: "system", text: "Building AST graph models for VulnerableVault..." },
      { type: "success", text: "AST generated successfully. Launching decentralized compute container..." },
      { type: "system", text: "P2P Job relay: Bacalhau node initialized (IP: 147.28.112.5)." },
      { type: "system", text: "Executing Slither static analyzer suite..." },
      { type: "error", text: "Slither WARNING: Reentrancy found in VulnerableVault.withdraw() -> lines 13-17!" },
      { type: "system", text: "Executing Mythril symbolic executor..." },
      { type: "warning", text: "Mythril alert: SWC-107 Reentrancy path successfully simulated by Z3 solver." },
      { type: "system", text: "Generating Surya Call Graph mappings..." },
      { type: "success", text: "Call Graph mapped. Passing scanner outputs to AI Consensus layer..." },
      { type: "system", text: "Consensus generated: Claude Sonnet scored CVSS: 8.8 (Critical)." },
      { type: "system", text: "Compressing reports. Uploading metadata to IPFS storage network..." },
      { type: "success", text: "IPFS Upload COMPLETE. CID: QmSFk3tRyPzoA7Y3..." },
      { type: "system", text: "Routing proofs to Ethereum Attestation Service registry..." },
      { type: "success", text: "EAS Attestation sealed on Arbitrum One L2. Tx: 0xa38c7f..." },
      { type: "warning", text: "Audit Score >= 7. Badge NFT Minting bypassed due to safety alert." },
      { type: "success", text: "Audit report completed successfully." }
    ]
  },
  borrower: {
    score: "7.5",
    status: "warning",
    badgeTitle: "AMBER GUARD",
    badgeRisk: "HIGH RISK callback bypass",
    badgeIcon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>`,
    critical: 0,
    high: 1,
    medium: 1,
    ipfs: "QmPK3tRyPzoA7Y3Z4mKkQrTeG18Uo7GjYwT2fV8P7XyK",
    easTx: "0xb78c7f9999812ea2c7e6e5a6b0c2420f1883c84f6d4d42b91866ff31998f4e21",
    network: "Base Goerli L2",
    findings: [
      {
        title: "Unprotected Callback Operational Entry Point",
        severity: "high",
        tool: "Slither access-control",
        loc: "FlashLoanReceiver.sol: L12-21",
        desc: "The critical callback interface 'executeOperation()' does not verify the address calling the function. Anyone can invoke this entry point directly, tricking the contract into processing internal assets without authorization.",
        vulnCode: `function executeOperation(...) external returns (bool) {`,
        fixCode: `function executeOperation(...) external returns (bool) {\n    require(msg.sender == pool, "Only verified pool allowed");`
      },
      {
        title: "Implicit Variable Ownership Mismatch",
        severity: "medium",
        tool: "Mythril SWC-101",
        loc: "FlashLoanReceiver.sol: L8-10",
        desc: "The owner address is successfully mapped during the constructor but not guarded dynamically in external integrations. Changes in network state might cause unintended control transfer.",
        vulnCode: `owner = msg.sender;`,
        fixCode: `owner = msg.sender;\n    // Ensure custom modifiers guard dynamic edits`
      }
    ],
    graphNodes: [
      { name: "constructor()", type: "entry", x: 100, y: 160 },
      { name: "executeOperation()", type: "danger", x: 300, y: 160 },
      { name: "Internal State", type: "danger", x: 500, y: 160 }
    ],
    graphEdges: [
      { from: 0, to: 1, type: "internal" },
      { from: 1, to: 2, type: "danger" }
    ],
    terminal: [
      { type: "system", text: "Initializing solc compiler v0.8.20..." },
      { type: "system", text: "Analyzing FlashLoanReceiver callback loops..." },
      { type: "success", text: "Compiler workspace verified. Spinning up decentralized compute container..." },
      { type: "system", text: "P2P Container loaded (IP: 184.28.112.5)." },
      { type: "system", text: "Slither: Scanning functional signatures..." },
      { type: "warning", text: "Slither ALERT: Unprotected external function executeOperation() allows access control bypass!" },
      { type: "system", text: "Mythril: Processing symbolic solver assertions..." },
      { type: "warning", text: "Mythril alert: SWC-112 Callback Vulnerability mapped." },
      { type: "success", text: "Scanners complete. Requesting Claude AI analysis consensus..." },
      { type: "system", text: "Consensus complete: Claude Sonnet scored CVSS: 7.5 (High)." },
      { type: "system", text: "Uploading metadata schemas to IPFS..." },
      { type: "success", text: "IPFS Complete. CID: QmPK3tRyPzoA7Y3..." },
      { type: "system", text: "Deploying EAS Attestation schema..." },
      { type: "success", text: "Attestation sealed on Base L2. Tx: 0xb78c7f..." },
      { type: "warning", text: "Audit Score >= 7. Badge NFT Minting bypassed due to safety alert." },
      { type: "success", text: "Audit report completed successfully." }
    ]
  },
  staking: {
    score: "1.2",
    status: "safe",
    badgeTitle: "EMERALD GUARD",
    badgeRisk: "ZERO CRITICAL ISSUES - AUDIT SECURED",
    badgeIcon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
    critical: 0,
    high: 0,
    medium: 0,
    ipfs: "QmGL3tRyPzoA7Y3Z4mKkQrTeG18Uo7GjYwT2fV8P7XyW",
    easTx: "0xc88c7f9999812ea2c7e6e5a6b0c2420f1883c84f6d4d42b91866ff31998f4f22",
    network: "Arbitrum One (L2)",
    findings: [
      {
        title: "Standard Code Optimization Recommendation",
        severity: "medium",
        tool: "Slither gas-optimization",
        loc: "SecureStaking.sol: L13-16",
        desc: "The state mapping stakedBalances reads repeatedly. Caching it locally can reduce gas usage during high staking interactions.",
        vulnCode: `stakedBalances[msg.sender] += msg.value;`,
        fixCode: `uint256 currentStake = stakedBalances[msg.sender];\nstakedBalances[msg.sender] = currentStake + msg.value;`
      }
    ],
    graphNodes: [
      { name: "stake()", type: "entry", x: 150, y: 100 },
      { name: "withdraw()", type: "entry", x: 150, y: 220 },
      { name: "nonReentrant", type: "internal", x: 350, y: 160 },
      { name: "Balances Update", type: "internal", x: 550, y: 160 }
    ],
    graphEdges: [
      { from: 0, to: 2, type: "internal" },
      { from: 1, to: 2, type: "internal" },
      { from: 2, to: 3, type: "internal" }
    ],
    terminal: [
      { type: "system", text: "Initializing solc compiler v0.8.20..." },
      { type: "system", text: "Processing import paths: OpenZeppelin ReentrancyGuard..." },
      { type: "success", text: "Compilation successful. Spinning up decentralized compute container..." },
      { type: "system", text: "P2P Container loaded (IP: 198.28.112.5)." },
      { type: "system", text: "Slither: Scanning functional signatures..." },
      { type: "success", text: "Slither: Zero critical vulnerabilities detected." },
      { type: "system", text: "Mythril: Running 22 symbolic path solves..." },
      { type: "success", text: "Mythril solver: All paths complete. Zero exploits found." },
      { type: "system", text: "Generating Surya Mappings..." },
      { type: "success", text: "Surya check complete: Call Graph conforms to safe checks pattern." },
      { type: "success", text: "AI Consensus: Claude Sonnet confirmed 100% mainnet ready rating. Score: 1.2." },
      { type: "system", text: "Uploading metadata to IPFS..." },
      { type: "success", text: "IPFS Complete. CID: QmGL3tRyPzoA7Y3..." },
      { type: "system", text: "Deploying EAS Attestation schema..." },
      { type: "success", text: "Attestation sealed on Arbitrum L2. Tx: 0xc88c7f..." },
      { type: "success", text: "Audit Score < 7. Minting Emerald Security NFT Badge to wallet..." },
      { type: "success", text: "MINT COMPLETE. Badge Token ID: #2847 mapped successfully." },
      { type: "success", text: "Audit complete. Safe mainnet deployment recommended." }
    ]
  }
};
