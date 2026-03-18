import React, { useEffect, useState } from 'react';
import { graphService } from '../services/graphService';
import CareerGraphCanvas from '../components/graph/CareerGraphCanvas';
import NodeDetailPanel from '../components/graph/NodeDetailPanel';
import { Network } from 'lucide-react';

export default function CareerGraph() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Full Journey');
  const [selectedNode, setSelectedNode] = useState(null);

  const filters = ['Full Journey', 'Education', 'Work', 'Skills', 'Verified Only'];

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const data = await graphService.getCareerGraph();
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (error) {
        console.error("Failed to fetch graph:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGraph();
  }, []);

  return (
    <div className="animate-in fade-in duration-700 max-w-[1400px] h-full flex flex-col mx-auto">
      
      {/* Header Block */}
      <div className="mb-6 px-2 text-center sm:text-left">
        <h1 className="text-[26px] font-[600] text-slate-800 tracking-tight leading-none mb-2">Portable Career Graph</h1>
        <p className="text-[13px] font-[500] text-slate-500 max-w-xl">
          Visualize your verified academic and professional journey as a portable identity graph.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setSelectedNode(null);
            }}
            className={`px-4 py-1.5 rounded-xl text-[12px] font-semibold transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-white/40 text-slate-500 hover:bg-white/80 hover:text-slate-800 border border-white/40 shadow-sm'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 rounded-[2.5rem] relative min-h-[600px] flex gap-6 mt-2">
        
        {loading ? (
          <div className="w-full flex justify-center items-center bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
          </div>
        ) : nodes.length === 0 ? (
          <div className="w-full flex items-center justify-center bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
             <div className="text-center">
               <Network className="w-12 h-12 text-slate-300 mx-auto mb-4" />
               <p className="text-slate-500 font-medium text-[15px]">No graph data found.</p>
             </div>
          </div>
        ) : (
          <>
            {/* Canvas Area */}
            <div className={`transition-all duration-500 ease-in-out bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 p-2 shadow-[0_4px_30px_rgba(0,0,0,0.02)] ${selectedNode ? 'w-full lg:w-[65%]' : 'w-full'}`}>
              <CareerGraphCanvas 
                nodes={nodes} 
                edges={edges} 
                onNodeClick={setSelectedNode} 
                activeFilter={activeFilter} 
              />
            </div>

            {/* Detail Panel Area */}
            {selectedNode && (
              <div className="hidden lg:block w-[35%] shrink-0 h-[600px] sticky top-6">
                <NodeDetailPanel 
                  node={selectedNode} 
                  onClose={() => setSelectedNode(null)} 
                />
              </div>
            )}
            
            {/* Mobile Overlay for Detail Panel */}
            {selectedNode && (
              <div className="lg:hidden fixed inset-0 z-50 p-4 bg-slate-900/20 backdrop-blur-sm flex items-end sm:items-center justify-center">
                <div className="w-full max-w-md h-[500px]">
                  <NodeDetailPanel 
                    node={selectedNode} 
                    onClose={() => setSelectedNode(null)} 
                  />
                </div>
              </div>
            )}
          </>
        )}

      </div>

    </div>
  );
}
