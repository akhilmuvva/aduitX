import React, { useEffect, useRef } from 'react';
import type { GraphNode, GraphEdge } from '../store/constants';

interface CallGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface PhysicsNode extends GraphNode {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  vx: number;
  vy: number;
  isDragging: boolean;
}

export const CallGraph: React.FC<CallGraphProps> = ({ nodes, edges }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physicsNodesRef = useRef<PhysicsNode[]>([]);
  const draggingNodeIdxRef = useRef<number | null>(null);

  // Initialize and update physics nodes when props change
  useEffect(() => {
    physicsNodesRef.current = nodes.map((n) => {
      // Retain previous positions if nodes match by name to ensure smooth transition
      const existing = physicsNodesRef.current.find((prev) => prev.name === n.name);
      if (existing) {
        return {
          ...n,
          targetX: n.x,
          targetY: n.y,
          currentX: existing.currentX,
          currentY: existing.currentY,
          vx: existing.vx,
          vy: existing.vy,
          isDragging: existing.isDragging,
        };
      }
      return {
        ...n,
        targetX: n.x,
        targetY: n.y,
        currentX: n.x - 20 + Math.random() * 40,
        currentY: n.y - 20 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        isDragging: false,
      };
    });
  }, [nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawFrame = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const activeNodes = physicsNodesRef.current;

      // 1. Draw connecting edge paths
      edges.forEach((edge) => {
        const fromNode = activeNodes[edge.from];
        const toNode = activeNodes[edge.to];
        if (!fromNode || !toNode) return;

        ctx.beginPath();
        ctx.moveTo(fromNode.currentX, fromNode.currentY);
        ctx.lineTo(toNode.currentX, toNode.currentY);

        if (edge.type === 'danger') {
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([4, 4]);
          ctx.lineDashOffset = -(Date.now() / 40) % 16;
        } else {
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([]);
        }
        ctx.stroke();

        // Dynamic particle flowing along the edge
        const now = Date.now();
        const t = (now % 2000) / 2000; // loop factor
        const px = fromNode.currentX + (toNode.currentX - fromNode.currentX) * t;
        const py = fromNode.currentY + (toNode.currentY - fromNode.currentY) * t;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = edge.type === 'danger' ? 'hsl(346, 85%, 50%)' : 'hsl(185, 100%, 50%)';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 2. Draw Nodes
      activeNodes.forEach((node, idx) => {
        if (!node.isDragging) {
          // Add velocity drift
          node.currentX += node.vx;
          node.currentY += node.vy;

          // Pull back to home anchors gently (spring force)
          const dx = node.targetX - node.currentX;
          const dy = node.targetY - node.currentY;
          node.vx += dx * 0.004;
          node.vy += dy * 0.004;

          // Push apart from other nodes (repelling charge)
          activeNodes.forEach((otherNode, oIdx) => {
            if (idx === oIdx) return;
            const odx = node.currentX - otherNode.currentX;
            const ody = node.currentY - otherNode.currentY;
            const distSq = odx * odx + ody * ody;
            const dist = Math.sqrt(distSq) || 1;
            if (dist < 80) {
              const force = (80 - dist) * 0.005;
              node.vx += (odx / dist) * force;
              node.vy += (ody / dist) * force;
            }
          });

          // Air resistance damping (friction)
          node.vx *= 0.94;
          node.vy *= 0.94;
        }

        // Render node body ring
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, 15, 0, Math.PI * 2);

        if (node.type === 'danger') {
          ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.85)';
        } else if (node.type === 'entry') {
          ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.85)';
        } else {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
        }
        ctx.lineWidth = node.isDragging ? 3 : 2;
        ctx.fill();
        ctx.stroke();

        // Node inner glowing core
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, 5, 0, Math.PI * 2);
        ctx.fillStyle =
          node.type === 'danger'
            ? 'hsl(346, 85%, 50%)'
            : node.type === 'entry'
            ? 'hsl(263, 90%, 55%)'
            : 'hsl(142, 70%, 45%)';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = node.isDragging ? 15 : 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Text Labels
        ctx.font = "bold 11px 'Outfit', sans-serif";
        ctx.fillStyle = '#f3f4f6';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.currentX, node.currentY - 24);
      });

      animId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [edges]);

  // Handle Drag Physics via Mouse Listeners
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find if clicked near any node
    const activeNodes = physicsNodesRef.current;
    for (let i = 0; i < activeNodes.length; i++) {
      const node = activeNodes[i];
      const dx = node.currentX - x;
      const dy = node.currentY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 25) {
        draggingNodeIdxRef.current = i;
        node.isDragging = true;
        node.vx = 0;
        node.vy = 0;
        break;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const idx = draggingNodeIdxRef.current;
    if (idx === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = physicsNodesRef.current[idx];
    if (node) {
      node.currentX = x;
      node.currentY = y;
    }
  };

  const handleMouseUpOrLeave = () => {
    const idx = draggingNodeIdxRef.current;
    if (idx === null) return;

    const node = physicsNodesRef.current[idx];
    if (node) {
      node.isDragging = false;
    }
    draggingNodeIdxRef.current = null;
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-black/40 border border-white/5 rounded-xl cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      />
    </div>
  );
};
