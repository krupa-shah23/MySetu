import React, { useMemo, useCallback } from 'react';
import ReactFlow, { Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { Briefcase, GraduationCap, Award, ShieldCheck } from 'lucide-react';

const CustomNode = ({ data }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'Education': return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'Work': return <Briefcase className="w-4 h-4 text-amber-500" />;
      case 'Skills': return <Award className="w-4 h-4 text-purple-500" />;
      default: return <GraduationCap className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className={`px-4 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border ${data.selected ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-white/60 shadow-sm hover:shadow-md'} transition-all min-w-[200px] cursor-pointer`}>
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-slate-300 !border-0" />
      
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{data.type}</p>
        </div>
        {data.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
      </div>
      
      <h4 className="text-[13px] font-bold text-slate-800 leading-tight mb-0.5">{data.label}</h4>
      <p className="text-[11px] font-semibold text-slate-500 truncate">{data.organization}</p>
      
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-slate-300 !border-0" />
    </div>
  );
};

export default function CareerGraphCanvas({ nodes, edges, onNodeClick, activeFilter }) {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  // Simple hardcoded layout for the 6 nodes to form a snake/timeline shape
  const layoutedNodes = useMemo(() => {
    return nodes.map((n, idx) => {
      // Very basic horizontal layout
      const x = (idx % 3) * 280;
      const y = Math.floor(idx / 3) * 150 + (idx % 3 === 1 ? 40 : 0); // slight stagger
      
      const isFilteredOut = activeFilter !== 'Full Journey' && activeFilter !== 'Verified Only' && activeFilter !== n.type;
      const isUnverifiedOut = activeFilter === 'Verified Only' && !n.verified;
      const hidden = isFilteredOut || isUnverifiedOut;

      return {
        id: n.id,
        type: 'custom',
        position: { x, y },
        hidden,
        data: {
          label: n.title,
          type: n.type,
          organization: n.organization,
          verified: n.verified,
          raw: n
        }
      };
    });
  }, [nodes, activeFilter]);

  const onNodeClickInternal = useCallback((event, node) => {
    onNodeClick(node.data.raw);
  }, [onNodeClick]);

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-50/20 rounded-[2rem] overflow-hidden border border-white/40">
      <ReactFlow
        nodes={layoutedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClickInternal}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="backdrop-blur-sm"
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls showInteractive={false} className="bg-white/60 backdrop-blur-md rounded-xl border border-white !shadow-sm fill-slate-500" />
      </ReactFlow>
    </div>
  );
}
