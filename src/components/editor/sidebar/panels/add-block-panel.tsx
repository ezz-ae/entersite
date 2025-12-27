'use client';

import React from 'react';
import { 
  Bot, 
  Smartphone, 
  Globe, 
  List, 
  Layout, 
  Image as ImageIcon, 
  Phone, 
  BarChart, 
  Sparkles,
  Search,
  Users,
  Plus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { SitePage, Block } from '@/lib/types';

interface AddBlockPanelProps {
    page: SitePage;
    onPageUpdate: (page: SitePage) => void;
}

const BLOCK_LIBRARY = [
    {
        category: 'AI & Intelligence',
        blocks: [
            { type: 'chat-agent', name: 'Expert Chat Agent', icon: Bot, badge: 'New', desc: 'Expert AI that knows all projects.' },
            { type: 'roi-calculator', name: 'ROI Calculator', icon: BarChart, desc: 'Real-time property math.' },
        ]
    },
    {
        category: 'Growth & Leads',
        blocks: [
            { type: 'sms-lead', name: 'SMS VIP Broadcast', icon: Smartphone, badge: 'High Conversion', desc: 'Capture numbers for SMS/WhatsApp.' },
            { type: 'cta-form', name: 'Smart Lead Form', icon: Phone, desc: 'Optimized for mobile leads.' },
            { type: 'newsletter', name: 'Newsletter', icon: List, desc: 'Keep investors updated.' },
        ]
    },
    {
        category: 'Property Data',
        blocks: [
            { type: 'listing-grid', name: 'Project Grid', icon: Layout, desc: 'Showcase multiple developments.' },
            { type: 'search-filters', name: 'Advanced Search', icon: Search, desc: 'Filter by area, price, and developer.' },
            { type: 'floor-plan', name: 'Interactive Floor Plans', icon: ImageIcon, desc: 'Visual unit selection.' },
        ]
    }
];

export function AddBlockPanel({ page, onPageUpdate }: AddBlockPanelProps) {
  
  const addBlock = (blockType: string) => {
    const newBlock: Block = {
        blockId: `\${blockType}-\${Date.now()}`,
        type: blockType,
        order: page.blocks.length,
        data: {
            headline: `New \${blockType} Section`,
        }
    };
    
    onPageUpdate({
        ...page,
        blocks: [...page.blocks, newBlock]
    });
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
       <div className="p-4 border-b border-white/5 bg-zinc-950/30">
          <h3 className="font-bold text-sm text-zinc-100 uppercase tracking-widest flex items-center gap-2">
            <Plus className="h-4 w-4 text-blue-500" />
            Add Block
          </h3>
       </div>

       <div className="p-4 space-y-8">
          {/* AI Recommendation Hook */}
          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-2xl p-4 border border-blue-500/20">
             <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3 w-3 text-blue-400" />
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Architect Suggestion</span>
             </div>
             <p className="text-xs text-zinc-400 mb-3">Add the <strong>SMS VIP</strong> block to increase lead volume by ~30% for this project type.</p>
             <button 
                onClick={() => addBlock('sms-lead')}
                className="text-[10px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
             >
                Apply Suggestion
             </button>
          </div>

          {BLOCK_LIBRARY.map((group) => (
             <div key={group.category} className="space-y-3">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">{group.category}</h4>
                <div className="grid grid-cols-1 gap-2">
                   {group.blocks.map((block) => (
                      <div 
                        key={block.type}
                        onClick={() => addBlock(block.type)}
                        className="group p-4 rounded-xl bg-zinc-800/30 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer transition-all"
                      >
                         <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                               <block.icon className="h-4 w-4 text-zinc-400 group-hover:text-blue-400" />
                               <span className="text-sm font-bold text-zinc-200">{block.name}</span>
                            </div>
                            {block.badge && (
                               <Badge className="bg-blue-600/10 text-blue-400 border-0 text-[8px] h-4 px-1.5">
                                  {block.badge}
                               </Badge>
                            )}
                         </div>
                         <p className="text-[10px] text-zinc-500 leading-tight">{block.desc}</p>
                      </div>
                   ))}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
